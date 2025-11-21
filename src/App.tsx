import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Dashboard from "./Pages/Dashboard";
import InterviewPrep from "./Pages/InterviewPrep/InterviewPrep";
import Layout from "./Layout";
import { useSelector, useDispatch } from "react-redux";
import { setAuthModal } from "./redux/authSlice";
import { type RootState } from "./redux/store";

function App() {
  const authModalState = useSelector((state: RootState) =>
    state.auth.modalState.toString()
  );

  const dispatch = useDispatch();

  const dispatchCloseModal = () => {
    dispatch(setAuthModal("Closed"));
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
      <div data-theme="Dark-and-Orange" className="bg-base-200">
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/Interview-prep/:session_id"
            element={<InterviewPrep />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
