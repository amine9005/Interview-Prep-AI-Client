import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Dashboard from "./Pages/Home/Dashboard";
import InterviewPrep from "./Pages/InterviewPrep/InterviewPrep";
import Layout from "./Layout";

function App() {
  return (
    <div
      data-theme="Dark-and-Orange"
      className="bg-base-200 min-h-screen min-w-screen "
    >
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Interview-prep/:session_id" element={<InterviewPrep />} />
      </Routes>
    </div>
  );
}

export default App;
