import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Roadmaps from "./pages/Roadmaps";
import Hackathons from "./pages/Hackathons";
import Challenges from "./pages/Challenges";
import Achievements from "./pages/Achievements";
import JavaScriptChallenge from "./pages/JavaScriptChallenge";
import ReactChallenge from "./pages/ReactChallenge";
import FrontendRoadmap from "./pages/FrontendRoadmap";
import BackendRoadmap from "./pages/BackendRoadmap";
import CustomRoadmap from "./pages/CustomRoadmap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/roadmaps/frontend" element={<FrontendRoadmap />} />
          <Route path="/roadmaps/backend" element={<BackendRoadmap />} />
          <Route path="/roadmaps/custom" element={<CustomRoadmap />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/challenges/javascript" element={<JavaScriptChallenge />} />
          <Route path="/challenges/react" element={<ReactChallenge />} />
          <Route path="/progress" element={<Navigate to="/achievements" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
