
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Briefcase } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface SearchInterfaceProps {
  onOccupationSelect: (occupation: any) => void;
}

export const SearchInterface = ({ onOccupationSelect }: SearchInterfaceProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const { toast } = useToast();

  const { mutate: searchOccupations, isPending: isLoading } = useMutation({
    mutationFn: async (term: string) => {
      const { data, error } = await supabase.functions.invoke('onet-proxy', {
        body: { onetPath: `search?keyword=${encodeURIComponent(term)}&end=10` },
      });

      if (error) throw new Error(`Function invocation failed: ${error.message}`);
      if (data.error) throw new Error(`API Error: ${data.error}`);

      if (!data.occupation) {
        if (data.code && data.title) return [data];
        return [];
      }
      
      return Array.isArray(data.occupation) ? data.occupation : [data.occupation];
    },
    onSuccess: (data) => {
      setResults(data.map((item: any) => ({
        code: item.code,
        title: item.title,
        description: `An occupation from the O*NET database.`,
      })));
    },
    onError: (error: Error) => {
      console.error('Search failed:', error);
      toast({
        variant: 'destructive',
        title: 'Search Failed',
        description: error.message,
      });
      setResults([]);
    },
  });

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setResults([]);
      searchOccupations(searchTerm);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Career Search</h2>
        <p className="text-gray-600 text-sm">
          Search for occupations to analyze their automation potential
        </p>
      </div>

      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Enter occupation, skill, or keyword (e.g., 'audit', 'energy', 'analyst')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">Search Results ({results.length})</h3>
          <div className="space-y-2">
            {results.map((result) => (
              <div
                key={result.code}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                onClick={() => onOccupationSelect(result)}
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-lg p-2 mt-1">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{result.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                    <p className="text-xs text-gray-500 mt-2">O*NET Code: {result.code}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchTerm && results.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No results found for "{searchTerm}"</p>
          <p className="text-sm">Try different keywords or check spelling</p>
        </div>
      )}
    </div>
  );
};
