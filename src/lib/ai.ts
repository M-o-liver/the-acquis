
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Analysis } from "./types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeAgreement(text: string): Promise<Omit<Analysis, "id" | "agreement_id">> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `You are a Senior Policy Analyst for the European Commission. Analyze the following international agreement text. You must output a valid JSON object containing 4 integer scores (0-100) and a brief justification note.

sovereignty_score: 100 = Absolute state sovereignty preserved; 0 = Total surrender to supranational authority.
binding_score: 100 = Binding with hard penalties; 0 = Non-binding / Aspirational.
human_centricity_score: 100 = Focuses on individual rights; 0 = Focuses on state/military abstract.
economic_weight: 100 = Direct financial impact; 0 = Purely diplomatic/symbolic.

Output strictly JSON.

Text: ${text.substring(0, 10000)}...`; // Truncate to avoid token limits if text is massive

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        // Clean up markdown code blocks if present
        const cleanJson = textResponse.replace(/^```json\n|\n```$/g, "").trim();

        return JSON.parse(cleanJson);
    } catch (error) {
        console.error("Error analyzing agreement:", error);
        // Fallback or re-throw
        return {
            sovereignty_score: 50,
            binding_score: 50,
            human_centricity_score: 50,
            economic_weight: 50,
            analysis_notes: "Analysis failed due to API error."
        };
    }
}
