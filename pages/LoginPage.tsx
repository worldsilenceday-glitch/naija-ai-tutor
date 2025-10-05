import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.tsx';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, loginAsGuest } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      // Simple login: extract name from email
      const name = email.split('@')[0];
      login(name, email);
      navigate('/dashboard');
    }
  };
  
  const handleGuestLogin = () => {
      loginAsGuest();
      navigate('/dashboard');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Naija AI Tutor</h1>
            <p className="mt-2 text-gray-600">Learn. Ask. Understand. The Naija Way.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-gray-200 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Email Address"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-gray-200 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
          >
            Log In
          </button>
        </form>
        <button
            onClick={handleGuestLogin}
            className="w-full px-4 py-3 text-lg font-semibold text-green-700 bg-green-100 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
        >
            Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
