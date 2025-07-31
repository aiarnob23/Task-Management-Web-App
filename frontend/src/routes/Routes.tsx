import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "../pages/not-found/NotFound";
import Login from "../pages/auth/login/Login";
import SignUp from "../pages/auth/sign-up/SignUp";
import Dashboard from "../pages/dashboard/Dashboard";
import MainLayout from "../layouts/MainLayout";
import TaskDetails from "../pages/task-details/TaskDetails";
import PrivateRoute from "./PrivateRoutes";
import Spin from "../pages/spin/Spin";
import ResetPassword from "../pages/auth/reset-password/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/main",
    element: <PrivateRoute><MainLayout /></PrivateRoute>,
    children: [
      {
        path: "/main/task-details/:taskId",
        element: <TaskDetails/>,
      },
      {
        path: "/main/spin",
        element: <Spin/>,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />,
  },
  {
    path: "/auth/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;