import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const HeroSection = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  // Fetch slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await api.get("/hero/");
        setSlides(res.data);
      } catch (err) {
        console.error("Error fetching hero slides:", err);
      }
    };
    fetchSlides();
  }, []);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides]);

  const goToSlide = useCallback((index) => {
    setCurrent(index);
  }, []);

  if (!slides.length) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-6 px-4 h-[450px] md:h-[450px] overflow-hidden mb-10">
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <SlideContent slide={slide} />
          </div>
        );
      })}

      {/* Custom Indicators */}
      <div className="absolute bottom-4 md:bottom-[20px] left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full border-2 transition ${
              index === current
                ? "bg-[#0045FF] border-[#1C49C2]"
                : "bg-[#98FB98] border-[#1C49C2]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Slide content for layouts
const SlideContent = ({ slide }) => {
  const { layout_type, title, description, main_image, subitems } = slide;

  const ShopButton = () => (
    <Link
      to={slide.button_link || "/products"}
      className="bg-[#0045FF] hover:bg-[#1C49C2] text-white px-6 py-2 font-semibold w-[140px] rounded-2xl border border-black"
    >
      {slide.button_text || "Shop Now"}
    </Link>
  );

  // Layout 1: image left, content right
  if (layout_type === "layout1") {
    return (
      <div className="grid md:grid-cols-2 h-full items-stretch relative">
        <div className="h-full w-full">
          <img
            src={main_image}
            alt={title}
            className="w-full h-full object-cover "
          />
        </div>
        <div className="relative flex flex-col justify-center gap-6 h-full p-8 bg-[#98FB98] ">
          {subitems[0] && (
            <img
              src={subitems[0].image}
              alt="sub1"
              className="absolute top-[100px] left-6 w-24 h-24 object-contain"
            />
          )}
          <div className="absolute top-[100px] left-[140px] w-36">
            <h2 className="text-3xl font-bold text-center">{title}</h2>
          </div>
          {subitems[1] && (
            <img
              src={subitems[1].image}
              alt="sub2"
              className="absolute top-[220px] left-[200px] w-8 h-8 object-contain"
            />
          )}
          {subitems[2] && (
            <img
              src={subitems[2].image}
              alt="sub2"
              className="absolute top-[200px] left-[350px] w-20 h-20 object-contain"
            />
          )}
          <div className="absolute top-[250px] left-[140px] w-36">
            <p className="text-black text-center mb-10 font-semibold">{description}</p>

              <ShopButton/>
          </div>
         
      
        </div>
          
      </div>
    );
  }

  // Layout 2: list of subitems
  if (layout_type === "layout2") {
    return (
      <div className="grid md:grid-cols-2 h-full items-stretch relative">
        {/* Left Image */}
        <div className="h-full w-full">
          <img
            src={main_image}
            alt={title}
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Right Content */}
        <div className="relative flex flex-col justify-center gap-4 h-full p-8 bg-[#98FB98] rounded-r-xl">


          
          {/* Title */}

          {/* Paragraphs individually with different colors */}
          {subitems[0] && (
            <div className="px-4 py-4 bg-persianblue mb-8">
              <p className="text-white font-semibold text-center">{subitems[0].text}</p>
            </div>
          )}
          {subitems[1] && (
            <div className="px-8 py-7 bg-black/75 w-[320px] mx-auto rounded-[45px]">
              <p className="text-white font-semibold">{subitems[1].text}</p>
            </div>
          )}

          {/* Shop Button */}
          <ShopButton />
        </div>
      </div>
    );
  }

  // Layout 3: content left, image right
  if (layout_type === "layout3") {
    return (
      <div className="grid md:grid-cols-2 h-full items-stretch relative">
        <div className="relative flex flex-col justify-center gap-6 h-full p-8 bg-[#98FB98] rounded-l-xl">
          {subitems
            .filter((item) => item.shape === "diamond")
            .map((item) => (
              <div
                key={item.id}
                className="w-28 h-28 bg-[#C90629] flex items-center justify-center transform rotate-45 mb-2 mx-auto"
              >
                <p className="transform -rotate-45 text-center text-sm text-white font-semibold">
                  {" "}
                  {item.title || item.text || "No Title"}{" "}
                </p>
              </div>
            ))}
          <div className="flex gap-2 flex-wrap mb-2 mx-auto">
            {subitems
              .filter((item) => item.shape === "rectangle")
              .map((item) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt="rect"
                  className="w-28 h-20 object-cover rounded-lg"
                />
              ))}
          </div>

          <ShopButton />
        </div>

        <div className="h-full w-full">
          <img
            src={main_image}
            alt={title}
            className="w-full h-full object-cover rounded-r-xl"
          />
        </div>
      </div>
    );
  }

  return null;
};

export default HeroSection;
