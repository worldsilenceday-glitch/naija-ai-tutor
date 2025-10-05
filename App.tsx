import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext.tsx';
import { AppProvider } from './contexts/AppContext.tsx';

import MainLayout from './layouts/MainLayout.tsx';
import LoginPage from './pages/LoginPage.tsx';
import ProgressPage from './pages/ProgressPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import PaymentPage from './pages/PaymentPage.tsx';

import { Suspense } from 'react';
import { Spinner } from './components/Spinner.tsx';

// Lazy-loaded route components to improve initial bundle size
const DashboardPage = React.lazy(() => import('./pages/DashboardPage.tsx'));
const ChatPage = React.lazy(() => import('./pages/ChatPage.tsx'));
const QuizPage = React.lazy(() => import('./pages/QuizPage.tsx'));
const GamesPage = React.lazy(() => import('./pages/GamesPage.tsx'));
const GamePage = React.lazy(() => import('./pages/GamePage.tsx'));

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppContent: React.FC = () => {
  const { user } = useUser();
  return (
    <Routes>
  <Route path="/login" element={<LoginPage />} />
      {/* Protected layout - all child routes require auth */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* index route: redirect to dashboard when authenticated */}
        <Route
          index
          element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
        <Route path="dashboard" element={
          <Suspense fallback={<Spinner className="w-10 h-10" />}>
            <DashboardPage />
          </Suspense>
        } />
        <Route path="games" element={
          <Suspense fallback={<Spinner className="w-10 h-10" />}>
            <GamesPage />
          </Suspense>
        } />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="upgrade" element={<PaymentPage />} />
      </Route>
      <Route
        path="/chat/:subject"
        element={
          <ProtectedRoute>
            <Suspense fallback={<Spinner className="w-10 h-10" />}>
              <ChatPage />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/quiz/:subject"
        element={
          <ProtectedRoute>
            <Suspense fallback={<Spinner className="w-10 h-10" />}>
              <QuizPage />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/game/:gameType"
        element={
          <ProtectedRoute>
            <Suspense fallback={<Spinner className="w-10 h-10" />}>
              <GamePage />
            </Suspense>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </AppProvider>
    </Router>
  );
};

export default App;