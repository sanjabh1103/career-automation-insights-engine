
import React, { useEffect, useState } from 'react';
import { APODashboard } from '@/components/APODashboard';
import { EnhancedAPODashboardHeader } from '@/components/EnhancedAPODashboardHeader';
import { useSession } from '@/hooks/useSession';

const Index = () => {
  const { user } = useSession();
  const [showCreditsModal, setShowCreditsModal] = useState(false);

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
