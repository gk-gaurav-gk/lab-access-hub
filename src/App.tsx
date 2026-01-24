import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProjectProvider } from "@/context/ProjectContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import OnboardingProcess from "./pages/OnboardingProcess";
import ConsultantDashboard from "./pages/dashboard/ConsultantDashboard";
import ClientProjects from "./pages/dashboard/consultant/ClientProjects";
import Requirements from "./pages/dashboard/consultant/Requirements";
import Feedback from "./pages/dashboard/consultant/Feedback";
import Reports from "./pages/dashboard/consultant/Reports";
import TechDashboard from "./pages/dashboard/TechDashboard";
import DesignVersions from "./pages/dashboard/tech/DesignVersions";
import TechnicalDocs from "./pages/dashboard/tech/TechnicalDocs";
import MyTasks from "./pages/dashboard/tech/MyTasks";
import Feasibility from "./pages/dashboard/tech/Feasibility";
import SalesDashboard from "./pages/dashboard/SalesDashboard";
import Clients from "./pages/dashboard/sales/Clients";
import Proposals from "./pages/dashboard/sales/Proposals";
import Estimations from "./pages/dashboard/sales/Estimations";
import VersionHistory from "./pages/dashboard/sales/VersionHistory";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProjectProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding-process" element={<OnboardingProcess />} />
            <Route path="/dashboard/consultant" element={<ConsultantDashboard />} />
            <Route path="/dashboard/consultant/projects" element={<ClientProjects />} />
            <Route path="/dashboard/consultant/requirements" element={<Requirements />} />
            <Route path="/dashboard/consultant/feedback" element={<Feedback />} />
            <Route path="/dashboard/consultant/reports" element={<Reports />} />
            <Route path="/dashboard/tech" element={<TechDashboard />} />
            <Route path="/dashboard/tech/designs" element={<DesignVersions />} />
            <Route path="/dashboard/tech/docs" element={<TechnicalDocs />} />
            <Route path="/dashboard/tech/tasks" element={<MyTasks />} />
            <Route path="/dashboard/tech/feasibility" element={<Feasibility />} />
            <Route path="/dashboard/sales" element={<SalesDashboard />} />
            <Route path="/dashboard/sales/clients" element={<Clients />} />
            <Route path="/dashboard/sales/proposals" element={<Proposals />} />
            <Route path="/dashboard/sales/estimations" element={<Estimations />} />
            <Route path="/dashboard/sales/versions" element={<VersionHistory />} />
            <Route path="/dashboard/customer" element={<CustomerDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProjectProvider>
  </QueryClientProvider>
);

export default App;
