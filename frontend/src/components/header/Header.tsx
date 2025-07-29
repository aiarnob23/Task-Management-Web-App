import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import { useEffect, useState } from "react";
import { getFirstName } from "../../utils/getFirstName";
import LogoutButton from "../ui/button/Logout";

const Header = () => {
  const location = useLocation();
  const [firstName, setFirstName] = useState<any>("");
  const [isLogOutDivActive, setIsLogOutDivActive] = useState<boolean>(false);

  useEffect(() => {
    const firstName = getFirstName();
    setFirstName(firstName);
  }, []);

  const navLinks = [
    { name: "Task List", path: "/dashboard", icon: "" },
    { name: "Spin", path: "/spin", icon: "" },
  ];
  const toggleLogOutDiv = () => {
    setIsLogOutDivActive(!isLogOutDivActive);
  };

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
        <div onClick={toggleLogOutDiv} className="flex justify-center items-center cursor-pointer user-icon">
          <h3>{firstName}</h3>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.291 10.7074C16.9214 10.0776 16.4754 9 15.5842 9H8.41268C7.52199 9 7.07572 10.0767 7.70525 10.7068L11.2878 14.2926C11.6782 14.6833 12.3113 14.6836 12.702 14.2932L16.291 10.7074Z"
                fill="#D9D9D9"
                fill-opacity="0.4"
              />
            </svg>
          </span>
          {/* logout div */}
          <div
            hidden={!isLogOutDivActive}
            className="absolute top-[70px] z-30 right-40 logout-dropdown"
          >
            <LogoutButton />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
