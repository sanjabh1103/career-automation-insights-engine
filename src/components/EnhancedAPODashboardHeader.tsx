
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  User, 
  Settings, 
  HelpCircle, 
  Zap, 
  Star, 
  Shield,
  BarChart3,
  Users,
  Award,
  Menu,
  X
} from 'lucide-react';
import { LogoutButton } from './LogoutButton';
import { RateLimitDisplay } from './RateLimitDisplay';
import { APICreditsDisplay } from './APICreditsDisplay';
import { CareerPlanningButton } from './CareerPlanningButton';
import { AIImpactPlannerButton } from './AIImpactPlannerButton';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSession } from '@/hooks/useSession';
import { searchRateLimiter, apoRateLimiter, exportRateLimiter, checkRateLimit } from '@/utils/rateLimiting';

interface EnhancedAPODashboardHeaderProps {
  userEmail?: string | null;
  onCreditsClick?: () => void;
}

export function EnhancedAPODashboardHeader({ userEmail, onCreditsClick }: EnhancedAPODashboardHeaderProps) {
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useSession();

  // Get rate limiting status for the current user
  const searchStatus = user ? checkRateLimit(searchRateLimiter, user.id) : { remaining: 0, resetTime: Date.now(), timeUntilReset: 0 };
  const apoStatus = user ? checkRateLimit(apoRateLimiter, user.id) : { remaining: 0, resetTime: Date.now(), timeUntilReset: 0 };
  const exportStatus = user ? checkRateLimit(exportRateLimiter, user.id) : { remaining: 0, resetTime: Date.now(), timeUntilReset: 0 };

  const navigationItems = [
    {
      label: 'User Dashboard',
      icon: User,
      onClick: () => navigate('/dashboard'),
      description: 'Manage your profile and data'
    },
    {
      label: 'AI Impact Planner',
      icon: Brain,
      onClick: () => navigate('/ai-impact'),
      description: 'Explore AI career impact'
    }
  ];

  const handleCreditsClick = () => {
    setShowCreditsModal(true);
    onCreditsClick?.();
  };

  const MobileMenu = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <CareerPlanningButton />
                
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.label}
                      variant="ghost"
                      onClick={() => {
                        item.onClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full justify-start text-left p-4 h-auto"
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <APICreditsDisplay />
                  <RateLimitDisplay
                    remaining={searchStatus.remaining}
                    total={20}
                    resetTime={searchStatus.resetTime}
                    timeUntilReset={searchStatus.timeUntilReset}
                    label="Search Requests"
                    variant="search"
                  />
                </div>
                
                <Separator />
                
                {userEmail && <LogoutButton />}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.header 
        className="sticky top-0 z-40 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-sm"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Brand */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  APO Dashboard
                </h1>
                <p className="text-xs text-gray-500">Automation Potential Oracle</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <CareerPlanningButton />
              </motion.div>
              
              <AIImpactPlannerButton />
              
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              >
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              
              <div className="flex items-center gap-3">
                <APICreditsDisplay />
                <RateLimitDisplay
                  remaining={searchStatus.remaining}
                  total={20}
                  resetTime={searchStatus.resetTime}
                  timeUntilReset={searchStatus.timeUntilReset}
                  label="Search Requests"
                  variant="search"
                />
              </div>
              
              {userEmail && <LogoutButton />}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
                className="h-10 w-10 p-0"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu />

      {/* Credits Modal */}
      <Dialog open={showCreditsModal} onOpenChange={setShowCreditsModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              API Credits & Usage
            </DialogTitle>
            <DialogDescription>
              View your current API credits and usage limits for occupation analyses.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                <Star className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Current Plan: Free Tier</span>
              </div>
              <p className="text-gray-600 text-sm">
                You're using the free tier with limited API calls per day
              </p>
            </div>
            
            <div className="space-y-4">
              <APICreditsDisplay />
              <RateLimitDisplay
                remaining={apoStatus.remaining}
                total={5}
                resetTime={apoStatus.resetTime}
                timeUntilReset={apoStatus.timeUntilReset}
                label="APO Analyses"
                variant="analysis"
              />
            </div>
            
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-blue-900">Usage Tips</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Credits reset daily at midnight UTC</li>
                      <li>• Each occupation analysis uses 1 credit</li>
                      <li>• Save your analyses to avoid re-processing</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
