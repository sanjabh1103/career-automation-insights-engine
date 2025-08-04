
import React, { useEffect, useState } from 'react';
import { APODashboard } from '@/components/APODashboard';
import { EnhancedAPODashboardHeader } from '@/components/EnhancedAPODashboardHeader';
import { useSession } from '@/hooks/useSession';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { LogoutButton } from '@/components/LogoutButton';
import { motion } from 'framer-motion';

const Index = () => {
  const { user, loading } = useSession();
  const navigate = useNavigate();
  const [showCreditsModal, setShowCreditsModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingSpinner size="lg" text="Loading application..." />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between p-4">
        <EnhancedAPODashboardHeader 
          userEmail={user?.email}
          onCreditsClick={() => setShowCreditsModal(true)}
        />
        <LogoutButton />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <APODashboard />
      </motion.div>
    </motion.div>
  );
};

export default Index;
