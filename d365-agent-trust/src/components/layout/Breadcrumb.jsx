import { ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb({ items = [] }) {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center gap-1 text-sm text-ms-muted mb-4">
      <button
        onClick={() => navigate("/lead")}
        className="flex items-center gap-1 hover:text-ms-blue transition-colors cursor-pointer"
      >
        <Home size={13} />
        <span>Home</span>
      </button>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={13} className="text-ms-border" />
          {item.path ? (
            <button
              onClick={() => navigate(item.path)}
              className="hover:text-ms-blue transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-[#1a2332] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
