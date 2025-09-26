import { GoogleGenAI, Type } from "@google/genai";

// Initialize GoogleGenAI with the API key from environment variables as per guidelines.
// The API key is assumed to be pre-configured and available in `process.env.API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// Type for chat history, aligned with Gemini API
type ChatHistory = {
    role: "user" | "model";
    parts: { text: string }[];
}[];

export const getAiResponse = async (prompt: string, history: ChatHistory) => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: history,
            config: {
                systemInstruction: "You are a helpful and friendly tour guide for Ba Den Mountain (Núi Bà Đen) in Vietnam. Provide concise and relevant information to tourists. Answer in Vietnamese.",
            }
        });
        
        const result = await chat.sendMessage(prompt);
        
        return result.text;

    } catch (error) {
        console.error("Error getting AI response:", error);
        return "Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.";
    }
};


export const getItinerary = async (preferences: string): Promise<string> => {
    // FIX: Updated prompt to remove JSON structure instructions, as responseSchema handles this.
    const prompt = `Create a detailed one-day itinerary for a visitor to Ba Den Mountain based on these preferences: ${preferences}. 
    Provide timings, locations, and a brief description for each activity. The locations should be real places on the mountain.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            // FIX: Added responseSchema to ensure the model returns a valid JSON object.
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        itinerary: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    time: { type: Type.STRING },
                                    activity: { type: Type.STRING },
                                    location: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                },
                                required: ["time", "activity", "location", "description"]
                            }
                        }
                    },
                    required: ["itinerary"]
                }
            },
        });
        
        return response.text;
    } catch (error) {
        console.error("Error generating itinerary:", error);
        throw new Error("Failed to generate itinerary.");
    }
}