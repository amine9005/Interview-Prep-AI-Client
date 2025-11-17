import { ArrowRight, Menu, PencilRuler } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAuthModal } from "../redux/modalSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const dispatchOpenModal = () => {
    console.log("despatching open modal");
    dispatch(setAuthModal("Login"));
  };
  return (
    <>
      <div className="navbar bg-base-200 w-full px-8 py-5 fixed z-50 border-b border-b-orange-400">
        <div className="mx-2 flex-1 px-2">
          <button className="font-bold font-white text-xl btn btn-ghost ">
            <PencilRuler className="text-orange-500 size-10" />
            <span className="hover:bg-linear-to-r bg-white hover:from-orange-700 hover:to-orange-400 duration-300 transition-all text-transparent bg-clip-text">
              Interview Prep.AI
            </span>
          </button>
        </div>
        <div className="hidden flex-none lg:block">
          <ul className="menu menu-horizontal">
            {/* Navbar menu content here */}
            <li>
              <label
                htmlFor="login_modal"
                onClick={dispatchOpenModal}
                className="btn btn-outline border-orange-400 py-4 px-8 btn-lg hover:bg-linear-to-r hover:from-orange-700 hover:to-orange-400 duration-300 transition-all active:scale-95"
              >
                Login/Signup
                <ArrowRight />
              </label>
            </li>
          </ul>
        </div>
        <div className="flex-none lg:hidden">
          <label
            htmlFor="my-drawer-2"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <Menu className="size-10" />
          </label>
        </div>
      </div>
    </>
  );
};

export default Navbar;
