import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="hero bg-base-200 min-h-screen border-b border-orange-400 ">
      <div className="hero-content text-center text-white">
        <div className="max-w-4xl">
          <div className="flex justify-center  items-center py-4">
            <div className="flex -space-x-2 pr-3">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="image"
                className="size-7 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-1"
              />
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt="image"
                className="size-7 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[2]"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                alt="image"
                className="size-7 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[3]"
              />
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="image"
                className="size-7 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[4]"
              />
            </div>
            <div>
              <div className="rating ">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      type="radio"
                      name="rating-2"
                      disabled
                      defaultChecked
                      className="mask mask-star-2 bg-orange-400 hover:cursor-default"
                      aria-label={`${index + 1} star`}
                      key={index}
                    />
                  ))}
              </div>{" "}
              <p className="text-sm text-gray-300">
                Used by <span className="font-medium text-white">1000+</span>{" "}
                users
              </p>
            </div>
          </div>
          <h1 className="text-2xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.2]">
            {" "}
            Ace Your Next Interview With Our
            <span className="bg-linear-to-r from-orange-700 to-orange-400 text-transparent bg-clip-text">
              {" "}
              Next Gen-AI
            </span>
          </h1>
          <p className="py-6  max-w-[16rem] sm:max-w-lg 2xl:max-w-xl mx-auto max-sm:text-xs text-gray-50">
            Get role-specific questions and answers, expand answers when you
            need them, dive deeper into concepts, and organize everything your
            way from perpetration to mastery. your ultimate interview toolkit is
            here
          </p>
          <Link
            to="/dashboard"
            className="btn btn-primary btn-sm lg:btn-xl py-4 px-20 bg-linear-to-r from-orange-700 to-orange-400 hover:from-orange-600 hover:to-orange-300 duration-100 transition-all hover:scale-105 active:scale-100"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
