
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogoutButton } from './LogoutButton';
import { NotificationSystem } from './NotificationSystem';
import { APICreditsDisplay } from './APICreditsDisplay';
import { RateLimitDisplay } from './RateLimitDisplay';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Zap, 
  TrendingUp, 
  Shield,
  Brain,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EnhancedAPODashboardHeaderProps {
  userEmail?: string;
  onCreditsClick?: () => void;
}

export function EnhancedAPODashboardHeader({ userEmail }: EnhancedAPODashboardHeaderProps) {
  const navigate = useNavigate();

  // Placeholder values for rate limiting
  const rateLimitDemoProps = {
    remaining: 20,
    total: 20,
    resetTime: Date.now() + 60000,
    timeUntilReset: 60000,
    label: "API Usage"
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="border-0 rounded-none bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white shadow-2xl">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
            {/* Logo and Title Section */}
            <motion.div 
              className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Brain className="w-7 h-7 text-white" />
                </motion.div>
                <div className="min-w-0">
                  <motion.h1 
                    className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    Automation Potential Opportunity (APO)
                  </motion.h1>
                  <motion.h2 
                    className="text-lg sm:text-xl font-semibold text-blue-200 leading-tight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    Dashboard For Professionals
                  </motion.h2>
                  <motion.p 
                    className="text-xs sm:text-sm text-blue-300 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    AI-Powered Career Automation Analysis
                  </motion.p>
                </div>
              </div>
              
              {/* Status Badges */}
              <motion.div 
                className="flex items-center space-x-2 flex-wrap"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Secure
                  </Badge>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI-Powered
                  </Badge>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* User Controls Section */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3"
              variants={itemVariants}
            >
              {/* API Credits and Rate Limits */}
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex-1 sm:flex-none"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  transition={{ duration: 0.2 }}
                >
                  <APICreditsDisplay />
                </motion.div>
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex-1 sm:flex-none"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  transition={{ duration: 0.2 }}
                >
                  <RateLimitDisplay {...rateLimitDemoProps} />
                </motion.div>
              </div>

              {/* User Actions */}
              <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
                {/* Notifications */}
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-1"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <NotificationSystem />
                </motion.div>

                {/* User Menu */}
                {userEmail && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/dashboard')}
                      className="text-white hover:bg-white/20 border border-white/20 text-xs sm:text-sm px-2 sm:px-3"
                    >
                      <User className="w-4 h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">{userEmail.split('@')[0]}</span>
                      <span className="sm:hidden">Profile</span>
                    </Button>
                  </motion.div>
                )}

                {/* Settings Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/dashboard')}
                    className="text-white hover:bg-white/20 border border-white/20 p-2"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </motion.div>

                {/* Logout */}
                <LogoutButton />
              </div>
            </motion.div>
          </div>

          {/* Quick Stats Bar */}
          <motion.div 
            className="mt-6 pt-4 border-t border-white/20"
            variants={itemVariants}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { value: "1000+", label: "Occupations", color: "blue" },
                { value: "AI-Powered", label: "Analysis", color: "green" },
                { value: "Real-time", label: "Data", color: "purple" },
                { value: "Export", label: "Ready", color: "yellow" }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`text-lg sm:text-2xl font-bold text-${stat.color}-200`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs text-${stat.color}-300`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
