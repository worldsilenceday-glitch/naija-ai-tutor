import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../components/BottomNav.tsx';

const MainLayout: React.FC = () => {
  const location = useLocation();
  // Hide bottom nav on chat and quiz pages for better UX
  const showBottomNav = !location.pathname.startsWith('/chat/') && !location.pathname.startsWith('/quiz/');

  return (
    <div className="relative min-h-screen bg-gray-50">
      <main className="pb-20 md:pb-0">
          <Outlet />
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default MainLayout;
