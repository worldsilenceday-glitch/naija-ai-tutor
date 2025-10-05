
import React from 'react';
import type { Badge } from '../types.ts';

interface BadgesDisplayProps {
  badges: Badge[];
}

export const BadgesDisplay: React.FC<BadgesDisplayProps> = ({ badges }) => {
  if (badges.length === 0) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-gray-500">No badges earned yet. Keep learning!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <div key={badge.name} className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
          <span className="text-4xl mb-2">{badge.emoji}</span>
          <h4 className="font-bold text-sm text-gray-800">{badge.name}</h4>
          <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
        </div>
      ))}
    </div>
  );
};
