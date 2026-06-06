import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

/* ── SVG icon components ── */
const IconAnalytics = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconInfo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const IconCopy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconBuilding = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="22" x2="21" y2="22" />
    <rect x="5" y="2" width="14" height="20" rx="1" />
    <path d="M9 22V12h6v10" />
    <line x1="9" y1="7" x2="9.01" y2="7" />
    <line x1="12" y1="7" x2="12.01" y2="7" />
    <line x1="15" y1="7" x2="15.01" y2="7" />
    <line x1="9" y1="11" x2="9.01" y2="11" />
    <line x1="15" y1="11" x2="15.01" y2="11" />
  </svg>
);

const IconPerson = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconInbox = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const IconCurrency = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="18" width="12" height="4" />
    <path d="M6 9a6 6 0 0 0 12 0" />
  </svg>
);

const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconBell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconSettings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

/* ── Logo icon (P-snake shape from screenshot) ── */
const LogoIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="white" fillOpacity="0.15"/>
    <text x="5" y="23" fontSize="20" fontWeight="800" fill="white" fontFamily="serif">P</text>
  </svg>
);

interface NavItem {
  icon: React.FC;
  path: string;
  label: string;
}

const TOP_NAV: NavItem[] = [
  { icon: IconAnalytics, path: "/dashboard",     label: "Dashboard" },
  { icon: IconEdit,      path: "/create-test",   label: "Test Creation" },
  { icon: IconInfo,      path: "/info",          label: "Info" },
  { icon: IconCopy,      path: "/copy",          label: "Copy" },
  { icon: IconUsers,     path: "/users",         label: "Users" },
  { icon: IconBuilding,  path: "/building",      label: "Organisation" },
  { icon: IconPerson,    path: "/profile",       label: "Profile" },
  { icon: IconInbox,     path: "/inbox",         label: "Inbox" },
  { icon: IconCurrency,  path: "/billing",       label: "Billing" },
  { icon: IconTrophy,    path: "/achievements",  label: "Achievements" },
  { icon: IconChat,      path: "/chat",          label: "Chat" },
];

const BOTTOM_NAV: NavItem[] = [
  { icon: IconBell,     path: "/notifications", label: "Notifications" },
  { icon: IconSettings, path: "/settings",      label: "Settings" },
];

function Sidebar() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/dashboard" && location.pathname.startsWith(path));

  return (
    <aside className="sidebar">
      {/* Logo area */}
      <div className="sidebar-logo" onClick={() => navigate("/dashboard")}>
        <LogoIcon />
      </div>

      {/* Top navigation icons */}
      <nav className="sidebar-nav">
        {TOP_NAV.map(({ icon: Icon, path, label }) => (
          <button
            key={path}
            className={`sidebar-icon-btn ${isActive(path) ? "active" : ""}`}
            onClick={() => navigate(path)}
            title={label}
            aria-label={label}
          >
            <Icon />
          </button>
        ))}
      </nav>

      {/* Bottom navigation icons */}
      <nav className="sidebar-nav sidebar-nav-bottom">
        {BOTTOM_NAV.map(({ icon: Icon, path, label }) => (
          <button
            key={path}
            className={`sidebar-icon-btn ${isActive(path) ? "active" : ""}`}
            onClick={() => navigate(path)}
            title={label}
            aria-label={label}
          >
            <Icon />
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
