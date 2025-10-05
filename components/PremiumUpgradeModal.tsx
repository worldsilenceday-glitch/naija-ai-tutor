import React from 'react';
import { PREMIUM_PLAN } from '../services/paymentService.ts';

interface PremiumUpgradeModalProps {
  onClose: () => void;
  onUpgrade: () => void;
}

const PremiumUpgradeModal: React.FC<PremiumUpgradeModalProps> = ({ onClose, onUpgrade }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full m-4 transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center">
            <span className="text-5xl">🚀</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Upgrade to Premium!</h2>
            <p className="text-gray-600 mt-2">Unlock all features and supercharge your learning.</p>
        </div>

        <div className="mt-6 text-left">
            <h3 className="text-lg font-semibold text-gray-700">{PREMIUM_PLAN.name} - {PREMIUM_PLAN.price}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
                {PREMIUM_PLAN.features.map(feature => <li key={feature}>{feature}</li>)}
            </ul>
        </div>
        
        <div className="mt-8 flex flex-col space-y-3">
          <button
            onClick={onUpgrade}
            className="w-full px-4 py-3 text-base font-bold text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Go Premium
          </button>
          <button
            onClick={onClose}
            className="w-full mt-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumUpgradeModal;
