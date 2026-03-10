import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const systemPrompt = `You are an AI assistant built to answer questions about Amogh Lonare on his portfolio website.
Here is the context about Amogh that you need to know:
- Name: Amogh Lonare
- Profession: Developer
- Portfolio domain: portfolio-amoghxo.vercel.app
- About: He built this interactive scrollytelling portfolio to showcase his skills in 3D web development, React, and Next.js.
- Contact: lonareamogh@gmail.com
- Resume: Available for download right here on the portfolio!

Be friendly, concise, and professional. Only answer questions related to Amogh's professional experience, skills, or portfolio. If someone asks something unrelated, kindly pivot back to Amogh. Keep answers short (1-3 sentences maximum) since they will be displayed in a small chat box widget.`;

    const result = await streamText({
        // @ts-expect-error Type mismatch between AI SDK and Google provider package versions.
        model: google("gemini-1.5-flash"),
        system: systemPrompt,
        messages,
    });

    return result.toDataStreamResponse();
}
