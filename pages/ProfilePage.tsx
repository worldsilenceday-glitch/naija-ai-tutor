import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.tsx';
import PremiumUpgradeModal from '../components/PremiumUpgradeModal.tsx';

const ProfilePage: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }
  
  const handleUpgradeClick = () => {
      setIsUpgradeModalOpen(false);
      navigate('/upgrade');
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col items-center pt-8 pb-12">
            <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-green-500 object-cover mb-4" />
            <h1 className="text-2xl font-bold capitalize">{user.name}</h1>
            <p className="text-green-400">{user.email || 'Guest User'}</p>
            <p className="text-yellow-400 font-bold mt-2">{user.xp || 0} XP</p>
        </div>

        <div className="space-y-6">
          {/* Subscription Management */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Subscription Management</h2>
            {user.isPremium ? (
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Plan</span>
                        <span className="font-medium text-green-400">Premium Plan</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Next Billing Date</span>
                        <span className="font-medium">{user.subscriptionEndDate}</span>
                    </div>
                </div>
            ) : (
                <div className="text-center p-4 bg-gray-700 rounded-md">
                    <p className="mb-3">Unlock all features and supercharge your learning.</p>
                    <button onClick={() => setIsUpgradeModalOpen(true)} className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700">
                        Upgrade to Premium
                    </button>
                </div>
            )}
          </div>
          
          {/* Settings */}
          <div className="bg-gray-800 rounded-lg p-4">
             <h2 className="text-lg font-semibold mb-2">Settings</h2>
             <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-2 text-red-500 hover:bg-gray-700 rounded-md"
              >
                Log Out
            </button>
          </div>
        </div>
      </div>
      
      {isUpgradeModalOpen && (
          <PremiumUpgradeModal 
            onClose={() => setIsUpgradeModalOpen(false)}
            onUpgrade={handleUpgradeClick}
          />
      )}
    </div>
  );
};

export default ProfilePage;