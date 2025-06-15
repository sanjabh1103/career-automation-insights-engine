import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import UserDashboardPage from "./pages/UserDashboardPage";
import { useSession } from "@/hooks/useSession";
import { LogoutButton } from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { SecurityHeaders } from "@/components/SecurityHeaders";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { APICreditsDisplay } from "@/components/APICreditsDisplay";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
    },
  },
});

const AppRoutes = () => {
  const { user, loading } = useSession();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <Routes>
      {/* Auth route: only show if not logged in */}
      <Route
        path="/auth"
        element={!user ? <Auth /> : <Navigate to="/" replace />}
      />
      {/* User Dashboard - protected route */}
      <Route
        path="/dashboard"
        element={
          user ? (
            <UserDashboardPage />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      {/* Main route */}
      <Route
        path="/"
        element={
          user ? (
            <>
              {/* Top navigation bar */}
              <div className="w-full flex justify-between items-center p-4 pr-8 bg-white border-b shadow-sm">
                <div className="flex items-center gap-4">
                  <h1 className="text-lg font-semibold text-gray-800">APO Dashboard</h1>
                  <APICreditsDisplay />
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = '/dashboard'}
                    className="gap-2"
                  >
                    <User className="w-4 h-4" />
                    Dashboard
                  </Button>
                  <LogoutButton />
                </div>
              </div>
              <Index />
            </>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AccessibilityProvider>
        <TooltipProvider>
          <SecurityHeaders />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AccessibilityProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
