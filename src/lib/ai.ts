
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Analysis } from "./types";

export async function analyzeAgreement(text: string): Promise<Omit<Analysis, "id" | "agreement_id">> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `You are a Senior Policy Analyst for the European Commission. Analyze the following international agreement text. 
    
    You must output a JSON object with these exact keys:
    - sovereignty_score (0-100)
    - binding_score (0-100)
    - human_centricity_score (0-100)
    - economic_weight (0-100)
    - analysis_notes (string, max 2 sentences)

    Rubric:
    sovereignty_score: 100 = Absolute state sovereignty; 0 = Supranational authority.
    binding_score: 100 = Binding/Hard law; 0 = Board/Soft law.
    human_centricity_score: 100 = Rights of individuals; 0 = State interests.
    economic_weight: 100 = Major market impact; 0 = Symbolic.

    Text: ${text.substring(0, 15000)}`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
        const cleanJson = jsonMatch ? jsonMatch[0] : textResponse;

        return JSON.parse(cleanJson);
    } catch (error) {
        console.error("Error analyzing agreement:", error);
        return {
            sovereignty_score: 50,
            binding_score: 50,
            human_centricity_score: 50,
            economic_weight: 50,
            analysis_notes: "Analysis temporarily unavailable."
        };
    }
}
