
// Fix: Added .ts extension to the import path.
import type { QuizQuestion } from '../types.ts';

const CACHE_PREFIX = 'naija-tutor-quiz-';
const CACHE_DURATION_MS = 1000 * 60 * 60; // 1 hour

interface CachedQuiz {
  timestamp: number;
  questions: QuizQuestion[];
}

export function getCachedQuiz(topic: string): QuizQuestion[] | null {
  const key = `${CACHE_PREFIX}${topic.toLowerCase().replace(/\s/g, '-')}`;
  try {
    const cachedItem = localStorage.getItem(key);
    if (!cachedItem) {
      return null;
    }

    const data: CachedQuiz = JSON.parse(cachedItem);
    const isExpired = Date.now() - data.timestamp > CACHE_DURATION_MS;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return data.questions;
  } catch (error) {
    console.error("Failed to read quiz from cache:", error);
    return null;
  }
}

export function setCachedQuiz(topic: string, questions: QuizQuestion[]): void {
  const key = `${CACHE_PREFIX}${topic.toLowerCase().replace(/\s/g, '-')}`;
  const data: CachedQuiz = {
    timestamp: Date.now(),
    questions,
  };

  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save quiz to cache:", error);
  }
}
