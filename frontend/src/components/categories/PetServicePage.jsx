import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const PetServicePage = () => {
  const [hero, setHero] = useState(null);
  const [section, setSection] = useState(null);
  const [specials, setSpecials] = useState([]);

  // Fetch all data from backend
  useEffect(() => {
    api.get("/petservice/hero/").then((res) => {
      if (res.data.length > 0) setHero(res.data[0]);
    });

    api.get("/petservice/section/").then((res) => {
      if (res.data.length > 0) setSection(res.data[0]);
    });

    api.get("/petservice/specials/").then((res) => setSpecials(res.data));
  }, []);

  return (
    <main className="petservice-page">
      {/* ---------------- HERO SECTION ---------------- */}
      {hero && (
        <section className="petservice-hero relative w-full flex flex-col items-center justify-center">
          {/* Left + Right Images */}
          <div className="flex w-full relative">
            <img
              src={hero.left_image}
              alt="Left"
              className="w-1/2 h-[300px] md:h-[400px] object-cover"
            />
            <img
              src={hero.right_image}
              alt="Right"
              className="w-1/2 h-[300px] md:h-[400px] object-cover"
            />
          </div>

          {/* Center overlay circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-[#0045FF] rounded-full w-40 h-40 md:w-56 md:h-56 text-center text-white">
            <img src={hero.logo} alt="Logo" className="w-20 md:w-28 mb-2" />
     
            {hero.subtitle && <p className="text-xs md:text-sm">{hero.subtitle}</p>}
          </div>

          {/* Bottom 6 items */}
          <div className="absolute -bottom-16 bg-white rounded-2xl shadow-md p-4 flex flex-wrap md:flex-nowrap justify-center gap-4">
            {hero.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center bg-[#98FB98] rounded-xl px-4 py-3 w-24 md:w-32"
              >
                <img src={item.icon} alt={item.label} className="w-8 h-8 mb-2" />
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- PET SERVICES SECTION ---------------- */}
 {section && (
  <section className="petservice-services container mx-auto px-0 py-24">
    {/* Title + Customer Service */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 px-4">
      <div className="mb-6 md:mb-0 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{section.title}</h2>
        <p className="text-black">{section.description}</p>
      </div>
      <div className="text-right">
        <p className="text-[#0045FF]">{section.customer_service_text}</p>
        <p className="text-[#0045FF] font-bold">{section.phone_number}</p>
      </div>
    </div>

    {/* 3 Column Layout */}
    <div className="flex flex-col md:flex-row w-full">
      {section.columns.map((col, index) => {
        // Column background & text
        let bgColor = "#FFFFFF";        // default
        let textColor = "text-black";   // default text
        let buttonBg = "#1C49C2";       // default button
        let buttonTextColor = "text-white";
        let buttonClass = "px-4 py-2";

        if (index === 0) {
          bgColor = "#0045FF";          // first column bg
          textColor = "text-white";     // first column text
          buttonBg = "#FFFFFF";         // first column button bg
          buttonTextColor = "text-[#0045FF]"; // button text
          buttonClass = "px-6 py-2";    // smaller width
        }

        if (index === 2) {
          bgColor = "#98FB98";          // third column bg
          buttonClass = "px-6 py-2 rounded-2xl"; // reduced width + rounded
        }

        return (
          <div
            key={col.id}
            style={{ backgroundColor: bgColor }}
            className="flex-1 flex flex-col justify-between"
          >
            {col.image ? (
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`flex flex-col justify-between h-full w-full items-center text-center p-6 ${textColor}`}>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{col.title}</h3>
                  <p className="mb-4">{col.description}</p>
                </div>
                {col.button_text && (
                  <Link
                    to={col.button_link || "#"}
                    style={{ backgroundColor: buttonBg }}
                    className={`${buttonTextColor} ${buttonClass} mx-auto hover:opacity-90 transition`}
                  >
                    {col.button_text}
                  </Link>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </section>
)}



      {/* ---------------- SPECIALS SECTION ---------------- */}
      {specials.length > 0 && (
  <section className="petservice-specials container mx-auto px-4 py-20">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {specials.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-black shadow-sm p-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-black mb-4">{item.description}</p>
          </div>

          {/* Button */}
          <Link
            to={item.button_link}
            className="mx-auto bg-[#1C49C2] text-white px-4 py-2 hover:bg-[#0045FF] transition text-sm font-medium"
          >
            {item.button_text}
          </Link>
        </div>
      ))}
    </div>
  </section>
)}

    </main>
  );
};

export default PetServicePage;
