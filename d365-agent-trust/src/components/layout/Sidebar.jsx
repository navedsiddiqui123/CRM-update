import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  ContactIcon,
  Calendar,
  BarChart2,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard",     icon: LayoutDashboard, path: null },
  { label: "Leads",         icon: Users,            path: "/lead" },
  { label: "Opportunities", icon: Briefcase,        path: null },
  { label: "Accounts",      icon: Building2,        path: null },
  { label: "Contacts",      icon: ContactIcon,      path: null },
  { label: "Activities",    icon: Calendar,         path: null },
  { label: "Reports",       icon: BarChart2,        path: null },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => path && location.pathname.startsWith(path);

  return (
    <aside
      className="flex flex-col border-r border-ms-border bg-[#F0F4F8]"
      style={{ width: 220, minWidth: 220 }}
    >
      <nav className="flex-1 py-2">
        {navItems.map(({ label, icon: Icon, path }) => {
          const active = isActive(path);
          return (
            <button
              key={label}
              onClick={() => path && navigate(path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer border-l-4 ${
                active
                  ? "border-ms-blue bg-ms-lblue text-ms-blue font-semibold"
                  : "border-transparent text-ms-muted hover:bg-white/60 hover:text-[#1a2332] font-medium"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Agent Settings link */}
      <div className="border-t border-ms-border p-3">
        <button
          onClick={() => navigate("/settings")}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-ms-muted hover:text-[#1a2332] hover:bg-white/60 rounded transition-colors cursor-pointer"
        >
          <Settings size={16} />
          <span className="font-medium">Agent Settings</span>
          <span className="ml-auto w-2 h-2 rounded-full bg-ms-teal pulse-dot" />
        </button>
      </div>
    </aside>
  );
}
