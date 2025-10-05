import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner.tsx';
import { processPayment, PREMIUM_PLAN } from '../services/paymentService.ts';
import { ArrowLeftIcon } from '../components/icons.tsx';
import { useUser } from '../contexts/UserContext.tsx';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { upgradeToPremium } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, you'd collect card details here via a secure form
      const success = await processPayment({ plan: PREMIUM_PLAN.id });
      if (success) {
        upgradeToPremium();
        navigate('/profile');
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-10 flex items-center p-4">
        <button onClick={() => navigate(-1)} className="p-2 mr-2 rounded-full hover:bg-gray-200">
          <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Upgrade to Premium</h1>
      </header>

      <main className="container mx-auto p-4 md:p-8 flex items-center justify-center" style={{minHeight: 'calc(100vh - 72px)'}}>
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{PREMIUM_PLAN.name}</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">{PREMIUM_PLAN.price}</p>
          </div>

          <form onSubmit={handlePayment}>
            <p className="text-center text-gray-500 text-sm mb-4">
              This is a simulated payment page. No credit card is required.
            </p>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center"
            >
              {isLoading ? <Spinner className="w-6 h-6" /> : `Confirm Payment`}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
