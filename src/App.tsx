import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import PaymentsPage from "./pages/Payments";
import Reports from "./pages/Reports";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/menu" element={<PlaceholderPage title="Menu Items" />} />
            <Route path="/orders" element={<PlaceholderPage title="Orders" />} />
            <Route path="/clients" element={<PlaceholderPage title="Clients" />} />
            <Route path="/employees" element={<PlaceholderPage title="Employees" />} />
            <Route path="/kitchen" element={<PlaceholderPage title="Kitchen" />} />
            <Route path="/managers" element={<PlaceholderPage title="Managers" />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
