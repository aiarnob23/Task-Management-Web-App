import { useContext, useState } from "react";
import { serverBaseUrl } from "../utils/serverBaseUrl";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

export function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("context not provided");
  }

  const { setUser } = context;
  const signUp = async (data: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await serverBaseUrl.post("/user/create-new", {
        data,
      });

      const response = res.data.data;
      console.log(response);

      if (response.token) {
        setSuccess(true);
        setError(null);
        const token = response.token;
        const userId = response.result._id;
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

  return { signUp, loading, error, success };
}
