import React from 'react';
import type { GameType } from '../types.ts';

interface GameCardProps {
  game: GameType;
  onStart: () => void;
  buttonText: string;
  buttonColor: 'green' | 'yellow';
}

export const GameCard: React.FC<GameCardProps> = ({ game, onStart, buttonText, buttonColor }) => {
  const colorClasses = {
      green: 'bg-green-600 hover:bg-green-700',
      yellow: 'bg-yellow-500 hover:bg-yellow-600',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-start h-full">
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-4">{game.emoji}</span>
        <div>
            <h3 className="text-xl font-bold text-gray-800">{game.title}</h3>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-4 flex-grow">{game.description}</p>
      <button 
        onClick={onStart} 
        className={`w-full mt-auto px-4 py-2 text-white font-semibold rounded-md transition-colors ${colorClasses[buttonColor]}`}
      >
        {buttonText}
      </button>
    </div>
  );
};