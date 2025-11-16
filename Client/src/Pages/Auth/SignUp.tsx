import { Eye, KeySquare, LucideEyeOff, Mail, User2 } from "lucide-react";
import { useState } from "react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    // <div className="modal modal-open ">
    <div className="card bg-base-100  shadow-2xl p-5 shadow-orange-400">
      <div className="card-title text-lg items-center justify-center pt-4">
        SignUp
      </div>
      <div className="card-body">
        <fieldset className="fieldset space-y-2 gap-2">
          <label className="input  min-w-md input-md">
            <User2 />
            <input type="text" className="grow" placeholder="Full Name" />
          </label>
          <label className="input  min-w-md input-md">
            <Mail />
            <input type="email" className="grow" placeholder="Email address" />
          </label>
          <label className="input min-w-md input-md">
            <KeySquare />
            <input
              type={showPassword ? "text" : "password"}
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

          <label className="input min-w-md input-md">
            <KeySquare />
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
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

          <button className="btn btn-neutral mt-4">SignUp</button>
          <div className="flex items-center justify-center  gap-2">
            <span>Have account ? </span>
            <a className="link link-hover text-orange-400 font-semibold">
              {"Login Now"}
            </a>
          </div>
        </fieldset>
      </div>
    </div>
    // </div>
  );
};

export default SignUp;
