
// Fix: Created content for the previously empty hooks/useChat.ts file.
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { askNaijaTutor } from '../services/aiTutorService.ts';
import type { ChatMessage } from '../types.ts';
import { useAppContext } from '../contexts/AppContext.tsx';

export const useChat = (subject: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { language } = useAppContext();

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      text,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const tutorResponseText = await askNaijaTutor(text, subject, language.name);
      const tutorMessage: ChatMessage = {
        id: uuidv4(),
        text: tutorResponseText,
        sender: 'tutor',
      };
      setMessages(prev => [...prev, tutorMessage]);
    } catch (error) {
      console.error("Failed to get response from tutor:", error);
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        text: "Sorry, I'm having trouble connecting. Please try again.",
        sender: 'tutor',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }, [subject, language.name]);

  return { messages, loading, sendMessage };
};