
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  TrendingUp, 
  BookOpen, 
  Award, 
  Clock,
  Users,
  Star,
  ArrowRight,
  Plus,
  ChevronRight
} from 'lucide-react';
import { useCareerPlanningStorage } from '@/hooks/useCareerPlanningStorage';
import { SkillsManagementPanel } from './SkillsManagementPanel';
import { SkillGapAnalysisPanel } from './SkillGapAnalysisPanel';
import { CourseRecommendationsPanel } from './CourseRecommendationsPanel';
import { LearningPathPanel } from './LearningPathPanel';
import { ProgressTrackingPanel } from './ProgressTrackingPanel';
import { UserProfilePanel } from './UserProfilePanel';
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
    userSkills,
    skillGaps,
    progressTracking,
    learningPaths,
    userProfile,
    isLoading
  } = useCareerPlanningStorage();

  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalSkills = userSkills.length;
  const skillsWithGaps = skillGaps.length;
  const averageProgress = progressTracking.length > 0
    ? Math.round(progressTracking.reduce((sum, p) => sum + p.progressPercentage, 0) / progressTracking.length)
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
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border">
            <Target className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Career Planning Dashboard
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Plan your career growth with AI-powered skill analysis and personalized learning paths
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Skills"
              value={totalSkills}
              description="Skills in your profile"
              icon={Award}
              color="from-blue-500 to-blue-600"
              trend="+3 this month"
            />
            <StatsCard
              title="Skill Gaps"
              value={skillsWithGaps}
              description="Areas for improvement"
              icon={TrendingUp}
              color="from-orange-500 to-red-500"
            />
            <StatsCard
              title="Progress"
              value={`${averageProgress}%`}
              description="Average skill progress"
              icon={Target}
              color="from-green-500 to-emerald-600"
              trend="+12% this week"
            />
            <StatsCard
              title="Learning Paths"
              value={totalLearningPaths}
              description="Active learning tracks"
              icon={BookOpen}
              color="from-purple-500 to-indigo-600"
            />
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto p-2 bg-transparent">
                    <TabsTrigger 
                      value="overview" 
                      className="flex-col gap-2 py-4 px-3 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
                    >
                      <Target className="w-5 h-5" />
                      <span className="text-xs font-medium">Overview</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="skills" 
                      className="flex-col gap-2 py-4 px-3 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
                    >
                      <Award className="w-5 h-5" />
                      <span className="text-xs font-medium">Skills</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="gaps" 
                      className="flex-col gap-2 py-4 px-3 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
                    >
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-xs font-medium">Gaps</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="courses" 
                      className="flex-col gap-2 py-4 px-3 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
                    >
                      <BookOpen className="w-5 h-5" />
                      <span className="text-xs font-medium">Courses</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="paths" 
                      className="flex-col gap-2 py-4 px-3 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
                    >
                      <Users className="w-5 h-5" />
                      <span className="text-xs font-medium">Paths</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="progress" 
                      className="flex-col gap-2 py-4 px-3 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
                    >
                      <Clock className="w-5 h-5" />
                      <span className="text-xs font-medium">Progress</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 md:p-8">
                  <TabsContent value="overview" className="mt-0 space-y-8">
                    {!userProfile ? (
                      <motion.div 
                        className="text-center py-12 space-y-6"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                          <Users className="w-10 h-10 text-white" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-2xl font-bold text-gray-900">Welcome to Career Planning</h3>
                          <p className="text-gray-600 max-w-md mx-auto">
                            Get started by setting up your profile and defining your career goals
                          </p>
                        </div>
                        <Button 
                          onClick={() => setActiveTab('skills')}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <Plus className="w-5 h-5 mr-2" />
                          Get Started
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </motion.div>
                    ) : (
                      <div className="space-y-8">
                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => setActiveTab('skills')}>
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                  <h3 className="font-semibold text-gray-900">Manage Skills</h3>
                                  <p className="text-sm text-gray-600">Add and update your skills</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => setActiveTab('gaps')}>
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                  <h3 className="font-semibold text-gray-900">Analyze Gaps</h3>
                                  <p className="text-sm text-gray-600">Identify skill improvements</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => setActiveTab('courses')}>
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                  <h3 className="font-semibold text-gray-900">Find Courses</h3>
                                  <p className="text-sm text-gray-600">Discover learning resources</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Recent Progress */}
                        {progressTracking.length > 0 && (
                          <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900">Recent Progress</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {progressTracking.slice(0, 4).map((progress) => (
                                <Card key={progress.skillId} className="hover:shadow-md transition-shadow">
                                  <CardContent className="p-4">
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <h4 className="font-medium text-gray-900">{progress.skillName}</h4>
                                        <Badge variant="secondary">{Math.round(progress.progressPercentage)}%</Badge>
                                      </div>
                                      <Progress value={progress.progressPercentage} className="h-2" />
                                      <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span>Level {progress.currentLevel} of {progress.targetLevel}</span>
                                        <span>{progress.timeSpent}h spent</span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="skills" className="mt-0">
                    <SkillsManagementPanel />
                  </TabsContent>

                  <TabsContent value="gaps" className="mt-0">
                    <SkillGapAnalysisPanel />
                  </TabsContent>

                  <TabsContent value="courses" className="mt-0">
                    <CourseRecommendationsPanel />
                  </TabsContent>

                  <TabsContent value="paths" className="mt-0">
                    <LearningPathPanel />
                  </TabsContent>

                  <TabsContent value="progress" className="mt-0">
                    <ProgressTrackingPanel />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
