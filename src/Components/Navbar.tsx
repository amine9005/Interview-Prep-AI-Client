import { ArrowRight, Menu, PencilRuler } from "lucide-react";
import Login from "../Pages/Auth/Login";

const Navbar = () => {
  return (
    <>
      <div className="modal modal-open">
        <Login />
      </div>
      <div className="navbar bg-base-200 w-full px-8 py-5 fixed z-50 border-b border-b-orange-400">
        <div className="mx-2 flex-1 px-2">
          <button className="font-bold font-white text-xl btn btn-ghost hover:text-orange-400">
            <PencilRuler className="text-orange-400 size-10" />
            Interview Prep.AI
          </button>
        </div>
        <div className="hidden flex-none lg:block">
          <ul className="menu menu-horizontal">
            {/* Navbar menu content here */}
            <li>
              <label
                htmlFor="login_modal"
                className="btn btn-outline border-orange-400 py-4 px-8 btn-lg hover:btn-primary"
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
