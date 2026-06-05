import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">PrepRoute</h2>

      <div className="sidebar-menu">
        <p>Dashboard</p>
        <p>Test Creation</p>
        <p>Test Tracking</p>
      </div>
    </div>
  );
}

export default Sidebar;