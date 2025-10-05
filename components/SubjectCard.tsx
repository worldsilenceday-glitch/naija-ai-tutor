import React from 'react';
import type { Subject } from '../types.ts';

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col overflow-hidden group"
    >
      <div className="relative">
        <img 
          src={subject.imageUrl} 
          alt={subject.name} 
          className="w-full h-32 object-cover transition-transform group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      <div className="p-4 flex flex-col items-center text-center flex-grow relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white p-2 rounded-full shadow-lg border-4 border-white">
            <span className="text-4xl">{subject.emoji}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mt-6">{subject.name}</h3>
          <p className="text-gray-600 mt-2 text-sm">{subject.description}</p>
      </div>
    </div>
  );
};