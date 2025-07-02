
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, ExternalLink, Star, Clock, DollarSign, Search, Filter } from 'lucide-react';
import { useCareerPlanningStorage, CourseRecommendation } from '@/hooks/useCareerPlanningStorage';
import { motion } from 'framer-motion';

// Mock course data - in a real app, this would come from an API
const MOCK_COURSES: CourseRecommendation[] = [
  {
    id: '1',
    title: 'Complete React Developer Course',
    provider: 'Udemy',
    url: 'https://example.com',
    duration: '40 hours',
    level: 'Intermediate',
    rating: 4.8,
    price: '$59.99',
    skills: ['React', 'JavaScript', 'Web Development']
  },
  {
    id: '2',
    title: 'Leadership Fundamentals',
    provider: 'Coursera',
    url: 'https://example.com',
    duration: '20 hours',
    level: 'Beginner',
    rating: 4.6,
    price: 'Free',
    skills: ['Leadership', 'Management', 'Communication']
  },
  {
    id: '3',
    title: 'Data Analysis with Python',
    provider: 'edX',
    url: 'https://example.com',
    duration: '60 hours',
    level: 'Advanced',
    rating: 4.9,
    price: '$199.00',
    skills: ['Python', 'Data Analysis', 'Statistics']
  },
  {
    id: '4',
    title: 'Project Management Professional',
    provider: 'LinkedIn Learning',
    url: 'https://example.com',
    duration: '30 hours',
    level: 'Intermediate',
    rating: 4.7,
    price: '$29.99/month',
    skills: ['Project Management', 'Planning', 'Leadership']
  },
  {
    id: '5',
    title: 'UX Design Bootcamp',
    provider: 'Udacity',
    url: 'https://example.com',
    duration: '120 hours',
    level: 'Beginner',
    rating: 4.5,
    price: '$399.00',
    skills: ['UX Design', 'Design Thinking', 'Prototyping']
  },
  {
    id: '6',
    title: 'Digital Marketing Masterclass',
    provider: 'Skillshare',
    url: 'https://example.com',
    duration: '25 hours',
    level: 'Intermediate',
    rating: 4.4,
    price: '$99.00',
    skills: ['Digital Marketing', 'SEO', 'Social Media']
  }
];

export function CourseRecommendationsPanel() {
  const { userSkills, courseRecommendations, saveCourseRecommendations } = useCareerPlanningStorage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState<CourseRecommendation[]>([]);

  useEffect(() => {
    // Initialize with mock courses if none exist
    if (courseRecommendations.length === 0) {
      saveCourseRecommendations(MOCK_COURSES);
    }
  }, []);

  useEffect(() => {
    let courses = courseRecommendations.length > 0 ? courseRecommendations : MOCK_COURSES;
    
    // Filter by search term
    if (searchTerm) {
      courses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by level
    if (selectedLevel !== 'all') {
      courses = courses.filter(course => course.level.toLowerCase() === selectedLevel);
    }
    
    // Filter by provider
    if (selectedProvider !== 'all') {
      courses = courses.filter(course => course.provider === selectedProvider);
    }
    
    setFilteredCourses(courses);
  }, [courseRecommendations, searchTerm, selectedLevel, selectedProvider]);

  const getRecommendedCourses = () => {
    if (userSkills.length === 0) return filteredCourses;
    
    const userSkillNames = userSkills.map(skill => skill.name.toLowerCase());
    
    return filteredCourses.sort((a, b) => {
      const aMatchCount = a.skills.filter(skill => 
        userSkillNames.some(userSkill => 
          skill.toLowerCase().includes(userSkill) || userSkill.includes(skill.toLowerCase())
        )
      ).length;
      
      const bMatchCount = b.skills.filter(skill => 
        userSkillNames.some(userSkill => 
          skill.toLowerCase().includes(userSkill) || userSkill.includes(skill.toLowerCase())
        )
      ).length;
      
      return bMatchCount - aMatchCount;
    });
  };

  const recommendedCourses = getRecommendedCourses();
  const providers = [...new Set(MOCK_COURSES.map(course => course.provider))];

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Course Recommendations</h2>
        <p className="text-gray-600">Discover courses tailored to your skill development goals</p>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search Courses
              </label>
              <Input
                placeholder="Search by title or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Level
              </label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Provider</label>
              <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  {providers.map(provider => (
                    <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Grid */}
      {recommendedCourses.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">No Courses Found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search criteria or filters to find relevant courses
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-200 group">
                <CardHeader className="pb-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="text-xs">
                        {course.provider}
                      </Badge>
                      <Badge className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        {getRatingStars(course.rating)}
                        <span className="ml-1 font-medium">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium">{course.price}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Skills you'll learn:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                    variant="outline"
                    onClick={() => window.open(course.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Course
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {userSkills.length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-green-900">Personalized Recommendations</h3>
                <p className="text-green-700 text-sm">
                  Courses are sorted based on your current skill profile. The most relevant courses appear first.
                  Add more skills in the Skills Management section to get better recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
