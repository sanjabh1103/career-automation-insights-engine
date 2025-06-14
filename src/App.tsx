import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { useSession } from "@/hooks/useSession";
import { LogoutButton } from "@/components/LogoutButton";
import React from "react";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, loading } = useSession();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <Routes>
      {/* Auth route: only show if not logged in */}
      <Route
        path="/auth"
        element={!user ? <Auth /> : <React.Fragment>{null}</React.Fragment>}
      />
      {/* Redirect authenticated users away from /auth */}
      <Route
        path="/"
        element={
          user ? (
            <>
              {/* Optional: place logout button in a top bar for demo purposes */}
              <div className="w-full flex justify-end p-4 pr-8">
                <LogoutButton />
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
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
