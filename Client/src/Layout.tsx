import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import LandingPage from "./Pages/LandingPage";

const Layout = () => {
  return (
    <div className="drawer">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <Navbar />
        {/* Page content here */}
        <LandingPage />
      </div>
      {/* SideBar */}
      <Sidebar />
    </div>
  );
};

export default Layout;
