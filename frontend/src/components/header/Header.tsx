import { Link, useLocation } from "react-router-dom"; 
import "./Header.scss";

const Header = () => {
  const location = useLocation(); 

  const navLinks = [
    { name: "Task List", path: "/dashboard", icon: "" },
    { name: "Spin", path: "/spin", icon: "" },
  ];

  return (
    <div className="header-container">
      <header>
        <h3 className="logo">Tasko</h3>
        <nav className="nav-menu">
          {navLinks.map((link: any, index: number) => (
            <Link
              className={`nav-menu-item ${
                location.pathname === link.path ? "active" : ""
              }`}
              to={link.path}
              key={index}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="user-icon">
          <h3>Thomas M.</h3>
        </div>
      </header>
    </div>
  );
};

export default Header;