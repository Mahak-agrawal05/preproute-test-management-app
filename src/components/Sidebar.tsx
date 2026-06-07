import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

import logoImage from "../assets/logo.png";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: "Test Creation",
    path: "/test-creation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    label: "Test Tracking",
    path: "/test-tracking",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img
          src={logoImage}
          alt="PrepRoute"
          className="sidebar-logo-img"
        />
      </div>

      {/* Nav */}
      <nav className="sidebar-menu">
        {NAV_ITEMS.map((item) => {
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + "/");

          return (
            <div
              key={item.path}
              className={`sidebar-item${isActive ? " active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="sidebar-item-label">{item.label}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
