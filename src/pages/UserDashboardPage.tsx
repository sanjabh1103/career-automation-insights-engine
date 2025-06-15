
import React from "react";
import { useNavigate } from "react-router-dom";
import { EnhancedUserDashboard } from "@/components/EnhancedUserDashboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function UserDashboardPage() {
  const navigate = useNavigate();

  const handleLoadAnalysis = (analysis: any) => {
    localStorage.setItem('loadedAnalysis', JSON.stringify(analysis));
    navigate('/');
  };

  const handleSearchSelect = (searchTerm: string) => {
    localStorage.setItem('selectedSearch', searchTerm);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to APO Dashboard
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-blue-600 hover:bg-blue-50"
            >
              <Home className="w-4 h-4 mr-2" />
              Main Dashboard
            </Button>
          </div>
        </div>
      </div>
      
      <EnhancedUserDashboard 
        onLoadAnalysis={handleLoadAnalysis}
        onSearchSelect={handleSearchSelect}
      />
    </div>
  );
}
