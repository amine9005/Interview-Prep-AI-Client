const Hero = () => {
  return (
    <div className="hero flex flex-col justify-center text-sm px-4 min-h-screen  text-white">
      <div className="hero-content items-center mt-44">
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
            <input
              type="radio"
              name="rating-2"
              disabled
              className="mask mask-star-2 bg-orange-400 hover:cursor-default"
              aria-label="1 star"
            />
            <input
              type="radio"
              name="rating-2"
              disabled
              className="mask mask-star-2 bg-orange-400 hover:cursor-default"
              aria-label="2 star"
            />
            <input
              type="radio"
              name="rating-2"
              disabled
              className="mask mask-star-2 bg-orange-400 hover:cursor-default"
              aria-label="3 star"
            />
            <input
              type="radio"
              name="rating-2"
              disabled
              className="mask mask-star-2 bg-orange-400 hover:cursor-default"
              aria-label="4 star"
            />
            <input
              type="radio"
              name="rating-2"
              disabled
              className="mask mask-star-2 bg-orange-400 hover:cursor-default"
              aria-label="5 star"
              defaultChecked
            />
          </div>{" "}
          <p className="text-sm text-gray-300">
            Used by <span className="font-medium text-white">1000+</span> users
          </p>
        </div>
      </div>
      <h1 className="text-5xl leading-[68px] md:text-6xl md:leading-[84px] font-medium max-w-3xl text-center">
        Ace Your Next Interview With Our
        <span className="text-orange-400 "> Next Gen-AI</span>
      </h1>
      <p className="text-base text-center text-slate-200 max-w-lg">
        Get role-specific questions and answers, expand answers when you need
        them, dive deeper into concepts, and organize everything your way from
        perpetration to mastery. your ultimate interview toolkit is here
      </p>
      <div className="flex items-center gap-4 mt-8">
        <button className="btn btn-primary btn-xl py-4 px-20 hover:bg-base-200 hover:border-orange-400 ">
          Get Started
        </button>
        {/* <button className="flex items-center gap-2 border border-purple-900 hover:bg-purple-950/50 transition rounded-full px-6 h-11">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-video-icon lucide-video"
          >
            <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
            <rect x="2" y="6" width="14" height="12" rx="2" />
          </svg>
          <span>Watch demo</span>
        </button> */}
      </div>
      {/* <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/hero-section-showcase-2.png"
        className="w-full rounded-[15px] max-w-4xl mt-16"
        alt="hero section showcase"
      /> */}
    </div>
  );
};

export default Hero;
