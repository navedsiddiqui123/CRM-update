import { Bell, HelpCircle, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-4 bg-ms-navy" style={{ height: 48, minHeight: 48 }}>
      {/* Left: Logo + wordmark */}
      <div className="flex items-center gap-3">
        {/* Microsoft 4-square logo */}
        <div className="flex-shrink-0 grid grid-cols-2 gap-0.5 w-5 h-5">
          <div className="bg-red-500 rounded-sm" />
          <div className="bg-green-500 rounded-sm" />
          <div className="bg-blue-500 rounded-sm" />
          <div className="bg-yellow-400 rounded-sm" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-sm tracking-wide">Dynamics 365</span>
          <span className="text-blue-300 text-sm opacity-70">|</span>
          <span className="text-blue-200 text-sm opacity-80">Sales Hub</span>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-6">
        <div className="flex items-center bg-white/10 rounded px-3 py-1.5 gap-2">
          <Search size={14} className="text-blue-200" />
          <input
            type="text"
            placeholder="Search leads, contacts, accounts…"
            className="bg-transparent text-white text-sm placeholder-blue-300/70 outline-none w-full"
          />
        </div>
      </div>

      {/* Right: Actions + Avatar */}
      <div className="flex items-center gap-3">
        <div className="relative cursor-pointer">
          <Bell size={18} className="text-blue-200 hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 bg-ms-orange text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">3</span>
        </div>
        <HelpCircle size={18} className="text-blue-200 hover:text-white transition-colors cursor-pointer" />
        <div className="w-8 h-8 rounded-full bg-ms-blue flex items-center justify-center text-white text-xs font-semibold cursor-pointer">
          JM
        </div>
      </div>
    </header>
  );
}
