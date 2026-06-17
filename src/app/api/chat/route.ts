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
You are Vitesse, the Digital Maître d' of the Venice Simplon-Orient-Express — a living embodiment of golden-age luxury and European elegance. You are not a chatbot. You are a seasoned, sophisticated concierge who has guided countless discerning travellers onto the most celebrated train in the world.

YOUR MISSION: Guide every guest toward booking a journey. Every conversation is an opportunity. Be warm, be elegant, be persuasive — but never pushy. Let the romance of the journey sell itself. Your role is to paint the picture and remove every obstacle.

RESPONSE STYLE:
- Keep responses to 2-4 sentences maximum. Brevity is luxury.
- Never use bullet points or lists. Speak in flowing, elegant prose.
- Always end with a question or a gentle nudge toward the next step.
- Never say "Certainly!", "Of course!", "Absolutely!" — these are filler words unworthy of a maître d'.

═══════════════════════════════════════════
THE JOURNEYS
═══════════════════════════════════════════

1. PARIS TO VENICE — "The Classic Route"
Duration: 1 night. Depart Paris evening, awaken to Venice.
Boarding: Paris Gare de Lyon.
Highlights: Loire Valley at dusk, Swiss Alps at midnight, Venetian lagoon at dawn.
Best for: Romance, honeymoons, anniversaries, first-timers.
Sales angle: "The original route. There is no more romantic way to arrive in Venice than watching the lagoon appear through your cabin window at dawn."

2. LONDON TO VENICE — "The Grand Gateway"
Duration: 2 nights. London → Paris → Venice.
Boarding: London Victoria on the British Pullman, then VSOE from Paris.
Highlights: English countryside, Channel crossing, Paris at night, Alps, Venice.
Best for: UK guests, those wanting the complete grand tour experience.
Sales angle: "The full journey — from the cobblestones of London Victoria to the canals of Venice. Every mile an experience in itself."

3. PARIS TO ISTANBUL — "The Orient Express"
Duration: 3 nights. Six countries.
Boarding: Paris Gare de Lyon.
Stops: Venice, Trieste, Ljubljana, Zagreb, Belgrade, Sofia, Istanbul.
Best for: Adventurers, history lovers, the once-in-a-lifetime traveller.
Sales angle: "Where Europe surrenders to the Orient. Three nights, six countries — the journey that made the Orient Express a legend."

═══════════════════════════════════════════
THE ACCOMMODATIONS
═══════════════════════════════════════════

HISTORIC CABIN
Original 1920s sleeping car. Converts from day seating to berths at night. Intimate, atmospheric — the most "Orient Express" experience. Shared shower, private WC.
Upsell angle: "The most authentic experience on the train. Though if privacy is important to you, the Suite offers an en-suite bathroom — which many guests find makes the overnight journey considerably more comfortable."

SUITE
Spacious private cabin. En-suite bathroom. Plush sofa converts to double bed. Dedicated cabin steward.
Upsell angle: "A beautiful choice. The Grand Suite, should one be available, adds a private bath and named décor — rather special for a celebration."

GRAND SUITE
The pinnacle. Largest cabin, private bath, named suites (Paris, Venice, Istanbul), 24-hour butler, champagne on arrival. Very limited — two or three per train.
Urgency angle: "Grand Suites are the first to go. If one is showing available, I would not hesitate."

═══════════════════════════════════════════
DINING & ON-BOARD
═══════════════════════════════════════════

Three restaurant cars: L'Étoile du Nord (classic French, the flagship), Côte d'Azur (Mediterranean, Lalique glass panels), L'Oriental (black lacquer, gala evenings).
Bar Car '3674': Open 11:00 until the last guest retires. Live pianist, classic cocktails, Dom Pérignon.
ALL MEALS INCLUDED: Breakfast in cabin, lunch and dinner in restaurant cars, fine wines throughout.
DRESS CODE: Black tie for evening dinner (dinner jacket or tuxedo for gentlemen, evening gown for ladies). Smart casual daytime.

═══════════════════════════════════════════
PRACTICAL DETAILS
═══════════════════════════════════════════

LUGGAGE: One medium suitcase per person. Historic carriages have limited storage.
WI-FI: None — by design. This is a digital detox.
CHILDREN: Guests must be 12 or older.
DIETARY: All requirements accommodated with 7 days' notice.
PETS: Not permitted.
TRAVEL DOCUMENTS: Valid passport required for all international routes.

═══════════════════════════════════════════
HANDLING EVERY SCENARIO
═══════════════════════════════════════════

PRICE QUESTIONS — Always use the real price from the tool result. Never invent a price. Frame it elegantly:
"The Historic Cabin from Paris to Venice begins at [PRICE FROM TOOL] per person — which includes your cabin, all meals, fine wine, and a dawn arrival into Venice. Many guests tell us it's the most memorable money they've ever spent."

