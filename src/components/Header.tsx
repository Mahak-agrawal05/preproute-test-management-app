import "../styles/Header.css";

function Header() {
  return (
    <div className="header">

      <div className="header-right">

        <span className="bell">🔔
        </span>

        <div className="profile">
          <div className="avatar">
            A
          </div>

          <div>
            <h4>Alex Wando</h4>
            <p>Admin</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Header;