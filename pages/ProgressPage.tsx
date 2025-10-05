import React from 'react';
// Fix: Added .tsx extension to the import path.
import { useUser } from '../contexts/UserContext.tsx';
// Fix: Added .tsx extension to the import path.
import { BadgesDisplay } from '../components/BadgesDisplay.tsx';
import { useNavigate } from 'react-router-dom';

const ProgressPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) {
    // This should be handled by ProtectedRoute, but as a fallback:
    navigate('/login');
    return null;
  }
  
  const quizSubjects = Object.keys(user.quizHistory);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Progress</h1>
        <p className="text-gray-600">Track your learning journey and achievements.</p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Badges Earned ({user.badges.length})</h2>
        <BadgesDisplay badges={user.badges} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quiz Performance</h2>
        {quizSubjects.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-4">
              {quizSubjects.map(subject => (
                <li key={subject} className="flex items-center justify-between flex-wrap">
                  <span className="font-medium text-gray-800 mb-2 sm:mb-0">{subject}</span>
                  <div className="flex items-center w-full sm:w-auto">
                    <span className="text-lg font-bold text-green-600 mr-4">{Math.round(user.quizHistory[subject])}%</span>
                    <div className="flex-grow sm:w-48 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${user.quizHistory[subject]}%` }}></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <p className="text-gray-500">You haven't completed any quizzes yet. Go to the dashboard to start one!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProgressPage;
