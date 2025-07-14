
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Brain, Target, BookOpen, TrendingUp, Plus, Save } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface ReskillResource {
  id: string;
  title: string;
  description: string | null;
  provider: string;
  skill_area: string;
  url: string;
  cost_type: string | null;
  created_at: string;
  updated_at: string;
}

interface NewResourceForm {
  title: string;
  description: string;
  provider: string;
  skill_area: string;
  url: string;
  cost_type: string;
}

export const AIImpactPlanner = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newResource, setNewResource] = useState<NewResourceForm>({
    title: '',
    description: '',
    provider: '',
    skill_area: '',
    url: '',
    cost_type: 'free'
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: resources, isLoading } = useQuery({
    queryKey: ['ai-reskilling-resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_reskilling_resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ReskillResource[];
    },
  });

  const addResourceMutation = useMutation({
    mutationFn: async (resource: Omit<ReskillResource, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('ai_reskilling_resources')
        .insert([resource])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-reskilling-resources'] });
      toast({
        title: 'Resource Added',
        description: 'The reskilling resource has been added successfully.',
      });
      setNewResource({
        title: '',
        description: '',
        provider: '',
        skill_area: '',
        url: '',
        cost_type: 'free'
      });
      setShowAddForm(false);
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add the resource. Please try again.',
      });
      console.error('Error adding resource:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResource.title || !newResource.provider || !newResource.skill_area || !newResource.url) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
      });
      return;
    }
    
    addResourceMutation.mutate(newResource);
  };

  const skillAreas = resources?.reduce((acc, resource) => {
    if (!acc.includes(resource.skill_area)) {
      acc.push(resource.skill_area);
    }
    return acc;
  }, [] as string[]) || [];

  const costTypes = resources?.reduce((acc, resource) => {
    if (resource.cost_type && !acc.includes(resource.cost_type)) {
      acc.push(resource.cost_type);
    }
    return acc;
  }, [] as string[]) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading AI Impact Planner..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Impact Planner</h2>
          <p className="text-muted-foreground">
            Plan your career transition and skill development strategy
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Resource
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources?.length || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skill Areas</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skillAreas.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Free Resources</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resources?.filter(r => r.cost_type === 'free').length || 0}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI-Ready Skills</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resources?.filter(r => r.skill_area.toLowerCase().includes('ai') || 
                r.skill_area.toLowerCase().includes('machine learning') ||
                r.skill_area.toLowerCase().includes('data')).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Resource Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Reskilling Resource
            </CardTitle>
            <CardDescription>
              Contribute a new learning resource to help others with their career transition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    value={newResource.title}
                    onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Python for Data Science Course"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Provider *</label>
                  <Input
                    value={newResource.provider}
                    onChange={(e) => setNewResource(prev => ({ ...prev, provider: e.target.value }))}
                    placeholder="e.g., Coursera, Udemy, edX"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Skill Area *</label>
                  <Input
                    value={newResource.skill_area}
                    onChange={(e) => setNewResource(prev => ({ ...prev, skill_area: e.target.value }))}
                    placeholder="e.g., Data Science, Programming, AI"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Cost Type</label>
                  <select
                    value={newResource.cost_type}
                    onChange={(e) => setNewResource(prev => ({ ...prev, cost_type: e.target.value }))}
                    className="w-full p-2 border border-input rounded-md"
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                    <option value="freemium">Freemium</option>
                    <option value="subscription">Subscription</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">URL *</label>
                <Input
                  type="url"
                  value={newResource.url}
                  onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://example.com/course"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newResource.description}
                  onChange={(e) => setNewResource(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the resource and what it covers..."
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={addResourceMutation.isPending}
                  className="gap-2"
                >
                  {addResourceMutation.isPending ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {addResourceMutation.isPending ? 'Adding...' : 'Add Resource'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Resources by Skill Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skillAreas.map((skillArea) => {
          const skillResources = resources?.filter(r => r.skill_area === skillArea) || [];
          return (
            <Card key={skillArea}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {skillArea}
                  <Badge variant="secondary">{skillResources.length} resources</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {skillResources.map((resource) => (
                    <div key={resource.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-medium">{resource.title}</h4>
                        {resource.cost_type && (
                          <Badge 
                            variant={resource.cost_type === 'free' ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {resource.cost_type}
                          </Badge>
                        )}
                      </div>
                      {resource.description && (
                        <p className="text-xs text-muted-foreground mb-2">
                          {resource.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Provider: {resource.provider}</span>
                      </div>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-xs text-primary hover:underline"
                      >
                        View Resource →
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {skillAreas.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="text-center py-8">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No reskilling resources available yet. Add some resources to get started!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
