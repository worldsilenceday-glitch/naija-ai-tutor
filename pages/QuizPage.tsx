import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Fix: Added .ts extension to the import path.
import { generateQuiz } from '../services/aiTutorService.ts';
// Fix: Added .ts extension to the import path.
import { getCachedQuiz, setCachedQuiz } from '../services/quizCacheService.ts';
// Fix: Added .tsx extension to the import path.
import { useUser } from '../contexts/UserContext.tsx';
// Fix: Added .ts extension to the import path.
import type { QuizQuestion } from '../types.ts';
// Fix: Added .tsx extension to the import path.
import { Spinner } from '../components/Spinner.tsx';
// Fix: Added .tsx extension to the import path.
import { ArrowLeftIcon } from '../components/icons.tsx';

const QuizPage: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const { user, addBadge, updateQuizHistory, addXp } = useUser();
  const decodedSubject = subject ? decodeURIComponent(subject) : '';

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const loadQuiz = useCallback(async () => {
    setIsFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsLoading(true);
    setError(null);
    setXpEarned(0);
    try {
      let quizQuestions = getCachedQuiz(decodedSubject);
      if (!quizQuestions) {
        quizQuestions = await generateQuiz(decodedSubject);
        if (quizQuestions) {
          setCachedQuiz(decodedSubject, quizQuestions);
        }
      }

      if (quizQuestions && quizQuestions.length > 0) {
        setQuestions(quizQuestions);
      } else {
        setError("Sorry, I couldn't generate a quiz for this topic. Please try again later.");
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred while fetching the quiz.");
    } finally {
      setIsLoading(false);
    }
  }, [decodedSubject]);

  useEffect(() => {
    loadQuiz();
  }, [loadQuiz]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
        const finalScore = isCorrect ? score + 1 : score;
        const xpGained = finalScore * 10;
        setXpEarned(xpGained);

        if (user) {
            addXp(xpGained);
            const percentageScore = (finalScore / questions.length) * 100;
            updateQuizHistory(decodedSubject, percentageScore);
            addBadge("Quiz Whiz");
            if (percentageScore === 100) {
                addBadge("Perfect Score");
            }
        }
        setIsFinished(true);
    } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
        <Spinner className="w-12 h-12 mb-4" />
        <p className="text-lg text-gray-700">Generating your quiz on {decodedSubject}...</p>
        <p className="text-sm text-gray-500">This might take a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
        <p className="text-lg text-red-500">{error}</p>
        <button onClick={() => navigate('/dashboard')} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md">
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
        <p className="text-xl text-gray-600 mb-4">You scored {score} out of {questions.length}</p>
        <p className="text-lg font-semibold text-blue-500 mb-4">+ {xpEarned} XP Earned!</p>
        <div className="text-5xl font-bold text-green-600 mb-8">{percentage}%</div>
        <div className="flex space-x-4">
            <button onClick={loadQuiz} className="px-6 py-3 bg-green-100 text-green-700 font-semibold rounded-lg">
                Try Again
            </button>
            <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg">
                Go to Dashboard
            </button>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return null; // Should not happen if not loading and no error

  return (
    <div className="flex flex-col h-screen bg-gray-100">
        <header className="bg-white shadow-md sticky top-0 z-10 flex items-center p-4">
            <button onClick={() => navigate('/dashboard')} className="p-2 mr-2 rounded-full hover:bg-gray-200">
                <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
            </button>
            <div>
                <h1 className="text-xl font-bold text-gray-800">Quiz: {decodedSubject}</h1>
                <p className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
        </header>
        <main className="flex-1 p-4 md:p-8 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg font-semibold text-gray-800 mb-6">{currentQuestion.question}</p>
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(option)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${selectedAnswer === option ? 'bg-green-100 border-green-500' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className="w-full mt-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
            </div>
        </main>
    </div>
  );
};

export default QuizPage;