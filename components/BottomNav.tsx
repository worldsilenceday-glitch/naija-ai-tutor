import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, ChartBarIcon, UserCircleIcon, BrainIcon } from './icons.tsx';

const navItems = [
  { path: '/dashboard', label: 'Home', icon: HomeIcon },
  { path: '/games', label: 'Games', icon: BrainIcon },
  { path: '/progress', label: 'Progress', icon: ChartBarIcon },
  { path: '/profile', label: 'Profile', icon: UserCircleIcon },
];

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-t-md md:hidden z-20">
      <div className="flex justify-around max-w-screen-sm mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full pt-2 pb-1 text-sm transition-colors ${
                isActive ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
              }`
            }
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;