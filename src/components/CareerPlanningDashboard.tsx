
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  TrendingUp, 
  BookOpen, 
  Award, 
  User,
  AlertTriangle,
  BookOpen as BookOpenIcon,
  BarChart3,
  Loader2,
  Brain
} from 'lucide-react';
import { useCareerPlanningData } from '@/hooks/useCareerPlanningData';
import { SkillsManagementPanel } from './SkillsManagementPanel';
import { SkillGapAnalysisPanel } from './SkillGapAnalysisPanel';
import { CourseRecommendationsPanel } from './CourseRecommendationsPanel';
import { LearningPathPanel } from './LearningPathPanel';
import { ProgressTrackingPanel } from './ProgressTrackingPanel';
import { UserProfilePanel } from './UserProfilePanel';
import { EnhancedSkillAnalysisPanel } from './enhanced-skill-analysis/EnhancedSkillAnalysisPanel';
import { MarketInsightsPanel } from './market-insights/MarketInsightsPanel';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: string;
}

function StatsCard({ title, value, description, icon: Icon, color, trend }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`} />
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                {trend && (
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    {trend}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
            <div className={`p-3 rounded-full bg-gradient-to-br ${color} shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function CareerPlanningDashboard() {
  const {
    userProfile,
    skillProgress,
    learningPaths,
    isLoading
  } = useCareerPlanningData();

  const [activeTab, setActiveTab] = useState('profile');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalSkills = userProfile?.skills?.length || 0;
  const skillsWithGaps = userProfile?.skills?.filter(skill => skill.currentLevel < skill.targetLevel).length || 0;
  const averageProgress = skillProgress.length > 0
    ? Math.round(skillProgress.reduce((sum, p) => sum + p.progressPercentage, 0) / skillProgress.length)
    : 0;
  const totalLearningPaths = learningPaths.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6 lg:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Career Planning Hub
              </h1>
              <p className="text-sm text-gray-600">AI-powered career development and skill planning</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Skills"
            value={totalSkills}
            description="Skills in your profile"
            icon={Award}
            color="from-blue-600 to-blue-700"
          />
          <StatsCard
            title="Skill Gaps"
            value={skillsWithGaps}
            description="Skills to improve"
            icon={AlertTriangle}
            color="from-orange-600 to-orange-700"
          />
          <StatsCard
            title="Avg Progress"
            value={`${averageProgress}%`}
            description="Overall learning progress"
            icon={TrendingUp}
            color="from-green-600 to-green-700"
          />
          <StatsCard
            title="Learning Paths"
            value={totalLearningPaths}
            description="Active learning paths"
            icon={Target}
            color="from-purple-600 to-purple-700"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
            <div className="flex flex-wrap justify-center gap-1">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 text-sm
                    ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                    }
                  `}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-8"
        >
          {activeTab === 'profile' && <UserProfilePanel />}
          {activeTab === 'skills' && <SkillsManagementPanel />}
          {activeTab === 'gaps' && <SkillGapAnalysisPanel />}
          {activeTab === 'courses' && <CourseRecommendationsPanel />}
          {activeTab === 'paths' && <LearningPathPanel />}
          {activeTab === 'progress' && <ProgressTrackingPanel />}
          {activeTab === 'analysis' && (
            <EnhancedSkillAnalysisPanel 
              occupationTitle={userProfile?.targetRole}
              userSkills={userProfile?.skills?.map(skill => ({
                name: skill.name,
                level: skill.currentLevel,
                category: skill.category
              }))}
            />
          )}
          {activeTab === 'market' && (
            <MarketInsightsPanel 
              occupationTitle={userProfile?.targetRole}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

// Updated tabs array to include new enhanced features
const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'skills', label: 'Skills', icon: Award },
  { id: 'gaps', label: 'Skill Gaps', icon: AlertTriangle },
  { id: 'courses', label: 'Courses', icon: BookOpenIcon },
  { id: 'paths', label: 'Learning Paths', icon: Target },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
  { id: 'analysis', label: 'AI Analysis', icon: Brain },
  { id: 'market', label: 'Market Insights', icon: BarChart3 },
];
