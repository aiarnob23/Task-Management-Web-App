import { useContext } from "react";
import "./Logout.scss";
import { AuthContext } from "../../../context/AuthContext";

const LogoutButton = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Authcontext is not defined");
  }
  const { logout } = context;

  const handleLogOut = () => {
    logout();
    window.location.href = "/auth/login";
  };
  return (
    <div>
      <button onClick={handleLogOut} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
