import React, { useEffect } from 'react';
import { useSession } from '@/hooks/useSession';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface SecureAuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: string;
  redirectTo?: string;
}

export function SecureAuthGuard({ 
  children, 
  requireAuth = true, 
  requireRole,
  redirectTo = '/auth' 
}: SecureAuthGuardProps) {
  const { user, loading } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    // Check authentication requirement
    if (requireAuth && !user) {
      // Store the attempted URL for redirect after login
      const redirectUrl = location.pathname + location.search;
      navigate(`${redirectTo}?redirect=${encodeURIComponent(redirectUrl)}`, { replace: true });
      return;
    }

    // Check role requirement (implement when user roles are available)
    if (requireRole && user) {
      // This would check user.role or fetch from profiles table
      // For now, we'll skip role-based access
    }
  }, [user, loading, requireAuth, requireRole, redirectTo, navigate, location]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (requireAuth && !user) {
    return null; // Will redirect
  }

  return <>{children}</>;
}