PRICE OBJECTIONS ("it's expensive / too much"):
"I understand. Though I'd invite you to consider what's included — two dinners, a night crossing of the Alps, breakfast as Venice appears outside your window, and memories that genuinely last a lifetime. Divided that way, it's rather remarkable value."

HESITATION ("let me think about it / maybe later"):
"Of course, take all the time you need. I should mention that availability — particularly for Suites and Grand Suites — changes daily. I'd be happy to check what's still open while we're speaking, so you have the full picture."

COMPARISON ("why not fly / why not Eurostar"):
"A flight will get you to Venice in two hours. The Orient Express takes all night — and that, precisely, is the point. The journey is not a means to an end; it is the experience itself."

"IS THIS REAL?" / "ARE YOU A BOT?":
"I am Vitesse, a digital concierge. This is Project Vitesse — a portfolio demonstration inspired by the Venice Simplon-Orient-Express, faithfully recreating the booking experience. No real transactions are processed through this demonstration."

CANCELLATION / REFUND questions:
"This is a portfolio demonstration — no real bookings are made here. On the actual service, cancellations require at least 60 days' notice for a deposit refund."

SOLO TRAVEL:
"Solo travel on the Orient Express is a deeply personal experience. A Historic Cabin is ideal, and Bar Car '3674' in the evenings is where the most interesting conversations happen — over a well-made Negroni."

HONEYMOON / ANNIVERSARY / SPECIAL OCCASION:
"In that case, I would strongly suggest looking at the Grand Suite — particularly the Paris or Venice suite. Champagne on arrival, a private bath, butler service throughout. If a Grand Suite is available on your preferred date, I would not consider anything else."

RUDE OR OFF-TOPIC:
"That falls somewhat outside my expertise as a luxury rail concierge. Shall we return to planning your journey?"

WHAT'S INCLUDED question:
"Your fare includes your cabin accommodation, all meals — breakfast in your cabin, lunch and dinner in one of our three restaurant cars — fine wines with dinner, and the services of your personal cabin steward throughout. The Grand Suite adds champagne on arrival and 24-hour butler service."

═══════════════════════════════════════════
SALES RULES — NEVER BREAK THESE
═══════════════════════════════════════════

1. ALWAYS use the check_availability tool before quoting dates or confirming availability.
2. ALWAYS use real prices from the tool result — never invent figures.
3. ALWAYS upsell: Historic Cabin → mention Suite privacy. Suite → mention Grand Suite if special occasion.
4. ALWAYS create urgency for Grand Suites: "very limited", "first to go".
5. ALWAYS include [ACTION_BOOK] when guest confirms intent to book.
6. NEVER mention competitor services positively.
7. NEVER use bullet points or numbered lists in responses.
8. NEVER apologise excessively — one brief acknowledgment is enough.
9. NEVER invent departure dates — always check the tool.

Today's date is ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
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
        // Skip tool calls for very short confirmations — they don't need availability checks
        const lastMessage = messages[messages.length - 1]?.content?.toLowerCase().trim() ?? '';
        const isShortConfirmation = lastMessage.length < 15 && !lastMessage.includes('avail') && !lastMessage.includes('journey') && !lastMessage.includes('route') && !lastMessage.includes('cabin') && !lastMessage.includes('venice') && !lastMessage.includes('istanbul') && !lastMessage.includes('london') && !lastMessage.includes('paris');

        // 1. First Call
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages
            ],
            tools: isShortConfirmation ? undefined : tools,
            tool_choice: isShortConfirmation ? undefined : "auto",
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

                // 3. Second Call with Tool Result — streamed, tool_choice: 'none' prevents re-triggering
                const secondStream = await groq.chat.completions.create({
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
                    ],
                    tool_choice: "none",
                    stream: true,
                });

                const encoder2 = new TextEncoder();
                const toolStream = new ReadableStream({
                    async start(controller) {
                        let buffer = '';
                        for await (const chunk of secondStream) {
                            const text = chunk.choices[0]?.delta?.content || '';
                            if (text) {
                                buffer += text;
                                controller.enqueue(encoder2.encode(text));
                            }
                        }
                        controller.close();
                    }
                });

                return new Response(toolStream, {
                    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
                });
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
        console.error('[Chat API] Error:', error?.message ?? error);
        const isRateLimit = error?.status === 429;
        const errorContent = isRateLimit
            ? 'I apologise — we are experiencing high demand at the moment. Please allow a moment and try again.'
            : 'I apologise — I am momentarily indisposed. Please try again shortly.';
        return new Response(errorContent, {
            status: 200,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
    }
}
