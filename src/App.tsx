import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Dashboard from "./Pages/Dashboard";
import InterviewPrep from "./Pages/InterviewPrep/InterviewPrep";
import { useSelector, useDispatch } from "react-redux";
import { setAuthModal } from "./redux/authSlice";
import { type RootState } from "./redux/store";
import CreateSession from "./Pages/InterviewPrep/CreateSession";
import LandingPage from "./Pages/LandingPage";
import NavItems from "./Components/NavItems";
import { toggleSidebar } from "./redux/sidebarSlice";
import Explanation from "./Pages/AI/Explanation";
import ProtectedRoutes from "./Pages/Auth/ProtectedRoutes";

function App() {
  const authModalState = useSelector((state: RootState) =>
    state.auth.modalState.toString()
  );
  const isSideBarOpen = useSelector(
    (state: RootState) => state.sidebar.sidebarOpen
  );

  const explanationOpen = useSelector(
    (state: RootState) => state.sidebar.explanationOpen
  );

  const dispatch = useDispatch();

  const dispatchCloseModal = () => {
    dispatch(setAuthModal("Closed"));
  };

  const toggleSidebarDispatch = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      <div
        className={
          authModalState === "SignUp"
            ? "modal modal-open transition duration-0"
            : "modal transition duration-0"
        }
      >
        <SignUp />
        <label
          className="modal-backdrop w-screen h-screen"
          onClick={dispatchCloseModal}
        ></label>
      </div>
      <div
        className={
          authModalState === "Login"
            ? "modal modal-open transition duration-0"
            : "modal transition duration-0"
        }
      >
        <Login />
        <label
          className="modal-backdrop w-screen h-screen"
          onClick={dispatchCloseModal}
        ></label>
      </div>

      <div
        className={
          authModalState === "CreateSession"
            ? "modal modal-open transition duration-0"
            : "modal transition duration-0"
        }
      >
        <CreateSession />
        <label
          className="modal-backdrop w-screen h-screen"
          onClick={dispatchCloseModal}
        ></label>
      </div>

      <div data-theme="Dark-and-Orange" className="bg-base-200">
        <Toaster />

        <div className="drawer">
          <input
            checked={isSideBarOpen}
            readOnly
            id="sidebar"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            {/* Page content here */}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/Interview-prep/:id" element={<InterviewPrep />} />
              </Route>
            </Routes>
          </div>
          <div className="drawer-side absolute z-20">
            <label
              onClick={() => toggleSidebarDispatch()}
              htmlFor="sidebar"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            {explanationOpen ? <Explanation /> : <NavItems />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
