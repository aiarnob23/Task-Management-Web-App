import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import { useEffect, useState, useRef } from "react";
import { getFirstName } from "../../utils/getFirstName";
import LogoutButton from "../ui/button/Logout";
import { getUserPoints } from "../../services/userServices";

const Header = () => {
  const location = useLocation();
  const [firstName, setFirstName] = useState<any>("");
  const [isLogOutDivActive, setIsLogOutDivActive] = useState<boolean>(false);
  const [points, setPoints] = useState<any>(0);

  const logoutDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstName = getFirstName();
    setFirstName(firstName);
  }, []);

  useEffect(() => {
    const getPoints = async () => {
      const points = await getUserPoints();
      setPoints(points);
    };
    getPoints();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isLogOutDivActive &&
        logoutDropdownRef.current &&
        !logoutDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLogOutDivActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLogOutDivActive]);

  const navLinks = [
    {
      name: "Task List",
      path: "/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M8 12.2H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 16.2H12.38"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 4.02002C19.33 4.20002 21 5.43002 21 10V16C21 20 20 22 15 22H9C4 22 3 20 3 16V10C3 5.44002 4.67 4.20002 8 4.02002"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Spin",
      path: "/main/spin",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 13.7812C12.3624 13.7812 12.6562 13.4874 12.6562 13.125C12.6562 12.7626 12.3624 12.4688 12 12.4688C11.6376 12.4688 11.3438 12.7626 11.3438 13.125C11.3438 13.4874 11.6376 13.7812 12 13.7812Z"
            fill="currentColor"
          />
          <path
            d="M13.8517 2.5065L14.4784 1.00238C14.52 0.902666 14.5364 0.794213 14.526 0.686658C14.5156 0.579102 14.4788 0.475776 14.4189 0.385863C14.359 0.29595 14.2778 0.222237 14.1825 0.171276C14.0872 0.120314 13.9808 0.0936831 13.8727 0.0937501H10.1227C10.0147 0.0936831 9.9083 0.120314 9.81301 0.171276C9.71773 0.222237 9.63652 0.29595 9.57659 0.385863C9.51666 0.475776 9.47987 0.579102 9.4695 0.686658C9.45912 0.794213 9.47548 0.902666 9.51713 1.00238L10.1437 2.5065C8.12156 2.85976 6.24228 3.78307 4.72688 5.16784C3.21148 6.55261 2.12297 8.34128 1.58934 10.3235C1.05572 12.3058 1.09916 14.3992 1.71457 16.3576C2.32998 18.3159 3.49176 20.0579 5.06331 21.3786C6.63486 22.6993 8.55083 23.5439 10.5859 23.8129C12.621 24.082 14.6907 23.7644 16.5514 22.8975C18.4122 22.0305 19.9868 20.6503 21.09 18.9192C22.1932 17.188 22.7792 15.1778 22.779 13.125C22.7919 10.5839 21.9012 8.12093 20.2659 6.17586C18.6307 4.2308 16.3573 2.93027 13.8517 2.5065ZM21.4665 13.125C21.4666 14.1477 21.3002 15.1637 20.9738 16.1329L15.2179 13.7486C15.2994 13.3369 15.2994 12.9131 15.2179 12.5014L20.9835 10.1134C21.3045 11.085 21.4676 12.1018 21.4665 13.125ZM20.4855 8.89875L14.7157 11.2875C14.4807 10.9409 14.1819 10.642 13.8353 10.407L16.2244 4.63912C18.0742 5.55218 19.5718 7.04921 20.4855 8.89875ZM11.9977 15.0938C11.6084 15.0938 11.2277 14.9783 10.904 14.762C10.5802 14.5456 10.3279 14.2381 10.1789 13.8784C10.0299 13.5187 9.99086 13.1228 10.0668 12.7409C10.1428 12.359 10.3303 12.0082 10.6056 11.7329C10.881 11.4575 11.2318 11.27 11.6137 11.1941C11.9956 11.1181 12.3914 11.1571 12.7512 11.3061C13.1109 11.4551 13.4184 11.7075 13.6347 12.0312C13.851 12.355 13.9665 12.7356 13.9665 13.125C13.9659 13.647 13.7583 14.1474 13.3892 14.5165C13.0201 14.8855 12.5197 15.0932 11.9977 15.0938ZM12.8884 1.40625L11.9977 3.54375L11.1071 1.40625H12.8884ZM11.3921 5.50238C11.4419 5.62202 11.5259 5.72426 11.6337 5.79618C11.7415 5.86809 11.8682 5.90648 11.9977 5.90648C12.1273 5.90648 12.254 5.86809 12.3618 5.79618C12.4696 5.72426 12.5536 5.62202 12.6034 5.50238L13.3328 3.75187C13.9018 3.83152 14.4625 3.96205 15.0082 4.14188L12.621 9.90487C12.2095 9.82338 11.786 9.82338 11.3745 9.90487L8.98725 4.14188C9.53297 3.96205 10.0937 3.83152 10.6628 3.75187L11.3921 5.50238ZM7.77225 4.63987L10.1602 10.407C9.8136 10.642 9.5148 10.9409 9.27975 11.2875L3.51 8.89875C4.424 7.04903 5.92197 5.55198 7.77225 4.63912V4.63987ZM2.529 13.125C2.52794 12.1018 2.69101 11.085 3.012 10.1134L8.77763 12.5014C8.69613 12.9131 8.69613 13.3369 8.77763 13.7486L3.02175 16.1329C2.69528 15.1637 2.52885 14.1477 2.529 13.125ZM3.525 17.3449L9.27975 14.9625C9.5148 15.3091 9.8136 15.608 10.1602 15.843L7.7775 21.5978C5.93814 20.6763 4.44633 19.1843 3.525 17.3449ZM8.99025 22.1014L11.3745 16.3451C11.786 16.4266 12.2095 16.4266 12.621 16.3451L15.0052 22.1014C13.054 22.7579 10.9415 22.7579 8.99025 22.1014ZM16.218 21.5978L13.8353 15.843C14.1819 15.608 14.4807 15.3091 14.7157 14.9625L20.4705 17.3464C19.5489 19.1853 18.0571 20.6766 16.218 21.5978Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      name: "Friends",
      path: "/main/friends",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M17.9981 7.16C17.9381 7.15 17.8681 7.15 17.8081 7.16C16.4281 7.11 15.3281 5.98 15.3281 4.58C15.3281 3.15 16.4781 2 17.9081 2C19.3381 2 20.4881 3.16 20.4881 4.58C20.4781 5.98 19.3781 7.11 17.9981 7.16Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.9675 14.4399C18.3375 14.6699 19.8475 14.4299 20.9075 13.7199C22.3175 12.7799 22.3175 11.2399 20.9075 10.2999C19.8375 9.58992 18.3075 9.34991 16.9375 9.58991"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.96656 7.16C6.02656 7.15 6.09656 7.15 6.15656 7.16C7.53656 7.11 8.63656 5.98 8.63656 4.58C8.63656 3.15 7.48656 2 6.05656 2C4.62656 2 3.47656 3.16 3.47656 4.58C3.48656 5.98 4.58656 7.11 5.96656 7.16Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.9975 14.4399C5.6275 14.6699 4.1175 14.4299 3.0575 13.7199C1.6475 12.7799 1.6475 11.2399 3.0575 10.2999C4.1275 9.58992 5.6575 9.34991 7.0275 9.58991"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.9981 14.63C11.9381 14.62 11.8681 14.62 11.8081 14.63C10.4281 14.58 9.32812 13.45 9.32812 12.05C9.32812 10.62 10.4781 9.46997 11.9081 9.46997C13.3381 9.46997 14.4881 10.63 14.4881 12.05C14.4781 13.45 13.3781 14.59 11.9981 14.63Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.08875 17.7799C7.67875 18.7199 7.67875 20.2599 9.08875 21.1999C10.6888 22.2699 13.3087 22.2699 14.9087 21.1999C16.3187 20.2599 16.3187 18.7199 14.9087 17.7799C13.3187 16.7199 10.6888 16.7199 9.08875 17.7799Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const toggleLogOutDiv = () => {
    setIsLogOutDivActive(!isLogOutDivActive);
  };

  return (
    <div className="header-container">
      <header>
        <div>
          <div className="logo">
            <img src="/icons/timer.svg" alt="" />
            <h3>Tasko</h3>
          </div>
        </div>
        <nav className="nav-menu">
          {navLinks.map((link: any, index: number) => {
            if (link.name === "Friends" && points < 20) {
              return null;
            }

            return (
              <Link
                className={`nav-menu-item ${
                  location.pathname === link.path ? "active" : ""
                }`}
                to={link.path}
                key={index}
              >
                <div className="flex justify-center items-center gap-[10px]">
                  <span>{link.icon}</span>
                  {link.name}
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="flex justify-center items-center user-icon">
          {points >= 20 && (
            <div className="notification-icon  cursor-pointer">
              <img src="/svg/notification-bing.svg" alt="" />
            </div>
          )}
          {points >= 20 && (
            <div className="badge">
              <div className="badge-icon-div">
                <img src="/svg/badge.svg" alt="" />
              </div>
              <div className="badge-level">Level 2</div>
            </div>
          )}
          <div
            onClick={toggleLogOutDiv}
            className="logout-toggle-div cursor-pointer"
          >
            <div className="user-dp">
              <img
                className="rounded-[50%] mr-[11px]"
                src="/svg/user/user.svg"
                alt=""
              />
            </div>
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
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.291 10.7074C16.9214 10.0776 16.4754 9 15.5842 9H8.41268C7.52199 9 7.07572 10.0767 7.70525 10.7068L11.2878 14.2926C11.6782 14.6833 12.3113 14.6836 12.702 14.2932L16.291 10.7074Z"
                  fill="#D9D9D9"
                  fillOpacity="0.4"
                />
              </svg>
            </span>
          </div>
          {/* logout div */}
          <div
            ref={logoutDropdownRef}
            hidden={!isLogOutDivActive}
            className="absolute bottom-[300px] left-[170px] md:top-[70px] z-30 md:right-40 logout-dropdown"
          >
            <LogoutButton />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
