import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LeadDetailView from "./views/LeadDetailView";
import ManagerDashboardView from "./views/ManagerDashboardView";
import SettingsView from "./views/SettingsView";
import Topbar from "./components/layout/Topbar";
import Sidebar from "./components/layout/Sidebar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen bg-ms-surface font-sans">
        <Topbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/lead" />} />
              <Route path="/lead" element={<LeadDetailView />} />
              <Route path="/manager" element={<ManagerDashboardView />} />
              <Route path="/settings" element={<SettingsView />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
