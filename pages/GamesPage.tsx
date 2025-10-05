import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CRITICAL_THINKING_GAMES, IQ_TESTS } from '../constants.ts';
import { GameCard } from '../components/GameCard.tsx';
import type { GameType } from '../types.ts';

const GamesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = (game: GameType) => {
    navigate(`/game/${game.id}`);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Critical Thinking Games</h1>
        <p className="text-gray-600">Sharpen your mind with these challenges.</p>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Game Types</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CRITICAL_THINKING_GAMES.map((game) => (
            <GameCard key={game.id} game={game} onStart={() => handleStartGame(game)} buttonText="Start Game" buttonColor="green" />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">IQ-Like Tests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {IQ_TESTS.map((game) => (
             <GameCard key={game.id} game={game} onStart={() => handleStartGame(game)} buttonText="Start Test" buttonColor="yellow" />
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">Retake available in 24 hours.</p>
      </section>
    </div>
  );
};

export default GamesPage;