// import Hero_IMG from "../assets/hero_img.png";
import Hero from "../Components/Hero";
import HomeCards from "../Components/HomeCards";
import Footer from "../Components/Footer";
import Testimonials from "../Components/Testimonials";
// import Preview from "../Components/Preview";

const LandingPage = () => {
  return (
    <>
      <Hero />
      {/* <Preview /> */}
      <HomeCards />
      <Testimonials />
      <Footer />
    </>
  );
};

export default LandingPage;
