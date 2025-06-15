
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserDashboard } from "@/components/UserDashboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function UserDashboardPage() {
  const navigate = useNavigate();

  const handleLoadAnalysis = (analysis: any) => {
    // Store the analysis in localStorage for the main dashboard to pick up
    localStorage.setItem('loadedAnalysis', JSON.stringify(analysis));
    navigate('/');
  };

  const handleSearchSelect = (searchTerm: string) => {
    // Store the search term in localStorage for the main dashboard to pick up
    localStorage.setItem('selectedSearch', searchTerm);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to APO Dashboard
          </Button>
        </div>
      </div>
      
      <UserDashboard 
        onLoadAnalysis={handleLoadAnalysis}
        onSearchSelect={handleSearchSelect}
      />
    </div>
  );
}
