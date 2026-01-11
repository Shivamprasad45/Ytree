"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.API_KEY || 'AIzaSyDGGK1xxxUEqEXlxAQ6TY3WzCiUytvqX2k');

export const generateForestAdvice = async (prompt: string) => {
    try {
        const model = ai.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: `You are Vanagrow's Forest Assistant. 
        Your goal is to educate users about reforestation, sustainability, and carbon footprints. 
        Be professional, inspiring, and factual. 
        Promote Vanagrow's mission of planting native species to restore ecosystems.
        If asked about technical details, explain simply.
        Keep responses concise (under 100 words).`,
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;

        return response.text() || "I'm sorry, I couldn't process that. Can we try again?";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I'm having trouble connecting to my forest database. Please check your connection!";
    }
};

export const summarizeArticle = async (title: string, excerpt: string) => {
    try {
        const model = ai.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: "You are a helpful assistant that summarizes blog posts. Keep it very short and engaging, under 50 words.",
        });

        const prompt = `Summarize this article based on title: "${title}" and excerpt: "${excerpt}"`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Summarize Error:", error);
        return "Could not generate summary.";
    }
};



