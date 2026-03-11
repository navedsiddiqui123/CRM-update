export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-4 bg-ms-navy h-12 shrink-0 z-50">
      {/* Left: Logo + App Name */}
      <div className="flex items-center gap-3">
        {/* Microsoft 4-square logo */}
        <svg width="20" height="20" viewBox="0 0 21 21" fill="none">
          <rect x="1"  y="1"  width="9" height="9" fill="#F25022"/>
          <rect x="11" y="1"  width="9" height="9" fill="#7FBA00"/>
          <rect x="1"  y="11" width="9" height="9" fill="#00A4EF"/>
          <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
        </svg>
        <span className="text-white font-display font-semibold text-sm tracking-wide">Dynamics 365</span>
        <span className="text-ms-teal text-sm font-medium">| Customer Service</span>
      </div>

      {/* Centre: Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search cases, contacts, knowledge…"
            className="w-full bg-white/10 text-white placeholder-gray-400 text-sm rounded pl-9 pr-3 py-1.5 border border-white/20 focus:outline-none focus:border-ms-teal"
          />
        </div>
      </div>

      {/* Right: Nav icons + Avatar */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="relative text-gray-300 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-ms-orange text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">5</span>
        </button>

        {/* Help */}
        <button className="text-gray-300 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-ms-blue flex items-center justify-center text-white text-xs font-semibold">
          JK
        </div>
      </div>
    </header>
  );
}
