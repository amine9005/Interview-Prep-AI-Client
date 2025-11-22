import { Eye, KeySquare, Loader2, LucideEyeOff, Mail, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setAuthModal, setUser } from "../../redux/authSlice";
import api from "../../api/api";
import toast from "react-hot-toast";
import { apiPaths } from "../../utils/apiPaths";
import { useNavigate } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await api.post(apiPaths.AUTH.LOGIN, {
        email,
        password,
      });

      console.log(response);

      const { success } = response.data;

      if (success) {
        dispatch(setUser(response.data));
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage("Email or password is incorrect");

      console.log(error);
    }

    setLoading(false);
  };

  const dispatch = useDispatch();

  const dispatchSignUpModal = () => {
    dispatch(setAuthModal("SignUp"));
  };

  const dispatchCloseModal = () => {
    dispatch(setAuthModal("Closed"));
  };

  return (
    // <div className="modal modal-open ">
    <div className="card w-xs md:w-xl bg-slate-800 absolute shadow-2xl p-2 md:px-8 md:py-4 shadow-slate-400">
      <div className="flex flex-wrap justify-end pt-1">
        <X
          className="size-6 text-gray-50 hover:cursor-pointer hover:text-red-500 "
          onClick={dispatchCloseModal}
        />
      </div>
      <div className="card-title text-xl items-center justify-center pt-4 text-gray-50">
        Login
      </div>
      <div className="card-body p-2">
        <form
          className="form fieldset space-y-2 gap-2"
          onSubmit={(e) => handelSubmit(e)}
        >
          <label className="input w-full input-md">
            <Mail />
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="grow"
              placeholder="Email address"
            />
          </label>
          <label className="input w-full input-md">
            <KeySquare />
            <input
              type={showPassword ? "text" : "password"}
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="grow"
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

          <label className="label ">
            <span className="text-red-500">{errorMessage}</span>
          </label>

          <label className="label pl-2">
            <span className="text-gray-300 font-medium">Remember me</span>
            <input
              type="checkbox"
              className="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </label>

          <button
            className="btn bg-linear-to-r from-orange-700 to-orange-400 mt-4"
            disabled={loading}
          >
            {loading ? <Loader2 className="size-5 animate-spin" /> : "Login"}
          </button>
          <div className="flex items-center justify-center  gap-2">
            <span>Don't have account ? </span>
            <a
              onClick={dispatchSignUpModal}
              className="link link-hover text-orange-400 font-semibold"
            >
              {"SignUp Now"}
            </a>
          </div>
          {/* <label className="label items-center justify-center">
            <a className="label-text-alt text-gray-300 font-medium link link-hover">
              Forgot password?
            </a>
          </label> */}
        </form>
      </div>
    </div>
    // </div>
  );
};

export default Login;
