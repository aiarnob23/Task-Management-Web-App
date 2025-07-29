import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Cookies from "js-cookie";

//Type for the context
interface AuthContextType {
  user: any;
  loading: boolean;
  setUser: any;
  logout: () => void;
}

//Context
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("task-management-app-accessToken");
      const userId = Cookies.get("task-management-app-userId");

      if (token && userId) {
        setUser(userId);
        console.log("Active User restored from cookies:", userId);
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      console.log("Active User:", user);
    } else {
      console.log("No active user");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    Cookies.remove("task-management-app-accessToken");
    Cookies.remove("task-management-app-userId");
  };

  // auth info
  const authInfo: AuthContextType = {
    user,
    loading,
    setUser,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
