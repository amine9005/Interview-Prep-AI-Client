import {
  Eye,
  KeySquare,
  Loader2,
  LucideEyeOff,
  Mail,
  User2,
  X,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setAuthModal, setUser } from "../../redux/authSlice";
import { apiPaths } from "../../utils/apiPaths";
import { useNavigate } from "react-router";
import api from "../../api/api";
import UploadImage from "../../Components/User/UploadImage";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const dispatchLoginModal = () => {
    dispatch(setAuthModal("Login"));
  };

  const dispatchCloseModal = () => {
    dispatch(setAuthModal("Closed"));
  };

  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post(apiPaths.AUTH.REGISTER, {
        username,
        email,
        password,
        profileImageURL: "",
      });

      console.log(res);

      const { success } = res.data;
      if (success) {
        dispatch(setUser(res.data));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    // <div className="modal modal-open ">
    <div className="card bg-base-100 absolute shadow-2xl p-5 shadow-orange-400">
      <div className="flex flex-wrap justify-end ">
        <X
          className="size-6 text-gray-50 hover:cursor-pointer hover:text-red-500 "
          onClick={dispatchCloseModal}
        />
      </div>
      <div className="card-title text-xl items-center justify-center pt-4 text-gray-50">
        SignUp
      </div>
      <UploadImage />
      <div className="card-body">
        <form
          className="fieldset form space-y-2 gap-2"
          onSubmit={(e) => handelSubmit(e)}
        >
          <label className="input  min-w-md input-md">
            <User2 />
            <input
              type="text"
              className="grow"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Full Name"
            />
          </label>
          <label className="input  min-w-md input-md">
            <Mail />
            <input
              type="email"
              className="grow"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </label>
          <label className="input min-w-md input-md">
            <KeySquare />
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {showPassword ? (
              <Eye
                className="cursor-pointer text-orange-400"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <LucideEyeOff
                className="cursor-pointer "
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </label>

          <label className="input min-w-md input-md">
            <KeySquare />
            <input
              type={showPassword ? "text" : "password confirm"}
              className="grow"
              required
              placeholder="Confirm Password"
            />
            {showPassword ? (
              <Eye
                className="cursor-pointer text-orange-400"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <LucideEyeOff
                className="cursor-pointer "
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </label>

          <button className="btn btn-neutral mt-4">
            {loading ? (
              <Loader2 className="animate-spin size-5"></Loader2>
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="flex items-center justify-center  gap-2">
            <span>Have account ? </span>
            <a
              onClick={dispatchLoginModal}
              className="link link-hover text-orange-400 font-semibold"
            >
              {"Login Now"}
            </a>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default SignUp;
