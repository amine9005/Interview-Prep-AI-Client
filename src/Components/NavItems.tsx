import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/sidebarSlice";
import { Logout } from "../redux/authSlice";

const NavItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const to_Dashboard = () => {
    navigate("/dashboard");
    dispatch(toggleSidebar());
  };

  const logout = () => {
    navigate("/");
    dispatch(toggleSidebar());

    dispatch(Logout());
  };

  return (
    <ul className="menu bg-base-200 min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li>
        <span onClick={to_Dashboard} className="p-4">
          Dashboard
        </span>
      </li>
      <li>
        <span onClick={logout} className="p-4">
          Logout
        </span>
      </li>
    </ul>
  );
};

export default NavItems;
