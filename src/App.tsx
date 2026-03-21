import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AgencyProvider } from "@/contexts/AgencyContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import ClientsPage from "./pages/ClientsPage";
import CRMPage from "./pages/CRMPage";
import TasksPage from "./pages/TasksPage";
import TeamPage from "./pages/TeamPage";
import CalendarPage from "./pages/CalendarPage";
import ClientContentPage from "./pages/ClientContentPage";
import LoginPage from "./pages/LoginPage";
import PermissionsPage from "./pages/PermissionsPage";
import ContractsPage from "./pages/ContractsPage";
import ContractSignPage from "./pages/ContractSignPage";
import ReportsPage from "./pages/ReportsPage";
import MeetingsPage from "./pages/MeetingsPage";
import PortfolioPage from "./pages/PortfolioPage";
import EquipmentPage from "./pages/EquipmentPage";
import ShootingSchedulePage from "./pages/ShootingSchedulePage";
import WhiteboardPage from "./pages/WhiteboardPage";

import PublicPortfolioPage from "./pages/PublicPortfolioPage";
import NotFound from "./pages/NotFound";
import BriefingFormPage from "./pages/BriefingFormPage";
import BriefingsPage from "./pages/BriefingsPage";

const queryClient = new QueryClient();

function AppRoutes() {
  const location = useLocation();
  const isPublicPage = location.pathname.startsWith('/conteudo/') || location.pathname.startsWith('/contrato/') || location.pathname === '/vitrine' || location.pathname === '/briefing';

  if (isPublicPage) {
    return (
      <Routes>
        <Route path="/conteudo/:taskId" element={<ClientContentPage />} />
        <Route path="/contrato/:contractId" element={<ContractSignPage />} />
        <Route path="/vitrine" element={<PublicPortfolioPage />} />
        <Route path="/briefing" element={<BriefingFormPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/clientes" element={<ClientsPage />} />
                <Route path="/crm" element={<CRMPage />} />
                <Route path="/tarefas" element={<TasksPage />} />
                <Route path="/equipe" element={<TeamPage />} />
                <Route path="/calendario" element={<CalendarPage />} />
                <Route path="/permissoes" element={<PermissionsPage />} />
                <Route path="/contratos" element={<ContractsPage />} />
            <Route path="/briefings" element={<BriefingsPage />} />
                <Route path="/relatorios" element={<ReportsPage />} />
                <Route path="/reunioes" element={<MeetingsPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/equipamentos" element={<EquipmentPage />} />
                <Route path="/gravacoes" element={<ShootingSchedulePage />} />
                <Route path="/whiteboard" element={<WhiteboardPage />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <AgencyProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AgencyProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
