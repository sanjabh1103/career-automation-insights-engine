
import React, { useEffect, useState } from 'react';
import { APODashboard } from '@/components/APODashboard';
import { EnhancedAPODashboardHeader } from '@/components/EnhancedAPODashboardHeader';
import { useSession } from '@/hooks/useSession';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const Index = () => {
  const { user, loading } = useSession();
  const navigate = useNavigate();
  const [showCreditsModal, setShowCreditsModal] = useState(false);

  // Don't redirect to auth page automatically, let users browse the dashboard
  // They'll be prompted to sign in when they try to use features that require auth

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading application..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <EnhancedAPODashboardHeader 
        userEmail={user?.email}
        onCreditsClick={() => setShowCreditsModal(true)}
      />
      <APODashboard />
    </div>
  );
};

export default Index;
