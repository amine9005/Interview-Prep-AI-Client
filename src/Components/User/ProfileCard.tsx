import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { Logout } from "../../redux/authSlice";
import { useNavigate } from "react-router";
import { User2 } from "lucide-react";

const ProfileCard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dispatchLogout = () => {
    dispatch(Logout());
    navigate("/");
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mx-auto">
      {user?.profileImageURL ? (
        <img
          src={user?.profileImageURL}
          alt="profile image"
          className="size-10 rounded-full"
        />
      ) : (
        <User2 className="size-10 rounded-full" />
      )}

      <div className="block">
        <p className="text-white text-md font-bold">{user?.username}</p>
        <p
          className=" link link-hover text-orange-400 text-sm font-bold"
          onClick={() => dispatchLogout()}
        >
          logout
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
