import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '../hooks/useChat.ts';
import { useUser } from '../contexts/UserContext.tsx';
import { TypingIndicator } from '../components/TypingIndicator.tsx';
import { ArrowLeftIcon } from '../components/icons.tsx';
import { useVoiceChat } from '../hooks/useVoiceChat.ts';
import { useAppContext } from '../contexts/AppContext.tsx';

const ChatPage: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const { user, addBadge } = useUser();
  const { language } = useAppContext();
  const decodedSubject = subject ? decodeURIComponent(subject) : '';

  const { messages, loading, sendMessage } = useChat(decodedSubject);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const systemInstruction = `You are Naija AI Tutor, an intelligent, friendly, and patient Nigerian teacher. You explain complex topics simply, using local examples and pidgin English where appropriate to make learning relatable and fun for Nigerian students. The current topic is ${decodedSubject}. Your tone should be encouraging and supportive. You must respond only in ${language.name}.`;

  const { isRecording, isSpeaking, transcript, startRecording, stopRecording } = useVoiceChat(systemInstruction);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  useEffect(() => {
    if (messages.length > 0 && messages.some(m => m.sender === 'user') && user) {
        addBadge("Curious Mind");
    }
  }, [messages, user, addBadge]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
    setInputText('');
  };

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-10 flex items-center p-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 mr-2 rounded-full hover:bg-gray-200">
              <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">{decodedSubject}</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-lg p-3 rounded-lg ${msg.sender === 'user' ? 'bg-green-500 text-white' : 'bg-white text-gray-800 shadow-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                  <TypingIndicator />
              </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-white border-t p-4">
          {isRecording && (
            <div className="text-center text-sm text-gray-600 mb-2 p-2 bg-gray-100 rounded-md">
                {transcript ? <em>"{transcript}"</em> : "Listening..."}
                {isSpeaking && <span className="ml-2 animate-pulse">Tutor is speaking...</span>}
            </div>
          )}
          <div className="flex items-center space-x-2">
              <form onSubmit={handleSend} className="flex-1 flex items-center">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full p-3 border border-gray-300 rounded-l-md focus:ring-green-500 focus:border-green-500"
                  disabled={isRecording}
                />
                <button type="submit" className="px-4 py-3 bg-green-600 text-white rounded-r-md hover:bg-green-700 disabled:bg-gray-400" disabled={loading || !inputText.trim() || isRecording}>
                  Send
                </button>
              </form>
              <button onClick={isRecording ? stopRecording : startRecording} className={`p-3 rounded-full transition-colors ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-700'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
              </button>
          </div>
      </footer>
    </div>
  );
};

export default ChatPage;
