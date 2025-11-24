import { TESTIMONIALS } from "../utils/utils";
import TestimonialsCard from "./Cards/TestimonialsCard";

const Testimonials = () => {
  return (
    <div className="min-h-screen p-4">
      <div className="w-full space-y-4">
        <div className="text-center">
          <h2 className="text-white text-[42px] text-semiBold">Love By Many</h2>
          <p className="text-gray-50 max-w-lg mx-auto py-4">
            Don't just take our word for it. Here's what our users are saying..{" "}
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 mt-10">
          {TESTIMONIALS.map((content, index) => (
            <TestimonialsCard key={index} index={index} content={content} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
