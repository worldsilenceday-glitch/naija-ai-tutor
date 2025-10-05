
import React from 'react';
// Fix: Added .tsx extension to the import path.
import { useAppContext } from '../contexts/AppContext.tsx';
// Fix: Added .ts extension to the import path.
import { LANGUAGES } from '../constants.ts';
// Fix: Added .ts extension to the import path.
import type { Language } from '../types.ts';

export const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useAppContext();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = LANGUAGES.find(lang => lang.code === e.target.value);
        if (selectedLanguage) {
            setLanguage(selectedLanguage);
        }
    };

    return (
        <div className="relative">
            <select
                value={language.code}
                onChange={handleLanguageChange}
                className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Select language"
            >
                {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.emoji} {lang.name}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
            </div>
        </div>
    );
};