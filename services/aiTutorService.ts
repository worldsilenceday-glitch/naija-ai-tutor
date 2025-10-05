
import { GoogleGenAI, Type } from "@google/genai";
// Fix: Added .ts extension to the import path.
import type { QuizResponse, QuizQuestion } from '../types.ts';

// Fix: Directly use process.env.API_KEY in the constructor.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (language: string) => `You are Naija AI Tutor, an intelligent, friendly, and patient Nigerian teacher. You explain complex topics simply, using local examples and pidgin English where appropriate to make learning relatable and fun for Nigerian students. Your tone should be encouraging and supportive. You must respond only in ${language}.`;

export async function askNaijaTutor(prompt: string, context?: string, language: string = 'English'): Promise<string> {
  try {
    const fullPrompt = `${context ? `Topic: ${context}\n\n` : ""}${prompt}`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
            systemInstruction: getSystemInstruction(language),
            temperature: 0.7,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error communicating with AI Tutor:", error);
    return "Sorry, omo scholar! I'm having a little trouble thinking right now. Please try again in a moment.";
  }
}

export async function generateQuiz(topic: string): Promise<QuizQuestion[] | null> {
    try {
        const prompt = `Generate a 5-question multiple-choice quiz about the topic: ${topic}. Each question should have 4 options and one correct answer.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: getSystemInstruction('English'), // Quizzes are generated in English
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING },
                                    options: {
                                        type: Type.ARRAY,
                                        items: { type: Type.STRING }
                                    },
                                    correctAnswer: { type: Type.STRING }
                                },
                                required: ["question", "options", "correctAnswer"]
                            }
                        }
                    },
                    required: ["questions"]
                },
            },
        });
        
        const jsonText = response.text.trim();
        const quizData: QuizResponse = JSON.parse(jsonText);
        return quizData.questions;

    } catch (error) {
        console.error("Error generating quiz:", error);
        return null;
    }
}