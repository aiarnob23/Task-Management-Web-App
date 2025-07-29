import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const MainLayout = () => {
  return (
    <div>
      <Header />
     <div className="">
       <Outlet />
     </div>
    </div>
  );
};

export default MainLayout;
