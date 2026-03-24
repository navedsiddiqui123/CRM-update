import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CaseDetailView     from "./views/CaseDetailView";
import SupervisorView     from "./views/SupervisorView";
import AiOptimizationView from "./views/AiOptimizationView";
import SettingsView       from "./views/SettingsView";
import Topbar             from "./components/layout/Topbar";
import Sidebar            from "./components/layout/Sidebar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen bg-ms-surface font-sans">
        <Topbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/"                element={<Navigate to="/case" />} />
              <Route path="/case"            element={<CaseDetailView />} />
              <Route path="/supervisor"      element={<SupervisorView />} />
              <Route path="/ai-optimization" element={<AiOptimizationView />} />
              <Route path="/settings"        element={<SettingsView />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
