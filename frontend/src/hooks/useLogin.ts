import { useContext, useState } from "react";
import { serverBaseUrl } from "../utils/serverBaseUrl";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("context not provided");
  }

  const { setUser } = context;
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await serverBaseUrl.post("/user/login", {
        email,
        password,
      });

      console.log(res.data.data);
      const response = res.data.data;

      if (res.data.success) {
        setSuccess(true);
        setError(null);
        const token = response.token;
        const userId = response.user.id;
        const name = response.user.name;
        Cookies.set("task-management-app-userName", name);
        Cookies.set("task-management-app-userId", userId);
        Cookies.set("task-management-app-accessToken", token);
        setUser(userId);
      } else {
        setSuccess(false);
        setError(res.data.message);
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during sign in.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, error, success };
}
