

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.tsx';
import { SUBJECTS } from '../constants.ts';
import { SubjectCard } from '../components/SubjectCard.tsx';
// Fix: Corrected the import to be a named import.
import { SubjectDetailsModal } from '../components/SubjectDetailsModal.tsx';
import type { Subject } from '../types.ts';
import { LanguageSelector } from '../components/LanguageSelector.tsx';

const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set<string>();
    SUBJECTS.forEach(s => set.add(s.category ?? 'General'));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredSubjects = useMemo(() => {
    if (selectedCategory === 'All') return SUBJECTS;
    return SUBJECTS.filter(s => (s.category ?? 'General') === selectedCategory);
  }, [selectedCategory]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleStartChat = (subject: string) => {
    navigate(`/chat/${encodeURIComponent(subject)}`);
  };
  
  const handleStartQuiz = (subject: string) => {
    navigate(`/quiz/${encodeURIComponent(subject)}`);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
          <div>
              <h1 className="text-3xl font-bold text-gray-800 capitalize">Hello, {user.name}!</h1>
              <p className="text-gray-600">What would you like to learn today?</p>
          </div>
          <LanguageSelector />
      </header>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Filter:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSubjects.map((subject) => (
          <SubjectCard 
            key={subject.name} 
            subject={subject} 
            onClick={() => setSelectedSubject(subject)}
          />
        ))}
      </div>

      {selectedSubject && (
        <SubjectDetailsModal 
          subject={selectedSubject}
          onClose={() => setSelectedSubject(null)}
          onStartChat={handleStartChat}
          onStartQuiz={handleStartQuiz}
        />
      )}
    </div>
  );
};

export default DashboardPage;