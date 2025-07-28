import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/not-found/NotFound";
import Login from "../pages/auth/login/Login";
import SignUp from "../pages/auth/sign-up/SignUp";
import Dashboard from "../pages/dashboard/Dashboard";

const router = createBrowserRouter([

  {
    path:"/dashboard",
    element:<Dashboard/>
  },
  {
    path:"/auth/login",
    element:<Login/>,

  },
  {
    path:"/auth/sign-up",
    element:<SignUp/>,

  },
  {
    path:"*",
    element:<NotFound/>,
  },
]);

export default router;