import { Link, useLocation } from "react-router-dom";
import "./DashboardHeader.scss";
import { useEffect, useState } from "react";
import LogoutButton from "../../ui/button/Logout";
import { getFirstName } from "../../../utils/getFirstName";
import { getUserPoints } from "../../../services/userServices";

const DashboardHeader = () => {
  const [firstName, setFirstName] = useState<any>("");
  const location = useLocation();
  const [isLogOutDivActive, setIsLogOutDivActive] = useState<boolean>(false);
  const [points, setPoints] = useState<any>(0);

  const navLinks = [
    { name: "Task List", path: "/dashboard", icon: "/icons/clipboard-text.svg" },
    { name: "Spin", path: "/spin", icon: "/icons/frame.svg" },
    { name: "Friends", path: "/friends", icon: "/icons/people.svg" },
  ];
  
  const toggleLogOutDiv = () => {
    setIsLogOutDivActive(!isLogOutDivActive);
  };

  useEffect(() => {
    const firstName = getFirstName();
    setFirstName(firstName);
  }, []);

  useEffect(()=>{
    const getPoints = async()=>{
      const points = await getUserPoints();
      setPoints(points);
    }
    getPoints();
  },[])

  return (
    <div className="dashboard-header-container">
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
                 <span><img src={link.icon} alt="" /></span>
                {link.name}
               </div>
              </Link>
            );
          })}
        </nav>
        <div
          onClick={toggleLogOutDiv}
          className="user-icon flex justify-center items-center gap-[4px]"
        >
          <div className="notification-icon">
            <img src="/svg/notification-bing.svg" alt="" />
          </div>
          {points >= 20 && (
            <div className="badge">
              <div className="badge-icon-div">
                <img src="/svg/badge.svg" alt="" />
              </div>
              <div className="badge-level">Level 2</div>
            </div>
          )}
          <div className="user-dp">
            <img src="/svg/user/user.svg" alt="" />
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
          hidden={!isLogOutDivActive}
          className="absolute top-[60px] -right-10 logout-dropdown"
        >
          <LogoutButton />
        </div>
      </header>
      <div className="welcome-message">
        <p>
          Hi <span>{firstName}</span>
        </p>
        <h3>Welcome to Dashboard</h3>
      </div>
    </div>
  );
};

export default DashboardHeader;