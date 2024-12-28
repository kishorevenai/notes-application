import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full h-screen border border-black">
      <Outlet />
    </div>
  );
};

export default Layout;
