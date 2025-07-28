import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/home/Home";
import NotFound from "../pages/not-found/NotFound";
import Login from "../pages/auth/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path:"/auth/login",
    element:<Login/>,

  },

  {
    path:"*",
    element:<NotFound/>,
  },
]);

export default router;