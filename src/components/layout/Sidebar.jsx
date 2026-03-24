import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, Inbox, Folder, BookOpen, Users,
  BarChart2, Cpu, Settings
} from "lucide-react";

const navItems = [
  { icon: Home,     label: "Home",              path: null },
  { icon: Inbox,    label: "My Work",           path: "/case" },
  { icon: Folder,   label: "Cases",             path: null },
  { icon: BookOpen, label: "Knowledge",         path: null },
  { icon: Users,    label: "Customers",         path: null },
  { icon: BarChart2,label: "Analytics",         path: "/supervisor" },
  { icon: Cpu,      label: "AI Optimization Hub", path: "/ai-optimization" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-[220px] bg-[#F0F4F8] border-r border-ms-border flex flex-col shrink-0">
      <nav className="flex-1 py-3">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = path && location.pathname === path;
          return (
            <button
              key={label}
              onClick={() => path && navigate(path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors
                ${isActive
                  ? "bg-ms-lblue text-ms-blue border-r-2 border-ms-blue"
                  : "text-ms-muted hover:bg-white hover:text-gray-800"
                }
                ${!path ? "cursor-default opacity-60" : "cursor-pointer"}
              `}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom: Agent Settings */}
      <div className="border-t border-ms-border p-3">
        <button
          onClick={() => navigate("/settings")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
            ${location.pathname === "/settings"
              ? "bg-ms-lblue text-ms-blue"
              : "text-ms-muted hover:bg-white hover:text-gray-800"
            }
          `}
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span>Agent Settings</span>
          <span className="ml-auto w-2 h-2 rounded-full bg-ms-teal" />
        </button>
      </div>
    </aside>
  );
}
