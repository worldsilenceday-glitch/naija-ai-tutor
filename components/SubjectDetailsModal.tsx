import React, { useState } from 'react';
import type { Subject, QuizQuestion } from '../types.ts';
import { generateLesson, generateExamQuestions } from '../services/deepseekService.ts';
import { Spinner } from './Spinner.tsx';

interface SubjectDetailsModalProps {
  subject: Subject;
  onClose: () => void;
  onStartChat: (subject: string) => void;
  onStartQuiz: (subject: string) => void;
}

type GeneratedContent = {
    type: 'lesson' | 'quiz';
    data: string | QuizQuestion[];
}

export const SubjectDetailsModal: React.FC<SubjectDetailsModalProps> = ({ subject, onClose, onStartChat, onStartQuiz }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);

  const handleGenerateLesson = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    try {
      const lesson = await generateLesson(subject.name, subject.name);
      setGeneratedContent({ type: 'lesson', data: lesson });
    } catch (e) {
      setError('Failed to generate the lesson. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQuestions = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    try {
      // Generate questions based on the first key topic of the subject
      const questions = await generateExamQuestions(subject.details[0], subject.name, 'WAEC', 3);
      if (questions) {
        setGeneratedContent({ type: 'quiz', data: questions });
      } else {
        setError('Could not generate questions for this topic.');
      }
    } catch (e) {
      setError('Failed to generate questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderGeneratedContent = () => {
    if (!generatedContent) return null;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    {generatedContent.type === 'lesson' ? `Lesson: ${subject.name}` : `WAEC Practice Questions`}
                </h2>
                <button
                    onClick={() => setGeneratedContent(null)}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                >
                    Back
                </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto pr-2">
                {generatedContent.type === 'lesson' && (
                    <div className="prose prose-sm max-w-none whitespace-pre-wrap text-gray-700">
                        {generatedContent.data as string}
                    </div>
                )}
                {generatedContent.type === 'quiz' && (
                    <div className="space-y-6">
                        {(generatedContent.data as QuizQuestion[]).map((q, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-semibold text-gray-800">{index + 1}. {q.question}</p>
                                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                                    {q.options.map(opt => (
                                        <li key={opt} className={`${opt === q.correctAnswer ? 'text-green-700 font-bold' : 'text-gray-600'}`}>
                                            {opt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
  };
  
  const renderSubjectDetails = () => (
    <>
        <div className="flex items-center mb-4">
          <span className="text-5xl mr-4">{subject.emoji}</span>
          <h2 className="text-3xl font-bold text-gray-800">{subject.name}</h2>
        </div>
        <p className="text-gray-600 mb-6">{subject.description}</p>
        
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Topics you can learn:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-600 mb-8">
            {subject.details.map(detail => <li key={detail}>{detail}</li>)}
        </ul>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => { onStartChat(subject.name); onClose(); }}
            className="px-4 py-2 text-base font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Start Chat
          </button>
          <button
            onClick={() => { onStartQuiz(subject.name); onClose(); }}
            className="px-4 py-2 text-base font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
          >
            Take Quiz
          </button>
          <button
            onClick={handleGenerateLesson}
            className="px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Generate Lesson
          </button>
          <button
            onClick={handleGenerateQuestions}
            className="px-4 py-2 text-base font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
          >
            WAEC Questions
          </button>
        </div>
        <button
            onClick={onClose}
            className="w-full mt-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Close
          </button>
    </>
  );

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full m-4 relative"
        onClick={e => e.stopPropagation()}
      >
        {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col justify-center items-center rounded-lg z-10">
                <Spinner className="w-12 h-12" />
                <p className="mt-4 text-gray-600">Generating content...</p>
            </div>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {generatedContent ? renderGeneratedContent() : renderSubjectDetails()}
      </div>
    </div>
  );
};
