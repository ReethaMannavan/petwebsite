// import { useState, useEffect } from "react";
// import api from "../../api/api";

// const HomepageSections = () => {
//   const [promo, setPromo] = useState(null);
//   const [deal, setDeal] = useState(null);
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     // Fetch Section 1
//     api.get("homepage-promo/")
//       .then((res) => setPromo(res.data[0]))
//       .catch((err) => console.error(err));

//     // Fetch Section 2
//     api.get("homepage-deal/")
//       .then((res) => setDeal(res.data[0]))
//       .catch((err) => console.error(err));

//     // Fetch Section 3
//     api.get("homepage-services/")
//       .then((res) => setServices(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="homepage-sections space-y-12 mb-14">

//       {/* 🔹 Section 1: Promo */}
//       {promo && (
//         <section className="homepage-promo grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden m-5">
//           {/* Left Column */}
//           <div className="bg-[#1C49C2] text-white p-8 flex flex-col justify-center">
//             <h2 className="text-2xl md:text-3xl font-bold mb-4">{promo.title}</h2>
//             <p className="mb-6 text-base md:text-lg">{promo.description}</p>
//             <a
//               href={promo.button_link}
//               className="bg-white text-[#1C49C2] font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition w-fit"
//             >
//               {promo.button_text}
//             </a>
//           </div>

//           {/* Right Column */}
//           <div className="relative flex items-center justify-center">
//             <img
//               src={promo.image}
//               alt="Promo"
//               className="w-full h-full object-cover"
//             />
//             {/* Circular Discount Badge */}
//             <div className="absolute top-[200px] left-[-60px] bg-white text-[#1C49C2] rounded-full w-28 h-28 flex items-center justify-center shadow-md">
//               <span className="font-bold text-center text-sm">{promo.discount_text}</span>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* 🔹 Section 2: Deal */}
//       {deal && (
//         <section className="homepage-deal bg-[#98FB98] rounded-xl p-6 md:p-10 m-5">
//           <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
//             {/* Description */}
//             <div className="md:w-[45%]">
//               <p className="text-lg font-semibold">{deal.description}</p>
//             </div>

//             {/* Image */}
//             <div className="md:w-[30%] flex justify-center">
//               <img
//                 src={deal.image}
//                 alt="Deal"
//                 className="max-h-40 object-contain"
//               />
//             </div>

//             {/* Button */}
//             <div className="md:w-[25%] flex justify-center">
//               <a
//                 href={deal.button_link}
//                 className="bg-[#1C49C2] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#0045FF] transition border border-black"
//               >
//                 {deal.button_text}
//               </a>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* 🔹 Section 3: Services */}
//       <section className="homepage-services text-center mb-10 m-5">
//   <h2 className="text-2xl md:text-3xl font-bold mb-2">Pet Services</h2>
//   <p className="text-black mb-8">
//     Treats Rewards members earn points on every service
//   </p>

//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//     {services.map((service) => (
//       <div key={service.id} className="flex flex-col">
//         {/* Card (image + title) */}
//         <div className="bg-[#1C49C2] text-white shadow-md rounded-2xl overflow-hidden flex flex-col items-center">
//           <img
//             src={service.image}
//             alt={service.title}
//             className="w-full h-40 object-cover"
//           />
//           <h3 className="text-lg font-semibold py-3 w-full text-center">
//             {service.title}
//           </h3>
//         </div>

//         {/* Description outside card */}
//         <p className="text-black text-sm mt-3">{service.description}</p>
//       </div>
//     ))}
//   </div>
// </section>

//     </div>
//   );
// };

// export default HomepageSections;


import { useState, useEffect } from "react";
import api from "../../api/api";

const HomepageSections = () => {
  const [promo, setPromo] = useState(null);
  const [deal, setDeal] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch Section 1
    api.get("homepage-promo/")
      .then((res) => setPromo(res.data[0]))
      .catch((err) => console.error(err));

    // Fetch Section 2
    api.get("homepage-deal/")
      .then((res) => setDeal(res.data[0]))
      .catch((err) => console.error(err));

    // Fetch Section 3
    api.get("homepage-services/")
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="homepage-sections space-y-12 mb-14">

      {/* 🔹 Section 1: Promo */}
      {promo && (
        <section className="homepage-promo grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden m-5">
          {/* Left Column */}
          <div className="bg-[#1C49C2] text-white p-8 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{promo.title}</h2>
            <p className="mb-6 text-base md:text-lg">{promo.description}</p>
            <a
              href={promo.button_link}
              className="bg-white text-[#1C49C2] font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition w-fit"
            >
              {promo.button_text}
            </a>
          </div>

          {/* Right Column */}
          <div className="relative flex items-center justify-center">
            <img
              src={promo.image}
              alt="Promo"
              className="w-full h-full object-cover"
            />
            {/* Circular Discount Badge */}
            <div className="absolute top-[200px] left-[-60px] bg-white text-[#1C49C2] rounded-full w-28 h-28 flex items-center justify-center shadow-md">
              <span className="font-bold text-center text-sm">{promo.discount_text}</span>
            </div>
          </div>
        </section>
      )}

      {/* 🔹 Section 2: Deal */}
      {deal && (
        <section className="homepage-deal bg-[#98FB98] rounded-xl p-6 md:p-10 m-5">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
            {/* Description */}
            <div className="md:w-[45%]">
              <p className="text-lg font-semibold">{deal.description}</p>
            </div>

            {/* Image */}
            <div className="md:w-[30%] flex justify-center">
              <img
                src={deal.image}
                alt="Deal"
                className="max-h-40 object-contain"
              />
            </div>

            {/* Button */}
            <div className="md:w-[25%] flex justify-center">
              <a
                href={deal.button_link}
                className="bg-[#1C49C2] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#0045FF] transition border border-black"
              >
                {deal.button_text}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 🔹 Section 3: Services */}
      <section className="homepage-services text-center mb-10 m-5">
  <h2 className="text-2xl md:text-3xl font-bold mb-2">Pet Services</h2>
  <p className="text-black mb-8">
    Treats Rewards members earn points on every service
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {services.map((service) => (
      <div key={service.id} className="flex flex-col">
        {/* Card (image + title) */}
        <div className="bg-[#1C49C2] text-white shadow-md rounded-2xl overflow-hidden flex flex-col items-center">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-40 object-cover"
          />
          <h3 className="text-lg font-semibold py-3 w-full text-center">
            {service.title}
          </h3>
        </div>

        {/* Description outside card */}
        <p className="text-black text-sm mt-3">{service.description}</p>
      </div>
    ))}
  </div>
</section>

    </div>
  );
};

export default HomepageSections;


