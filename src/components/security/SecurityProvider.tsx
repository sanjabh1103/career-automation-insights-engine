import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from '@/hooks/useSession';
import { searchRateLimiter, apoRateLimiter, exportRateLimiter, checkRateLimit } from '@/utils/rateLimiting';
import { sanitizeSearchInput, validateEmail } from '@/utils/inputSanitization';
import { validateAndSanitizeInput, occupationSearchSchema } from '@/utils/enhancedInputValidation';

interface SecurityContextType {
  isRateLimited: (action: 'search' | 'apo' | 'export') => boolean;
  getRemainingRequests: (action: 'search' | 'apo' | 'export') => number;
  validateSearchInput: (input: string) => string;
  validateFormInput: (input: unknown) => { success: boolean; data?: any; errors?: string[] };
  checkPermission: (action: string) => boolean;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const { user } = useSession();
  const [userRole, setUserRole] = useState<string>('user');

  useEffect(() => {
    // Get user role (this would typically come from your user profile)
    if (user) {
      // For now, default to 'user' role
      setUserRole('user');
    }
  }, [user]);

  const isRateLimited = (action: 'search' | 'apo' | 'export'): boolean => {
    if (!user) return true;
    
    const limiters = {
      search: searchRateLimiter,
      apo: apoRateLimiter,
      export: exportRateLimiter
    };
    
    const result = checkRateLimit(limiters[action], user.id);
    return !result.allowed;
  };

  const getRemainingRequests = (action: 'search' | 'apo' | 'export'): number => {
    if (!user) return 0;
    
    const limiters = {
      search: searchRateLimiter,
      apo: apoRateLimiter,
      export: exportRateLimiter
    };
    
    const result = checkRateLimit(limiters[action], user.id);
    return result.remaining;
  };

  const validateSearchInput = (input: string): string => {
    return sanitizeSearchInput(input);
  };

  const validateFormInput = (input: unknown) => {
    return validateAndSanitizeInput(input, occupationSearchSchema);
  };

  const checkPermission = (action: string): boolean => {
    // Basic permission system - can be expanded
    switch (action) {
      case 'export':
        return user !== null;
      case 'admin':
        return userRole === 'admin';
      case 'moderator':
        return ['admin', 'moderator'].includes(userRole);
      default:
        return user !== null;
    }
  };

  const contextValue: SecurityContextType = {
    isRateLimited,
    getRemainingRequests,
    validateSearchInput,
    validateFormInput,
    checkPermission
  };

  return (
    <SecurityContext.Provider value={contextValue}>
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}