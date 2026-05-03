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
Your persona is elegant, sophisticated, warm, and highly intelligent.
You assist guests in planning their journeys and checking availability.

Rules:
1. Always maintain a polite, luxury tone ("Splendid selection", "I regret to inform you").
2. When asked about availability, you MUST use the 'check_availability' tool. Do not guess.
3. If the tool finds no cabins, offering alternative dates is polite (even if you don't have them, just suggest checking the calendar).
4. Be concise. Guests value their time.

Available journeys are ONLY: Paris to Venice, Paris to Istanbul, and London to Venice.
Do not suggest or search for any other routes. If asked about unavailable routes,
politely redirect to these three journeys.

Cabin types are ONLY three: 'Historic Cabin', 'Suite', and 'Grand Suite'.
These are the ONLY cabin names that exist. Never invent cabin names like
'Paris Grand Suite' or 'Venice Suite'. When referring to cabins always use
exactly these three names only.

When a user asks to book or confirms booking, do NOT complete the booking yourself.
Instead direct them to the booking page with this exact message:
'To complete your reservation, please visit our booking page where you can select
your preferred cabin and journey. I will guide you there now.'
Then provide a link to /book

Current Year: 2025.
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
    return content.replace(/<function=\w+>[\s\S]*?<\/function>/g, '').trim();
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
                    content: "I have consulted our registry. We have limited availability for the Paris to Venice route in March 2025. Several Historic Cabins and one Grand Suite ('Vienna') remain. Would you like to proceed with a reservation?"
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
                const journey = await prisma.journey.findFirst({
                    where: {
                        name: { contains: journeyName },
                        status: 'scheduled'
                    },
                    orderBy: { departure: 'asc' } // Get next upcoming
                });

                let toolResult = "";

                if (!journey) {
                    toolResult = `I could not find a scheduled journey matching "${journeyName}".`;
                } else {
                    try {
                        const cabins = await findAvailableCabins(journey.id);
                        if (cabins.length > 0) {
                            // Summarize availability
                            const types = [...new Set(cabins.map((c: any) => c.type))];
                            const grandSuites = cabins.filter((c: any) => c.type === 'grand_suite').map((c: any) => c.number);

                            toolResult = `Journey found: ${journey.name} departing ${journey.departure.toDateString()}. 
                            Availability: ${types.map(t => t.replace('_', ' ')).join(', ')}.
                            ${grandSuites.length > 0 ? `Specific Grand Suites available: ${grandSuites.join(', ')}.` : ''}`;
                        } else {
                            toolResult = `Journey found: ${journey.name} on ${journey.departure.toDateString()}, but it is fully booked.`;
                        }
                    } catch (e) {
                        toolResult = "Error checking inventory system.";
                    }
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
                return NextResponse.json({ ...msg, content: cleanContent(msg.content || '') });
            }
        }

        return NextResponse.json({ ...responseMessage, content: cleanContent(responseMessage.content || '') });

    } catch (error: any) {
        console.error('[Chat API] Full error:', error);
        console.error('[Chat API] Error message:', error?.message);
        console.error('[Chat API] Error status:', error?.status);
        console.error('[Chat API] API key present:', !!process.env.GROQ_API_KEY);
        console.error('[Chat API] API key first 7 chars:', process.env.GROQ_API_KEY?.substring(0, 7));
        return NextResponse.json({ content: 'I apologise — I am unable to connect at the moment.' }, { status: 500 });
    }
}
