// contexts/UserContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
// Fix: Added .ts extension to the import path.
import type { User, Badge } from '../types.ts';
// Fix: Added .ts extension to the import path.
import { BADGES } from '../constants.ts';

interface UserContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  loginAsGuest: () => void;
  logout: () => void;
  addBadge: (badgeName: string) => void;
  updateQuizHistory: (subject: string, score: number) => void;
  upgradeToPremium: () => void;
  addXp: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('naija-tutor-user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('naija-tutor-user', JSON.stringify(user));
      } else {
        localStorage.removeItem('naija-tutor-user');
      }
    } catch (error) {
      console.error("Failed to save user to localStorage", error);
    }
  }, [user]);

  const login = (name: string, email: string) => {
    const newUser: User = {
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
      isPremium: false,
      badges: [],
      quizHistory: {},
      xp: 0,
    };
    setUser(newUser);
  };
  
  const loginAsGuest = () => {
    const newUser: User = {
      name: 'Guest',
      email: null,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=guest`,
      isPremium: false,
      badges: [],
      quizHistory: {},
      xp: 0,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };
  
  const upgradeToPremium = () => {
      if(user) {
          const subscriptionEndDate = new Date();
          subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
          setUser({
              ...user,
              isPremium: true,
              subscriptionEndDate: subscriptionEndDate.toLocaleString(),
          });
      }
  }

  const addBadge = (badgeName: string) => {
    if (user && !user.badges.some(b => b.name === badgeName)) {
      const badgeToAdd = BADGES.find(b => b.name === badgeName);
      if (badgeToAdd) {
        const newBadge: Badge = {
            ...badgeToAdd,
            dateEarned: new Date().toLocaleDateString(),
        }
        setUser(prevUser => prevUser ? { ...prevUser, badges: [...prevUser.badges, newBadge] } : null);
      }
    }
  };

  const updateQuizHistory = (subject: string, score: number) => {
    if (user) {
      setUser(prevUser => {
        if (!prevUser) return null;
        const newHistory = { ...prevUser.quizHistory };
        // Store the highest score for the subject
        if (!newHistory[subject] || score > newHistory[subject]) {
          newHistory[subject] = score;
        }
        return { ...prevUser, quizHistory: newHistory };
      });
    }
  };
  
  const addXp = (amount: number) => {
    if (user) {
        setUser(prevUser => prevUser ? { ...prevUser, xp: (prevUser.xp || 0) + amount } : null);
    }
  };

  const value = { user, login, loginAsGuest, logout, addBadge, updateQuizHistory, upgradeToPremium, addXp };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};