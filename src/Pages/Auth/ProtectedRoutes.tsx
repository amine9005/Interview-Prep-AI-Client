import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { setAuthModal } from "../../redux/authSlice";
import LandingPage from "../LandingPage";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch_login = () => {
    dispatch(setAuthModal("Login"));
  };

  if (!user) {
    dispatch_login();
    return <LandingPage />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
