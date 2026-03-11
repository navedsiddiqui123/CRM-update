import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-1 text-xs text-ms-muted">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3" />}
          {i === items.length - 1 ? (
            <span className="text-gray-700 font-medium">{item}</span>
          ) : (
            <span className="hover:text-ms-blue cursor-pointer transition-colors">{item}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
