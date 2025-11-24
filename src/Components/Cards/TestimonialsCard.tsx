import React from "react";
import { TESTIMONIALS } from "../../utils/utils";

const TestimonialsCard = ({
  index,
  content,
}: {
  index: number;
  content: (typeof TESTIMONIALS)[0];
}) => {
  const [visible, setVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const divRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = divRef.current!.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="relative w-80 h-96 rounded-xl p-px bg-slate-800 backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer"
    >
      <div
        className={`pointer-events-none blur-3xl rounded-full bg-linear-to-r from-orange-500 via-yellow-300 to-amber-100 size-60 absolute z-0 transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ top: position.y - 120, left: position.x - 120 }}
      />

      <div className="relative z-10 bg-gray-900/75 p-6 h-full w-full rounded-[11px] flex flex-col items-center justify-center text-center">
        <img
          src={content.img}
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full shadow-md my-4"
        />
        <h2 className="text-2xl font-bold text-white mb-1">{content.name}</h2>
        <div key={index} className="rating ">
          {Array(content.rating)
            .fill(0)
            .map((_, index) => (
              <input
                type="radio"
                disabled
                defaultChecked
                className="mask mask-star-2 bg-orange-400 hover:cursor-default"
                aria-label={`${index + 1} star`}
                key={index}
              />
            ))}
        </div>
        <p className="text-sm text-slate-400 mt-4 mb-4 px-4">
          {content.review}
        </p>
      </div>
    </div>
  );
};

export default TestimonialsCard;
