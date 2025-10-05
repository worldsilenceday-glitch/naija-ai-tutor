import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion } from '../types.ts';

// API Key management and client initialization, consistent with other services.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System prompt tailored for high-quality educational content generation.
const getSystemInstruction = (examStyle: 'WAEC' | 'JAMB' | 'NECO' = 'WAEC') =>
 `You are an expert Nigerian secondary school teacher and exam preparer. Your task is to generate high-quality educational content.
  - Your responses must be clear, accurate, and tailored for the SS3 curriculum.
  - For questions, strictly adhere to the specified exam style (${examStyle}).
  - For lessons, provide comprehensive explanations with relevant Nigerian examples.`;

/**
 * Generates a detailed lesson plan for a given topic and subject.
 * @param topic The topic for the lesson.
 * @param subject The subject of the lesson.
 * @returns A promise that resolves to a string containing the lesson content.
 */
export async function generateLesson(topic: string, subject: string): Promise<string> {
    try {
        const prompt = `Generate a detailed lesson plan for the SS3 topic "${topic}" in the subject "${subject}". The lesson should include:
        1. An introduction to the topic.
        2. Key learning objectives.
        3. A detailed explanation of core concepts with examples relevant to Nigeria.
        4. A summary of the main points.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: getSystemInstruction(),
                temperature: 0.5, // Lower temperature for more factual, lesson-oriented content
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating lesson from DeepSeek service:", error);
        return "Sorry, an error occurred while generating the lesson. Please try again later.";
    }
}

interface ExamQuestionsResponse {
    questions: QuizQuestion[];
}

/**
 * Generates exam-style multiple-choice questions for a given topic.
 * @param topic The topic for the questions.
 * @param subject The subject of the questions.
 * @param examStyle The style of the exam (WAEC, JAMB, or NECO).
 * @param count The number of questions to generate.
 * @returns A promise that resolves to an array of QuizQuestion objects or null if an error occurs.
 */
export async function generateExamQuestions(topic: string, subject: string, examStyle: 'WAEC' | 'JAMB' | 'NECO' = 'WAEC', count: number = 5): Promise<QuizQuestion[] | null> {
    try {
        const prompt = `Generate ${count} ${examStyle}-style multiple-choice questions on the topic "${topic}" for the subject "${subject}".
        Each question must have 4 options and a single correct answer.
        The difficulty should be appropriate for an SS3 student preparing for their final exams.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: getSystemInstruction(examStyle),
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
        const data: ExamQuestionsResponse = JSON.parse(jsonText);
        return data.questions;

    } catch (error) {
        console.error(`Error generating ${examStyle} questions from DeepSeek service:`, error);
        return null;
    }
}
