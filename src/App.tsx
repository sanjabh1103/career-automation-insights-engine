
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SecurityHeaders } from "@/components/SecurityHeaders";
import { SecurityProvider } from "@/components/security/SecurityProvider";
import { SecureAuthGuard } from "@/components/security/SecureAuthGuard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import UserDashboardPage from "./pages/UserDashboardPage";
import SharedAnalysisPage from "./pages/SharedAnalysisPage";
import AIImpactPage from "./pages/AIImpactPage";
import AIImpactPlannerPage from "./pages/AIImpactPlannerPage";
import CareerPlanningPage from "./pages/CareerPlanningPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SecurityHeaders />
        <SecurityProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/shared/:shareToken" element={<SharedAnalysisPage />} />
              <Route path="/" element={
                <SecureAuthGuard requireAuth={true}>
                  <Index />
                </SecureAuthGuard>
              } />
              <Route path="/dashboard" element={
                <SecureAuthGuard requireAuth={true}>
                  <UserDashboardPage />
                </SecureAuthGuard>
              } />
              <Route path="/ai-impact" element={
                <SecureAuthGuard requireAuth={true}>
                  <AIImpactPage />
                </SecureAuthGuard>
              } />
              <Route path="/ai-impact-planner" element={
                <SecureAuthGuard requireAuth={true}>
                  <AIImpactPlannerPage />
                </SecureAuthGuard>
              } />
              <Route path="/career-planning" element={
                <SecureAuthGuard requireAuth={true}>
                  <CareerPlanningPage />
                </SecureAuthGuard>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SecurityProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
