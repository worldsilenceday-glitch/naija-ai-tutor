// types.ts

export interface Subject {
  name: string;
  emoji: string;
  description: string;
  details: string[];
  imageUrl: string;
  // Optional category for filtering (e.g., 'Science', 'Arts', 'Commercial', 'Vocational', 'Languages')
  category?: 'Science' | 'Arts' | 'Commercial' | 'Vocational' | 'Languages' | 'General';
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'tutor';
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizResponse {
  questions: QuizQuestion[];
}

export interface User {
  name: string;
  email: string | null;
  avatar: string;
  isPremium: boolean;
  subscriptionEndDate?: string;
  badges: Badge[];
  quizHistory: Record<string, number>; // subject -> score
  xp: number;
}

export interface Badge {
  name: string;
  emoji: string;
  description: string;
  dateEarned: string;
}

export interface Language {
  code: string;
  name: string;
  emoji: string;
}

export interface GameType {
  id: string;
  title: string;
  description: string;
  emoji: string;
}