
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogoutButton } from './LogoutButton';
import { NotificationSystem } from './NotificationSystem';
import { APICreditsDisplay } from './APICreditsDisplay';
import { RateLimitDisplay } from './RateLimitDisplay';
import { 
  User, 
  Settings, 
  Zap, 
  TrendingUp, 
  Shield,
  Brain
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EnhancedAPODashboardHeaderProps {
  userEmail?: string;
  onCreditsClick?: () => void;
}

export function EnhancedAPODashboardHeader({ userEmail }: EnhancedAPODashboardHeaderProps) {
  const navigate = useNavigate();

  // Placeholder values for rate limiting
  // In real code, you would fetch these from state or context.
  const rateLimitDemoProps = {
    remaining: 20,
    total: 20,
    resetTime: Date.now() + 60000,
    timeUntilReset: 60000,
    label: "API Usage"
  };

  return (
    <Card className="border-0 rounded-none bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white shadow-xl">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Logo and Title Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  APO Dashboard
                </h1>
                <p className="text-sm text-blue-200">
                  AI-Powered Career Automation Analysis
                </p>
              </div>
            </div>
            
            {/* Status Badges */}
            <div className="hidden lg:flex items-center space-x-2">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Zap className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
          </div>

          {/* User Controls Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* API Credits and Rate Limits */}
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <APICreditsDisplay />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <RateLimitDisplay {...rateLimitDemoProps} />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1">
                <NotificationSystem />
              </div>

              {/* User Menu */}
              {userEmail && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className="text-white hover:bg-white/20 border border-white/20"
                >
                  <User className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{userEmail.split('@')[0]}</span>
                  <span className="sm:hidden">Profile</span>
                </Button>
              )}

              {/* Settings Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="text-white hover:bg-white/20 border border-white/20"
              >
                <Settings className="w-4 h-4" />
              </Button>

              {/* Logout */}
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-200">1000+</div>
              <div className="text-xs text-blue-300">Occupations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-200">AI-Powered</div>
              <div className="text-xs text-green-300">Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-200">Real-time</div>
              <div className="text-xs text-purple-300">Data</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-200">Export</div>
              <div className="text-xs text-yellow-300">Ready</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
