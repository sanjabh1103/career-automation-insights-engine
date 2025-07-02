
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Route, 
  Plus, 
  Clock, 
  BookOpen, 
  Target, 
  CheckCircle,
  Calendar,
  Edit,
  Trash2
} from 'lucide-react';
import { useCareerPlanningStorage, LearningPath, Milestone } from '@/hooks/useCareerPlanningStorage';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export function LearningPathPanel() {
  const { 
    learningPaths, 
    saveLearningPaths, 
    userSkills, 
    courseRecommendations 
  } = useCareerPlanningStorage();
  
  const [isCreatingPath, setIsCreatingPath] = useState(false);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [newPath, setNewPath] = useState({
    name: '',
    description: '',
    skills: [] as string[],
    estimatedDuration: '',
    milestones: [] as Milestone[]
  });

  // Mock learning paths if none exist
  useEffect(() => {
    if (learningPaths.length === 0 && userSkills.length > 0) {
      const mockPaths: LearningPath[] = [
        {
          id: '1',
          name: 'Full-Stack Developer Journey',
          description: 'Complete path to become a full-stack web developer',
          skills: ['React', 'Node.js', 'Database Design', 'API Development'],
          estimatedDuration: '6 months',
          courses: courseRecommendations.slice(0, 3),
          milestones: [
            {
              id: '1',
              title: 'Frontend Foundation',
              description: 'Master HTML, CSS, and JavaScript basics',
              targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              completed: false,
              skills: ['HTML', 'CSS', 'JavaScript']
            },
            {
              id: '2',
              title: 'React Mastery',
              description: 'Build complex applications with React',
              targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
              completed: false,
              skills: ['React', 'State Management']
            }
          ]
        },
        {
          id: '2',
          name: 'Leadership Excellence',
          description: 'Develop strong leadership and management skills',
          skills: ['Leadership', 'Communication', 'Team Management'],
          estimatedDuration: '4 months',
          courses: courseRecommendations.slice(1, 3),
          milestones: [
            {
              id: '3',
              title: 'Communication Skills',
              description: 'Improve verbal and written communication',
              targetDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
              completed: false,
              skills: ['Communication']
            }
          ]
        }
      ];
      saveLearningPaths(mockPaths);
    }
  }, [userSkills, courseRecommendations]);

  const handleCreatePath = () => {
    if (!newPath.name.trim()) {
      toast.error('Please enter a path name');
      return;
    }

    const path: LearningPath = {
      id: Date.now().toString(),
      name: newPath.name.trim(),
      description: newPath.description.trim(),
      skills: newPath.skills,
      estimatedDuration: newPath.estimatedDuration,
      courses: [],
      milestones: newPath.milestones
    };

    const updatedPaths = [...learningPaths, path];
    saveLearningPaths(updatedPaths);
    
    setNewPath({
      name: '',
      description: '',
      skills: [],
      estimatedDuration: '',
      milestones: []
    });
    setIsCreatingPath(false);
    toast.success('Learning path created successfully!');
  };

  const toggleMilestone = (pathId: string, milestoneId: string) => {
    const updatedPaths = learningPaths.map(path => {
      if (path.id === pathId) {
        return {
          ...path,
          milestones: path.milestones.map(milestone =>
            milestone.id === milestoneId
              ? { ...milestone, completed: !milestone.completed }
              : milestone
          )
        };
      }
      return path;
    });
    
    saveLearningPaths(updatedPaths);
    toast.success('Milestone updated!');
  };

  const getPathProgress = (path: LearningPath) => {
    if (path.milestones.length === 0) return 0;
    const completedMilestones = path.milestones.filter(m => m.completed).length;
    return Math.round((completedMilestones / path.milestones.length) * 100);
  };

  const deletePath = (pathId: string) => {
    const updatedPaths = learningPaths.filter(path => path.id !== pathId);
    saveLearningPaths(updatedPaths);
    toast.success('Learning path deleted');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Learning Paths</h2>
          <p className="text-gray-600">Structured pathways to achieve your career goals</p>
        </div>
        
        <Dialog open={isCreatingPath} onOpenChange={setIsCreatingPath}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Create Path
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Learning Path</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pathName">Path Name</Label>
                <Input
                  id="pathName"
                  value={newPath.name}
                  onChange={(e) => setNewPath({ ...newPath, name: e.target.value })}
                  placeholder="e.g., Full-Stack Developer Journey"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pathDescription">Description</Label>
                <Textarea
                  id="pathDescription"
                  value={newPath.description}
                  onChange={(e) => setNewPath({ ...newPath, description: e.target.value })}
                  placeholder="Describe what this learning path will achieve"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="estimatedDuration">Estimated Duration</Label>
                <Input
                  id="estimatedDuration"
                  value={newPath.estimatedDuration}
                  onChange={(e) => setNewPath({ ...newPath, estimatedDuration: e.target.value })}
                  placeholder="e.g., 6 months, 12 weeks"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button onClick={handleCreatePath} className="flex-1">
                  Create Path
                </Button>
                <Button variant="outline" onClick={() => setIsCreatingPath(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Learning Paths */}
      {learningPaths.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Route className="w-8 h-8 text-gray-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">No Learning Paths Yet</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Create structured learning paths to organize your skill development journey
              </p>
            </div>
            <Button 
              onClick={() => setIsCreatingPath(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Path
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {learningPaths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-200 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {path.name}
                      </CardTitle>
                      <p className="text-gray-600 text-sm">{path.description}</p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedPath(path)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deletePath(path.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Path Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{path.estimatedDuration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span>{path.courses.length} courses</span>
                    </div>
                  </div>
                  
                  {/* Skills */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Skills Covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {path.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Progress */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-bold text-gray-900">
                        {getPathProgress(path)}%
                      </span>
                    </div>
                    <Progress value={getPathProgress(path)} className="h-2" />
                  </div>
                  
                  {/* Milestones */}
                  {path.milestones.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-700">Milestones:</p>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {path.milestones.map((milestone) => (
                          <div 
                            key={milestone.id}
                            className="flex items-start gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <button
                              onClick={() => toggleMilestone(path.id, milestone.id)}
                              className="mt-0.5"
                            >
                              <CheckCircle 
                                className={`w-4 h-4 ${
                                  milestone.completed 
                                    ? 'text-green-600 fill-current' 
                                    : 'text-gray-400'
                                }`} 
                              />
                            </button>
                            <div className="flex-1 space-y-1">
                              <p className={`text-sm font-medium ${
                                milestone.completed 
                                  ? 'text-green-900 line-through' 
                                  : 'text-gray-900'
                              }`}>
                                {milestone.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar className="w-3 h-3" />
                                <span>
                                  Due: {new Date(milestone.targetDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors"
                    onClick={() => setSelectedPath(path)}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Path Details Dialog */}
      {selectedPath && (
        <Dialog open={!!selectedPath} onOpenChange={() => setSelectedPath(null)}>
          <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedPath.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <p className="text-gray-600">{selectedPath.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Duration</p>
                  <p className="text-lg font-semibold">{selectedPath.estimatedDuration}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Progress</p>
                  <p className="text-lg font-semibold">{getPathProgress(selectedPath)}%</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Skills You'll Develop:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPath.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {selectedPath.milestones.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">Milestones:</p>
                  <div className="space-y-3">
                    {selectedPath.milestones.map((milestone) => (
                      <div key={milestone.id} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleMilestone(selectedPath.id, milestone.id)}
                          >
                            <CheckCircle 
                              className={`w-5 h-5 mt-0.5 ${
                                milestone.completed 
                                  ? 'text-green-600 fill-current' 
                                  : 'text-gray-400'
                              }`} 
                            />
                          </button>
                          <div className="flex-1 space-y-2">
                            <h4 className={`font-medium ${
                              milestone.completed 
                                ? 'text-green-900 line-through' 
                                : 'text-gray-900'
                            }`}>
                              {milestone.title}
                            </h4>
                            <p className="text-gray-600 text-sm">{milestone.description}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Target: {new Date(milestone.targetDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
