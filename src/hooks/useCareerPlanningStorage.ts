
import { useState, useEffect } from 'react';

export interface UserSkill {
  id: string;
  name: string;
  currentLevel: number; // 1-5
  targetLevel: number; // 1-5
  category: string;
}

export interface SkillGap {
  skillId: string;
  skillName: string;
  currentLevel: number;
  targetLevel: number;
  gapSize: number;
  priority: 'high' | 'medium' | 'low';
  recommendations: string[];
}

export interface CourseRecommendation {
  id: string;
  title: string;
  provider: string;
  url: string;
  duration: string;
  level: string;
  rating: number;
  price: string;
  skills: string[];
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  skills: string[];
  estimatedDuration: string;
  courses: CourseRecommendation[];
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  skills: string[];
}

export interface ProgressTracking {
  skillId: string;
  skillName: string;
  initialLevel: number;
  currentLevel: number;
  targetLevel: number;
  progressPercentage: number;
  lastUpdated: string;
  coursesCompleted: string[];
  timeSpent: number; // hours
}

const STORAGE_KEYS = {
  USER_SKILLS: 'career_planning_user_skills',
  SKILL_GAPS: 'career_planning_skill_gaps',
  COURSE_RECOMMENDATIONS: 'career_planning_course_recommendations',
  LEARNING_PATHS: 'career_planning_learning_paths',
  PROGRESS_TRACKING: 'career_planning_progress_tracking',
  USER_PROFILE: 'career_planning_user_profile'
};

export interface UserProfile {
  currentRole: string;
  targetRole: string;
  experience: string;
  industry: string;
  goals: string[];
  preferences: {
    learningStyle: string;
    timeCommitment: string;
    budget: string;
  };
}

export function useCareerPlanningStorage() {
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [courseRecommendations, setCourseRecommendations] = useState<CourseRecommendation[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [progressTracking, setProgressTracking] = useState<ProgressTracking[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    setIsLoading(true);
    try {
      const skills = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_SKILLS) || '[]');
      const gaps = JSON.parse(localStorage.getItem(STORAGE_KEYS.SKILL_GAPS) || '[]');
      const courses = JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSE_RECOMMENDATIONS) || '[]');
      const paths = JSON.parse(localStorage.getItem(STORAGE_KEYS.LEARNING_PATHS) || '[]');
      const progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS_TRACKING) || '[]');
      const profile = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_PROFILE) || 'null');

      setUserSkills(skills);
      setSkillGaps(gaps);
      setCourseRecommendations(courses);
      setLearningPaths(paths);
      setProgressTracking(progress);
      setUserProfile(profile);
    } catch (error) {
      console.error('Error loading career planning data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save functions
  const saveUserSkills = (skills: UserSkill[]) => {
    setUserSkills(skills);
    localStorage.setItem(STORAGE_KEYS.USER_SKILLS, JSON.stringify(skills));
  };

  const saveSkillGaps = (gaps: SkillGap[]) => {
    setSkillGaps(gaps);
    localStorage.setItem(STORAGE_KEYS.SKILL_GAPS, JSON.stringify(gaps));
  };

  const saveCourseRecommendations = (courses: CourseRecommendation[]) => {
    setCourseRecommendations(courses);
    localStorage.setItem(STORAGE_KEYS.COURSE_RECOMMENDATIONS, JSON.stringify(courses));
  };

  const saveLearningPaths = (paths: LearningPath[]) => {
    setLearningPaths(paths);
    localStorage.setItem(STORAGE_KEYS.LEARNING_PATHS, JSON.stringify(paths));
  };

  const saveProgressTracking = (progress: ProgressTracking[]) => {
    setProgressTracking(progress);
    localStorage.setItem(STORAGE_KEYS.PROGRESS_TRACKING, JSON.stringify(progress));
  };

  const saveUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  };

  // Utility functions
  const analyzeSkillGaps = (skills: UserSkill[]): SkillGap[] => {
    return skills
      .filter(skill => skill.targetLevel > skill.currentLevel)
      .map(skill => {
        const gapSize = skill.targetLevel - skill.currentLevel;
        const priority = gapSize >= 3 ? 'high' : gapSize >= 2 ? 'medium' : 'low';
        
        return {
          skillId: skill.id,
          skillName: skill.name,
          currentLevel: skill.currentLevel,
          targetLevel: skill.targetLevel,
          gapSize,
          priority,
          recommendations: generateRecommendations(skill.name, gapSize)
        };
      });
  };

  const generateRecommendations = (skillName: string, gapSize: number): string[] => {
    const baseRecommendations = [
      `Take an online course in ${skillName}`,
      `Practice ${skillName} through hands-on projects`,
      `Find a mentor who excels in ${skillName}`,
      `Join communities focused on ${skillName}`
    ];

    if (gapSize >= 3) {
      baseRecommendations.push(
        `Consider formal certification in ${skillName}`,
        `Attend workshops or bootcamps for ${skillName}`
      );
    }

    return baseRecommendations;
  };

  const updateSkillProgress = (skillId: string, newLevel: number, hoursSpent: number = 0) => {
    const updatedProgress = progressTracking.map(progress => {
      if (progress.skillId === skillId) {
        const newProgressPercentage = Math.min(
          100,
          ((newLevel - progress.initialLevel) / (progress.targetLevel - progress.initialLevel)) * 100
        );
        
        return {
          ...progress,
          currentLevel: newLevel,
          progressPercentage: newProgressPercentage,
          lastUpdated: new Date().toISOString(),
          timeSpent: progress.timeSpent + hoursSpent
        };
      }
      return progress;
    });

    saveProgressTracking(updatedProgress);
  };

  return {
    // Data
    userSkills,
    skillGaps,
    courseRecommendations,
    learningPaths,
    progressTracking,
    userProfile,
    isLoading,
    
    // Save functions
    saveUserSkills,
    saveSkillGaps,
    saveCourseRecommendations,
    saveLearningPaths,
    saveProgressTracking,
    saveUserProfile,
    
    // Utility functions
    analyzeSkillGaps,
    updateSkillProgress
  };
}
