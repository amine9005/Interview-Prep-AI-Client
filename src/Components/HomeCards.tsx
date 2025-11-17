import { APP_FEATURES } from "../utils/utils";

const HomeCards = () => {
  return (
    <div className="hero min-h-screen p-4">
      <div className="hero-content text-center">
        <div className="max-w-svw">
          <div className="text-center">
            <h2 className="text-white text-[42px] text-semiBold">
              Be Ready For Anything
            </h2>
            <p className="text-slate-200 max-w-lg mx-auto py-4">
              Everything you need to Learn, Organize and enhance your skills
              with cutting edge technology.{" "}
            </p>
          </div>

          <div className="flex flex-wrap justify-center mt-10">
            {APP_FEATURES.map((feature, index) => (
              <div
                className="w-full lg:w-xl bg-base-200 shadow-xl m-3 hover:-translate-y-2 transition  border-2 border-orange-400 rounded-2xl "
                key={index}
              >
                <div className="card-body text-center justify-center items-center">
                  {/* <feature.Icon
                className="w-12 h-12 p-3 text-white rounded-xl"
                style={{
                  background: `linear-gradient(to bottom, ${feature.bg.from}, ${feature.bg.to})`,
                }}
              /> */}
                  <h2 className="card-title ">{feature.title}</h2>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
