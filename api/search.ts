import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { query, context } = req.body;

        if (!query || !context) {
            return res.status(400).json({ error: "Missing query or context" });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error("Server configuration error: Missing GEMINI_API_KEY");
            return res.status(500).json({ error: "Server missing API key configuration." });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Context (Psalm 1):\n${context}\n\nUser Question: "${query}"\n\nTask: Find the verses in the provided text that answer the question or relate to the idea. Explain why briefly.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        explanation: { type: Type.STRING, description: "A brief explanation of where the idea is found." },
                        verseIds: {
                            type: Type.ARRAY,
                            items: { type: Type.INTEGER },
                            description: "List of verse numbers that match."
                        }
                    }
                }
            }
        });

        if (response.text) {
            let rawJson = response.text.trim();
            if (rawJson.startsWith('```json')) rawJson = rawJson.slice(7);
            if (rawJson.startsWith('```')) rawJson = rawJson.slice(3);
            if (rawJson.endsWith('```')) rawJson = rawJson.slice(0, -3);

            const result = JSON.parse(rawJson.trim());
            return res.status(200).json(result);
        }

        res.status(500).json({ error: "Empty response from Gemini server." });
    } catch (error: any) {
        console.error("Vercel Serverless API Error:", error);
        res.status(500).json({ error: error?.message || "Internal Server Error" });
    }
}
