import {
  Eye,
  KeySquare,
  Loader2,
  LucideEyeOff,
  Mail,
  User2,
  X,
} from "lucide-react";
import { useState, useRef, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setAuthModal, setUser } from "../../redux/authSlice";
import { apiPaths } from "../../utils/apiPaths";
import { useNavigate } from "react-router";
import api from "../../api/api";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingImg, setLoadingImg] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");

  const inputFile = useRef<HTMLInputElement>(null);
  const form = new FormData();

  const handle_click = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const handle_image_upload = async (e: File) => {
    setLoadingImg(true);

    try {
      form.append("image", e);

      const res = await api.post(apiPaths.IMAGE.UPLOAD, form);

      console.log("res: ", res);

      const { success, image } = res.data;
      if (success) {
        setImgUrl(image);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingImg(false);
  };
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

    if (password !== confirmPassword) {
      setErrorMessage("passwords don't match");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(apiPaths.AUTH.REGISTER, {
        username,
        email,
        password,
        profileImageURL: imgUrl,
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
    <div className="card w-xs md:w-xl bg-base-100 absolute shadow-2xl p-2 shadow-orange-400">
      <div className="flex flex-wrap justify-end ">
        <X
          className="size-6 text-gray-50 hover:cursor-pointer hover:text-red-500 "
          onClick={dispatchCloseModal}
        />
      </div>
      <div className="card-title text-xl items-center justify-center pt-4 text-gray-50">
        SignUp
      </div>
      {/* User Image */}
      <div className="flex flex-wrap justify-center items-center mt-4 ">
        <input
          onChange={(e) => {
            if (e.target.files) {
              handle_image_upload(e.target.files[0]);
            }
          }}
          type="file"
          accept="/image"
          className="hidden"
          ref={inputFile}
        />
        <div
          className={`rounded-full cursor-pointer ${
            loadingImg ? "" : "border border-white p-px"
          }`}
          onClick={handle_click}
        >
          {" "}
          {loadingImg ? (
            <div className="indicator">
              <span className="indicator-item indicator-bottom badge badge-secondary"></span>
              <div className="bg-base-300 grid h-32 w-32 place-items-center">
                <Loader2 className="animate-spin w-15" />
              </div>
            </div>
          ) : imgUrl ? (
            <img
              src={imgUrl}
              alt="profile image"
              className="size-15 object-cover rounded-full"
            ></img>
          ) : (
            <div className="indicator flex flex-wrap justify-center">
              <span className="indicator-item indicator-bottom rounded-full bg-green-400 p-2 mr-2 mb-2">
                {" "}
              </span>
              <User2 className="size-15 text-white "></User2>
            </div>
          )}
        </div>
      </div>
      {/* SignUp Form */}
      <div className="card-body p-1 mt-2">
        <form
          className="fieldset form space-y-2 gap-2 p-1"
          onSubmit={(e) => handelSubmit(e)}
        >
          <label className="input  w-full input-md">
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
          <label className="input w-full input-md">
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
          <label className="input w-full input-md">
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
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </label>

          <label className="input w-full input-md">
            <KeySquare />
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          <label className="text-red-500 pl-3 p-1">{errorMessage}</label>
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
