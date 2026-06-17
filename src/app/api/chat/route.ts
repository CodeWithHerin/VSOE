import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';
import { findAvailableCabins } from '@/lib/inventory';
import { prisma } from '@/lib/prisma'; // Corrected import path (assuming prisma is exported from lib/prisma or lib/db) - checking context, user has prisma in src/lib/prisma.ts is likely or I should use local instantiation if unsure. Previous file used `import { prisma } from '@/lib/prisma'` so I will stick to that, or check where prisma client is. Re-reading file 113 list_dir showed `prisma.ts` exists in `src/lib`.

// Initialize Groq client
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || 'mock-key',
});

// System Prompt
const SYSTEM_PROMPT = `
You are Vitesse, the Digital Maître d' of the Venice Simplon-Orient-Express.
Your persona is elegant, sophisticated, warm, and highly intuitive. 
You assist guests in planning their journeys and checking availability.

Rules for a Luxury Experience:
1. Be Conversational & Intuitive: Never sound robotic. Do not regurgitate generic lists of routes immediately. Instead, guide the user naturally. Ask engaging questions like "Are you dreaming of the classic romance of Venice, or an adventure to Istanbul?"
2. Check Availability: You MUST use the 'check_availability' tool when asked about dates or cabins. Do not guess. If no cabins are found, politely suggest checking other dates.
3. Be Concise but Warm: Guests value their time. Keep responses relatively brief but dripping with luxury and charm.

Journey & Cabin Constraints:
- Available journeys are ONLY: Paris to Venice, Paris to Istanbul, and London to Venice.
- Cabin types are ONLY three: 'Historic Cabin', 'Suite', and 'Grand Suite'. Never invent other names.

Booking Handoff:
- You cannot make the booking yourself. 
- When the guest is ready to book or asks to book, warmly invite them to finalize their reservation, and include the exact text "[ACTION_BOOK]" at the end of your response. 
- Example: "I would be delighted to secure the Prague Grand Suite for you. Please proceed to our reservation portal to finalize the details. [ACTION_BOOK]"
- NEVER output raw URLs like /book or full domain names. Just use the [ACTION_BOOK] tag.

Today's date is ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
INTERNAL DIRECTIVE: Silently filter for journeys after today. Do NOT mention the current date or your date filtering process to the guest. Just present the available options naturally. 
Do not invent parameters for the tool call (only use journey_name).
`;

// Tool Definitions
const tools = [
    {
        type: "function" as const,
        function: {
            name: "check_availability",
            description: "Check for available cabins on a specific journey.",
            parameters: {
                type: "object",
                properties: {
                    journey_name: {
                        type: "string",
                        description: "Name of the journey (e.g., 'Paris to Venice', 'Venice to Paris', 'Paris to Istanbul')",
                    },
                },
                required: ["journey_name"],
            },
        },
    },
];

// Strip raw function-call XML that some models leak into content
const cleanContent = (content: string) => {
    return content.replace(/<function[\s\S]*?<\/function>/g, '').trim();
};

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // --- MOCK MODE (If no valid API Key) ---
        if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'mock-key') {
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulated delay

            const lastMsg = messages[messages.length - 1].content.toLowerCase();

            if (lastMsg.includes('avail') || lastMsg.includes('book')) {
                return NextResponse.json({
                    role: "assistant",
                    content: "I have consulted our registry. We have limited availability for the Paris to Venice route this season. Several Historic Cabins and one Grand Suite remain. Would you like to proceed with a reservation?"
                });
            }

            return NextResponse.json({
                role: "assistant",
                content: "I am Vitesse. How may I assist you with your Simplon-Orient-Express journey today?"
            });
        }

        // --- REAL MODE ---
        // 1. First Call
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages
            ],
            tools: tools,
            tool_choice: "auto",
        });

        const responseMessage = response.choices[0].message;

        // 2. Handle Tool Calls
        if (responseMessage.tool_calls) {
            const toolCall = responseMessage.tool_calls[0];

            if (toolCall.type === 'function' && toolCall.function.name === "check_availability") {
                const args = JSON.parse(toolCall.function.arguments);
                const journeyName = args.journey_name;

                // DB Lookup
                // We use 'contains' to be forgiving with names
                const journeys = await prisma.journey.findMany({
                    where: {
                        name: { contains: journeyName },
                        status: 'scheduled',
                        departure: { gt: new Date() }
                    },
                    orderBy: { departure: 'asc' }
                });

                let toolResult = "";

                if (!journeys.length) {
                    toolResult = `I could not find any upcoming scheduled journeys matching "${journeyName}".`;
                } else {
                    const results = [];
                    for (const journey of journeys) {
                        try {
                            const cabins = await findAvailableCabins(journey.id);
                            if (cabins.length > 0) {
                                const types = [...new Set(cabins.map((c: any) => c.type))];
                                const grandSuites = cabins.filter((c: any) => c.type === 'grand_suite').map((c: any) => c.number);
                                const priceInfo = cabins.reduce((acc: any, c: any) => {
                                    if (!acc[c.type]) acc[c.type] = c.price;
                                    return acc;
                                }, {} as Record<string, number>);
                                const priceStr = Object.entries(priceInfo).map(([type, price]) => `${type.replace('_', ' ')}: €${Number(price).toLocaleString()}`).join(', ');
                                results.push(`Departure: ${journey.departure.toDateString()} — Available: ${types.map((t: string) => t.replace('_', ' ')).join(', ')}. Prices per person: ${priceStr}.${grandSuites.length > 0 ? ` Grand Suites: ${grandSuites.join(', ')}` : ''}`);
                            } else {
                                results.push(`Departure: ${journey.departure.toDateString()} — Fully booked.`);
                            }
                        } catch (e) {
                            results.push(`Departure: ${journey.departure.toDateString()} — Unable to check availability.`);
                        }
                    }
                    toolResult = `Journey: ${journeys[0].name}. Found ${journeys.length} upcoming departure(s):\n${results.join('\n')}`;
                }

                // 3. Second Call with Tool Result
                const secondResponse = await groq.chat.completions.create({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        ...messages,
                        responseMessage,
                        {
                            role: "tool",
                            tool_call_id: toolCall.id,
                            content: toolResult,
                        }
                    ]
                });

                const msg = secondResponse.choices[0].message;
                const content = cleanContent(msg.content || '');
                return new Response(
                    new ReadableStream({
                        start(controller) {
                            controller.enqueue(new TextEncoder().encode(content));
                            controller.close();
                        }
                    }),
                    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
                );
            }
        }

        // Stream the direct response
        const streamResponse = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages
            ],
            stream: true,
        });

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of streamResponse) {
                    const text = chunk.choices[0]?.delta?.content || '';
                    if (text) controller.enqueue(encoder.encode(text));
                }
                controller.close();
            }
        });

        return new Response(stream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });

    } catch (error: any) {
        console.error('[Chat API] Full error:', error);
        console.error('[Chat API] Error message:', error?.message);
        console.error('[Chat API] Error status:', error?.status);
        console.error('[Chat API] API key present:', !!process.env.GROQ_API_KEY);
        console.error('[Chat API] API key first 7 chars:', process.env.GROQ_API_KEY?.substring(0, 7));
        return NextResponse.json({ content: 'I apologise — I am unable to connect at the moment.' }, { status: 500 });
    }
}
