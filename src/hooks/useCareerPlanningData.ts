
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserSkill {
  name: string;
  currentLevel: number;
  targetLevel: number;
  category: string;
}

export interface UserProfile {
  skills: UserSkill[];
  experience: string;
  currentRole: string;
  targetRole: string;
  experienceYears: number;
  preferences: {
    learningStyle?: string;
    timeCommitment?: string;
    budget?: string;
  };
}

export interface SkillProgress {
  skill: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progressPercentage: number;
  coursesCompleted: string[];
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  skills: string[];
  learningPath: any;
  status: string;
}

export function useCareerPlanningData() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [skillProgress, setSkillProgress] = useState<SkillProgress[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load user profile
  const loadUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading user profile:', error);
        return;
      }

      if (data) {
        setUserProfile({
          skills: data.skills || [],
          experience: data.experience || '',
          currentRole: data.current_role || '',
          targetRole: data.target_role || '',
          experienceYears: data.experience_years || 0,
          preferences: data.preferences || {},
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  // Load skill progress
  const loadSkillProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('skill_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading skill progress:', error);
        return;
      }

      setSkillProgress(data.map(item => ({
        skill: item.skill,
        status: item.status as any,
        progressPercentage: item.progress_percentage,
        coursesCompleted: item.courses_completed || [],
      })));
    } catch (error) {
      console.error('Error loading skill progress:', error);
    }
  };

  // Load learning paths
  const loadLearningPaths = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('learning_paths')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading learning paths:', error);
        return;
      }

      setLearningPaths(data || []);
    } catch (error) {
      console.error('Error loading learning paths:', error);
    }
  };

  // Save user profile
  const saveUserProfile = async (profile: UserProfile) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          skills: profile.skills,
          experience: profile.experience,
          current_role: profile.currentRole,
          target_role: profile.targetRole,
          experience_years: profile.experienceYears,
          preferences: profile.preferences,
        });

      if (error) throw error;

      setUserProfile(profile);
      toast({
        title: 'Profile Saved',
        description: 'Your career profile has been saved successfully',
      });
    } catch (error) {
      console.error('Error saving user profile:', error);
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: 'Failed to save your profile',
      });
    }
  };

  // Update skill progress
  const updateSkillProgress = async (skill: string, progressPercentage: number, status?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('skill_progress')
        .upsert({
          user_id: user.id,
          skill,
          progress_percentage: progressPercentage,
          status: status || (progressPercentage === 100 ? 'completed' : progressPercentage > 0 ? 'in_progress' : 'not_started'),
        });

      if (error) throw error;

      await loadSkillProgress();
      toast({
        title: 'Progress Updated',
        description: `Progress for ${skill} has been updated`,
      });
    } catch (error) {
      console.error('Error updating skill progress:', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Failed to update skill progress',
      });
    }
  };

  // Save learning path
  const saveLearningPath = async (path: Omit<LearningPath, 'id'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('learning_paths')
        .insert({
          user_id: user.id,
          name: path.name,
          description: path.description,
          skills: path.skills,
          learning_path: path.learningPath,
          status: path.status,
        });

      if (error) throw error;

      await loadLearningPaths();
      toast({
        title: 'Learning Path Saved',
        description: 'Your learning path has been saved successfully',
      });
    } catch (error) {
      console.error('Error saving learning path:', error);
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: 'Failed to save learning path',
      });
    }
  };

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      await Promise.all([
        loadUserProfile(),
        loadSkillProgress(),
        loadLearningPaths(),
      ]);
      setIsLoading(false);
    };

    initializeData();
  }, []);

  return {
    userProfile,
    skillProgress,
    learningPaths,
    isLoading,
    saveUserProfile,
    updateSkillProgress,
    saveLearningPath,
    refreshData: async () => {
      await Promise.all([
        loadUserProfile(),
        loadSkillProgress(),
        loadLearningPaths(),
      ]);
    },
  };
}
