import { Eye, KeySquare, LucideEyeOff, Mail, User2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setAuthModal } from "../../redux/modalSlice";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const dispatch = useDispatch();

  const dispatchLoginModal = () => {
    dispatch(setAuthModal("Login"));
  };

  return (
    // <div className="modal modal-open ">
    <div className="card bg-base-100 absolute shadow-2xl p-5 shadow-orange-400">
      <div className="card-title text-lg items-center justify-center pt-4">
        SignUp
      </div>
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
              placeholder="Full Name"
            />
          </label>
          <label className="input  min-w-md input-md">
            <Mail />
            <input
              type="email"
              className="grow"
              required
              placeholder="Email address"
            />
          </label>
          <label className="input min-w-md input-md">
            <KeySquare />
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              required
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

          <button className="btn btn-neutral mt-4">SignUp</button>
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
