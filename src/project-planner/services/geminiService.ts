
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectTask } from "../types";

const SYSTEM_INSTRUCTION = `You are the "Cajun Menu Digital Architect".
Knowledge Base:
- Project: TheCajunmenu.site (Mockup) and thecajunmenu.com (Live).
- Client: The Cajun Menu (Restaurant).
- Theme: Cajun/Mardi Gras (Green, Purple, Gold).
- Goals: Improve traffic rankings, optimize menu navigation, and increase online orders.
- Context: You help the owner (Jane) and developer navigate website upgrades.
- Traffic Stats Knowledge: Use Google Search to find any public traffic info or provide generalized growth stats based on industry standards for local restaurants in this niche.
- Strategy: Focus on visual appeal (food photography), SEO (local Cajun food search), and conversion (online ordering).

Always provide specific numbers when discussing potential traffic increases (e.g., "Implementing Schema markup can increase organic click-through by 15-20%").
Keep responses concise and helpful.`;

export const getAiSuggestions = async (currentTasks: ProjectTask[]) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("AI suggestions disabled: Missing VITE_GEMINI_API_KEY");
      return [];
    }
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Based on these current tasks for TheCajunmenu.site:
    ${currentTasks.map(t => `${t.title}: ${t.description}`).join(', ')}

    Suggest 3 strategic Cajun-themed website upgrades.`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // Updated to a more standard model name just in case
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + " Return exactly 3 suggestions with titles, descriptions, estimated costs, estimated hours, and categories.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              estimatedCost: { type: Type.NUMBER },
              estimatedHours: { type: Type.NUMBER },
              category: { type: Type.STRING }
            },
            required: ["title", "description", "estimatedCost", "estimatedHours", "category"]
          }
        }
      }
    });

    const text = response.text;
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error("AI suggestion error:", error);
    return [];
  }
};

export const chatWithAssistant = async (message: string, history: {role: string, parts: {text: string}[]}[]) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return "I need a VITE_GEMINI_API_KEY to function. Please configure it in your environment.";
    }
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        // tools: [{ googleSearch: {} }] // Removed search tool to simplify dependency requirements if not fully set up
      }
    });
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Chat error:", error);
    return "I'm having trouble connecting right now, but I'm usually much more helpful with your menu stats!";
  }
};
