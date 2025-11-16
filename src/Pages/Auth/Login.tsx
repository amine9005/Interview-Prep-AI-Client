import { Eye, KeySquare, LucideEyeOff, Mail } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handelSubmit = () => {};

  return (
    // <div className="modal modal-open ">
    <div className="card bg-base-100  shadow-2xl p-5 shadow-orange-400">
      <div className="card-title text-lg items-center justify-center pt-4">
        Login
      </div>
      <div className="card-body">
        <form className="form fieldset space-y-2 gap-2" onSubmit={handelSubmit}>
          <label className="input  min-w-md input-md">
            <Mail />
            <input
              type="email"
              required
              className="grow"
              placeholder="Email address"
            />
          </label>
          <label className="input min-w-md input-md">
            <KeySquare />
            <input
              type={showPassword ? "text" : "password"}
              required
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

          <label className="label">
            <span className="text-gray-300 font-medium">Remember me</span>
            <input type="checkbox" defaultChecked className="checkbox" />
          </label>

          <button className="btn btn-neutral mt-4">Login</button>
          <div className="flex items-center justify-center  gap-2">
            <span>Don't have account ? </span>
            <a className="link link-hover text-orange-400 font-semibold">
              {"SignUp Now"}
            </a>
          </div>
          <label className="label items-center justify-center">
            <a className="label-text-alt text-gray-300 font-medium link link-hover">
              Forgot password?
            </a>
          </label>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default Login;
