import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Fix: Added .ts extension to the import path.
import { CRITICAL_THINKING_GAMES, IQ_TESTS } from '../constants.ts';
// Fix: Added .tsx extension to the import path.
import { ArrowLeftIcon } from '../components/icons.tsx';

const GamePage: React.FC = () => {
  const { gameType } = useParams<{ gameType: string }>();
  const navigate = useNavigate();

  const game = [...CRITICAL_THINKING_GAMES, ...IQ_TESTS].find(g => g.id === gameType);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-10 flex items-center p-4">
          <button onClick={() => navigate('/games')} className="p-2 mr-2 rounded-full hover:bg-gray-200">
              <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">{game ? game.title : 'Game'}</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center">
        {game ? (
            <div className="text-center">
                <span className="text-6xl mb-4">{game.emoji}</span>
                <h2 className="text-2xl font-bold text-gray-800">{game.title}</h2>
                <p className="text-gray-600 mt-2">{game.description}</p>
                <div className="mt-8 p-8 bg-white rounded-lg shadow-md">
                    <p className="text-lg text-gray-500">Game content will be here.</p>
                </div>
            </div>
        ) : (
            <p>Game not found.</p>
        )}
      </main>
    </div>
  );
};

export default GamePage;
