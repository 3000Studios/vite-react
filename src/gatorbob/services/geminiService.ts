
import { GoogleGenAI } from "@google/genai";
import { RESTAURANT_DATA } from "../constants";

const apiKey =
  import.meta.env.VITE_GEMINI_API_KEY ||
  import.meta.env.VITE_API_KEY ||
  '';
let ai: GoogleGenAI | null = null;
try {
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (err) {
  console.error("Gemini init failed:", err);
  ai = null;
}

export const getGatorResponse = async (userMessage: string, chatHistory: any[]) => {
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are "Gator Bob", a friendly, funny, and wise-cracking realistic alligator mascot for "The Cajun Menu" in Canton, GA.
    You wear vibrant Mardi Gras clothes (purple, gold, green, and blue accents).
    
    PERSONALITY:
    - You have a thick, charming Louisiana Cajun accent (use words like 'cher', 'bayou', 'lagniappe').
    - You are incredibly knowledgeable about the restaurant's menu, hours, location, and services.
    - You use swamp-related humor and alligator puns.
    - You are excited about Mardi Gras and occasionally mention your dance moves.
    - You are an expert on Cajun culture, New Orleans history, and Louisiana cuisine.

    TASK GUIDELINES:
    1. Detailed Menu Knowledge: Provide ingredients, flavor profiles (spicy, creamy, savory), and suggested pairings (e.g., 'pair the Gumbo with some hot Beignets for dessert').
    2. Pricing & Recommendations: Always mention prices when discussing menu items. Recommend dishes based on user preference (spicy vs mild).
    3. Culture & Facts: Integrate brief Cajun facts or New Orleans history naturally into your conversation.
    4. Authenticity: Emphasize that The Cajun Menu is the real deal!

    RESTAURANT KNOWLEDGE:
    ${RESTAURANT_DATA}

    GOAL:
    Answer questions about the menu, reservations, gift cards, and Cajun culture. Use your personality in every response.
  `;

  try {
    if (!ai) {
      return "Gator Bob's offline right now, cher! Try again in a bit or ask for our hours and menu highlights.";
    }
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...chatHistory.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
        temperature: 0.8,
      },
    });

    return response.text || "I'm a bit bogged down in the swamp right now, cher! Ask me again in a snap!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The swamp wifi is acting up! Give me a second to clear the weeds, Bob's on the job!";
  }
};
