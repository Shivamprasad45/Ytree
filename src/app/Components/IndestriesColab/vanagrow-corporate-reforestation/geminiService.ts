import { GoogleGenerativeAI } from "@google/generative-ai";

export const getSustainabilityInsights = async (industry: string, treeGoal: string): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.API_KEY;

  if (!apiKey) {
    console.warn("Gemini API Key missing");
    return "AI insights are unavailable without an API key.";
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Using gemini-1.5-flash as it is the current cost-effective standard
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `Provide a 2-sentence professional insight on how a ${industry} company can maximize their ESG impact by planting ${treeGoal} trees per year with VanaGrow. Focus on specific industry benefits like carbon offsetting or brand value.`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 150,
      }
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our sustainability consultant is currently busy. Please proceed with your application.";
  }
};
