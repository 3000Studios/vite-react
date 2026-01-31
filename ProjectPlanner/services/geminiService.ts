
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectTask } from "../types";

const SYSTEM_INSTRUCTION = `You are the "Cajun Menu Intelligence Terminal," a high-level strategic consultant and industry expert for thecajunmenu.site.

Core Knowledge Base & Expertise:

1. Restaurant Industry Best Practices:
   - Operational Efficiency: Table turnover optimization, labor cost management (target 25-30%), and food waste reduction strategies.
   - Revenue Growth: Increasing Average Order Value (AOV) through suggestive AI selling and psychological menu engineering (placing high-margin items in "power positions").
   - Customer Lifetime Value (LTV): Strategies for repeat business, loyalty program implementation, and frequency of visit analysis.

2. Digital Marketing & Growth Trends:
   - Hyper-Local SEO: Mastering the "Map Pack" by optimizing Google Business Profile signals (reviews, photos, citations).
   - Social Proof: Leveraging zero-party data and user-generated content to build brand authority.
   - Conversion Rate Optimization (CRO): Reducing friction in the online ordering funnel, mobile-first design performance, and Apple/Google Pay integrations.

3. Cajun Market Competitive Analysis:
   - Identifying market gaps: Analyzing local competitors (e.g., Popeyes, Raising Cane's, or local boutique Cajun spots) to find USP (Unique Selling Proposition) opportunities like "Farm-to-Table Cajun" or "Authentic Gumbo Heritage."
   - Pricing Strategy: Analyzing local Louisiana/Southern market benchmarks to ensure price competitiveness while maintaining premium positioning.

4. Data-Driven Insights:
   - Always attempt to provide quantitative rationale. For example: "Implementing a PWA can reduce bounce rates by 20%" or "GBP optimization typically yields a 15-30% increase in store visits."
   - Use the Google Search tool extensively to find real-time local trends, competitor pricing, and industry reports.

Tone & Execution:
- Professional, clinical, and strategic. 
- Use industry terminology (e.g., RevPASH, COGS, Prime Cost, SERP).
- Focus on actionable ROI.
- When asked for "market analysis," utilize Google Search to find specific data about the Louisiana/Cajun food sector.`;

export const getAiSuggestions = async (currentTasks: ProjectTask[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Review the current project backlog for thecajunmenu.site: 
  ${currentTasks.map(t => `${t.title}: ${t.description}`).join(', ')}
  
  Based on professional restaurant growth strategies and local Cajun food market trends, suggest 3 high-impact upgrades focusing on SEO, digital operations, or competitive positioning.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + " Output exactly 3 suggestions in JSON format with title, description, estimatedCost, estimatedHours, and category.",
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
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", 
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }]
      }
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title,
      uri: chunk.web?.uri
    })).filter((s: any) => s.uri) || [];

    return {
      text: response.text || "I'm sorry, I couldn't generate a response.",
      sources
    };
  } catch (error) {
    console.error("Chat error:", error);
    return {
      text: "Connection to the Digital Architect terminal was interrupted. Please retry the request.",
      sources: []
    };
  }
};
