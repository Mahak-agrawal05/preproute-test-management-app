import "../styles/Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-right">

        {/* Bell — outlined icon in a circle button */}
        <button className="bell-btn" aria-label="Notifications">
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 20c1.1 0 2-.9 2-2H7c0 1.1.9 2 2 2zm6-6V9c0-3.07-1.63-5.64-4.5-6.32V2a1.5 1.5 0 0 0-3 0v.68C4.64 3.36 3 5.92 3 9v5l-2 2v1h16v-1l-2-2z"
              fill="currentColor"
            />
          </svg>
        </button>

        {/* Profile */}
        <div className="profile">
          <div className="avatar">A</div>

          <div className="profile-text">
            <span className="profile-name">Alex Wando</span>
            <span className="profile-role">Admin</span>
          </div>

          {/* Dropdown chevron */}
          <svg
            className="chevron"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

      </div>
    </div>
  );
}

export default Header;
