import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { findAvailableCabins } from '@/lib/inventory';
import { prisma } from '@/lib/prisma';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'mock-key',
});

// System Prompt for the "Digital Maître d'"
const SYSTEM_PROMPT = `
You are the Digital Maître d' of the Venice Simplon-Orient-Express (Project Vitesse).
Your persona is elegant, sophisticated, and helpful, but never servile.
You speak with a slight European flair (British/French mix), using words like "Splendid," "Certainly," and "Allow me."

Your primary goal is to assist guests in booking their journey.
You have access to the real-time inventory system.
When asked about availability, ALWAYS use the 'check_availability' tool.
NEVER invent availability or prices. If the tool returns no results, apologize elegantly and suggest an alternative date (mocked for now).

Current Context:
- Journey: Paris to Venice
- Date: June 1st, 2025
`;

// Tool Definitions
const tools = [
    {
        type: "function" as const,
        function: {
            name: "check_availability",
            description: "Check for available cabins on the Paris to Venice journey.",
            parameters: {
                type: "object",
                properties: {
                    journey_name: {
                        type: "string",
                        description: "Name of the journey (e.g., 'Paris to Venice')",
                    },
                },
                required: ["journey_name"],
            },
        },
    },
];

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const lastUserMessage = messages[messages.length - 1].content.toLowerCase();

        // --- DEMO MODE (If no API Key) ---
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'mock-key') {
            // Simulate "Thinking" delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock Tool Execution for "availability"
            if (lastUserMessage.includes("available") || lastUserMessage.includes("book")) {
                const journey = await prisma.journey.findFirst({ where: { name: "Paris to Venice" } });
                if (journey) {
                    const cabins = await findAvailableCabins(journey.id);
                    if (cabins.length > 0) {
                        const cabinDetails = cabins.map((c: { type: string; number: string }) => `${c.type} (${c.number})`).join(", ");
                        return NextResponse.json({
                            role: "assistant",
                            content: `Splendid news. I have checked our registry, and we have the following cabins available for the Paris to Venice journey: ${cabinDetails}. Shall I reserve one for you?`
                        });
                    }
                }
                return NextResponse.json({
                    role: "assistant",
                    content: "I regret to inform you that the journey is fully booked."
                });
            }

            // Default Mock Response
            return NextResponse.json({
                role: "assistant",
                content: "I am the Digital Maître d' of Project Vitesse. How may I assist you with your journey today?"
            });
        }

        // --- REAL MODE (OpenAI) ---
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
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
                const journey = await prisma.journey.findFirst({
                    where: { name: "Paris to Venice" }
                });

                let availabilityResult = "I apologize, but I could not find that journey in our records.";

                if (journey) {
                    const cabins = await findAvailableCabins(journey.id);
                    if (cabins.length > 0) {
                        const cabinDetails = cabins.map((c: { type: string; number: string }) => `${c.type} (${c.number})`).join(", ");
                        availabilityResult = `I am pleased to inform you that we have the following cabins available for the Paris to Venice journey: ${cabinDetails}.`;
                    } else {
                        availabilityResult = "I regret to inform you that the Paris to Venice journey is fully booked for this date.";
                    }
                }

                const secondResponse = await openai.chat.completions.create({
                    model: "gpt-4o",
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        ...messages,
                        responseMessage,
                        {
                            role: "tool",
                            tool_call_id: toolCall.id,
                            content: availabilityResult,
                        }
                    ]
                });

                return NextResponse.json(secondResponse.choices[0].message);
            }
        }

        return NextResponse.json(responseMessage);

    } catch (error) {
        console.error("AI Error:", error);
        return NextResponse.json(
            { role: "assistant", content: "I apologize, but I am momentarily distracted. Could you please repeat your request?" },
            { status: 500 }
        );
    }
}
