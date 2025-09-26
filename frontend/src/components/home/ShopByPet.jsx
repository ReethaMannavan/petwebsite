// import { useState, useEffect } from "react";
// import api from "../../api/api"; // Axios base URL

// const ShopByPet = () => {
//   const [pets, setPets] = useState([]);
//   const [startIndex, setStartIndex] = useState(0);
//   const itemsPerPage = 5;
//   const shiftCount = 2;

//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         const res = await api.get("/shop-by-pet/");
//         setPets(res.data);
//       } catch (err) {
//         console.error("Error fetching pets:", err);
//       }
//     };
//     fetchPets();
//   }, []);

//   const handleNext = () => {
//     setStartIndex((prev) =>
//       Math.min(prev + shiftCount, pets.length - itemsPerPage)
//     );
//   };

//   const handlePrev = () => {
//     setStartIndex((prev) => Math.max(prev - shiftCount, 0));
//   };

//   const visiblePets = pets.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <section className="py-12 bg-gray-50">
//       <h2 className="text-2xl font-bold text-center mb-6">Shop by Pet</h2>
//       <div className="relative max-w-7xl mx-auto px-4">
//         {/* Prev Button */}
//         {startIndex > 0 && (
//           <button
//             onClick={handlePrev}
//             className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg z-10"
//           >
//             &lt;
//           </button>
//         )}

//         {/* Images Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//           {visiblePets.map((pet) => (
//             <div key={pet.id} className="flex flex-col items-center">
//               {/* Green Card */}
//               <div className="flex justify-center items-center bg-[#98FB98] rounded-[55px] shadow-md p-4 hover:shadow-lg transition w-full h-[200px]">
//                 <img
//                   src={pet.image}
//                   alt={pet.title}
//                   className="w-36 h-36 object-contain"
//                 />
//               </div>
//               {/* Title below the card */}
//               <h3 className="text-center text-xl font-medium mt-4">{pet.title}</h3>
//             </div>
//           ))}
//         </div>

//         {/* Next Button */}
//         {startIndex + itemsPerPage < pets.length && (
//           <button
//             onClick={handleNext}
//             className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white  font-bold  text-3xl p-3 rounded-full shadow-lg z-10"
//           >
//             &gt;
//           </button>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ShopByPet;


// import { useState, useEffect } from "react";
// import api from "../../api/api"; // Axios base URL

// const ShopByPet = () => {
//   const [pets, setPets] = useState([]);
//   const [startIndex, setStartIndex] = useState(0);
//   const itemsPerPage = 5;
//   const shiftCount = 2;

//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         const res = await api.get("/shop-by-pet/");
//         setPets(res.data);
//       } catch (err) {
//         console.error("Error fetching pets:", err);
//       }
//     };
//     fetchPets();
//   }, []);

//   const handleNext = () => {
//     setStartIndex((prev) =>
//       Math.min(prev + shiftCount, pets.length - itemsPerPage)
//     );
//   };

//   const handlePrev = () => {
//     setStartIndex((prev) => Math.max(prev - shiftCount, 0));
//   };

//   const visiblePets = pets.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <section className="py-12 bg-gray-50">
//       <h2 className="text-2xl font-bold text-center mb-6">Shop by Pet</h2>
//       <div className="relative max-w-7xl mx-auto px-4">
//         {/* Prev Button */}
//         {startIndex > 0 && (
//           <button
//             onClick={handlePrev}
//             className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg z-10"
//           >
//             &lt;
//           </button>
//         )}

//         {/* Images Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//           {visiblePets.map((pet) => (
//             <div key={pet.id} className="flex flex-col items-center">
//               {/* Green Card */}
//               <div className="flex justify-center items-center bg-[#98FB98] rounded-[55px] shadow-md p-4 hover:shadow-lg transition w-full h-[200px]">
//                 <img
//                   src={pet.image}
//                   alt={pet.title}
//                   className="w-36 h-36 object-contain"
//                 />
//               </div>
//               {/* Title below the card */}
//               <h3 className="text-center text-xl font-medium mt-4">{pet.title}</h3>
//             </div>
//           ))}
//         </div>

//         {/* Next Button */}
//         {startIndex + itemsPerPage < pets.length && (
//           <button
//             onClick={handleNext}
//             className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white  font-bold  text-3xl p-3 rounded-full shadow-lg z-10"
//           >
//             &gt;
//           </button>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ShopByPet;


// import { useState, useEffect } from "react";
// import api from "../../api/api";

// const ShopByPet = () => {
//   const [pets, setPets] = useState([]);
//   const [startIndex, setStartIndex] = useState(0);
//   const itemsPerPage = 5;
//   const shiftCount = 2;

//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         const res = await api.get("/shop-by-pet/");
//         setPets(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Error fetching pets:", err);
//       }
//     };
//     fetchPets();
//   }, []);

//   const handleNext = () => {
//     setStartIndex((prev) =>
//       Math.min(prev + shiftCount, pets.length - itemsPerPage)
//     );
//   };

//   const handlePrev = () => {
//     setStartIndex((prev) => Math.max(prev - shiftCount, 0));
//   };

//   const visiblePets = pets.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <section className="py-12 bg-gray-50">
//       <h2 className="text-2xl font-bold text-center mb-6">Shop by Pet</h2>
//       <div className="relative max-w-7xl mx-auto px-4">
//         {startIndex > 0 && (
//           <button
//             onClick={handlePrev}
//             className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg z-10"
//           >
//             &lt;
//           </button>
//         )}

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//           {visiblePets.map((pet) => (
//             <div key={pet.id} className="flex flex-col items-center">
//               <div className="flex justify-center items-center bg-[#98FB98] rounded-[55px] shadow-md p-4 hover:shadow-lg transition w-full h-[200px]">
//                 <img
//                   src={pet.image}
//                   alt={pet.title}
//                   className="w-36 h-36 object-contain"
//                 />
//               </div>
//               <h3 className="text-center text-xl font-medium mt-4">{pet.title}</h3>
//             </div>
//           ))}
//         </div>

//         {startIndex + itemsPerPage < pets.length && (
//           <button
//             onClick={handleNext}
//             className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white  font-bold  text-3xl p-3 rounded-full shadow-lg z-10"
//           >
//             &gt;
//           </button>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ShopByPet;


// import { useState, useEffect } from "react";
// import api from "../../api/api"; // Axios base URL

// const ShopByPet = () => {
//   const [pets, setPets] = useState([]);
//   const [startIndex, setStartIndex] = useState(0);
//   const itemsPerPage = 5;
//   const shiftCount = 2;

//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         const res = await api.get("/shop-by-pet/");
//         setPets(res.data);
//       } catch (err) {
//         console.error("Error fetching pets:", err);
//       }
//     };
//     fetchPets();
//   }, []);

//   const handleNext = () => {
//     setStartIndex((prev) =>
//       Math.min(prev + shiftCount, pets.length - itemsPerPage)
//     );
//   };

//   const handlePrev = () => {
//     setStartIndex((prev) => Math.max(prev - shiftCount, 0));
//   };

//   const visiblePets = pets.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <section className="py-12 bg-gray-50">
//       <h2 className="text-2xl font-bold text-center mb-6">Shop by Pet</h2>
//       <div className="relative max-w-7xl mx-auto px-4">
//         {/* Prev Button */}
//         {startIndex > 0 && (
//           <button
//             onClick={handlePrev}
//             className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg z-10"
//           >
//             &lt;
//           </button>
//         )}

//         {/* Images Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//           {visiblePets.map((pet) => (
//             <div key={pet.id} className="flex flex-col items-center">
//               {/* Green Card */}
//               <div className="flex justify-center items-center bg-[#98FB98] rounded-[55px] shadow-md p-4 hover:shadow-lg transition w-full h-[200px]">
//                 <img
//                   src={pet.image}
//                   alt={pet.title}
//                   className="w-36 h-36 object-contain"
//                 />
//               </div>
//               {/* Title below the card */}
//               <h3 className="text-center text-xl font-medium mt-4">{pet.title}</h3>
//             </div>
//           ))}
//         </div>

//         {/* Next Button */}
//         {startIndex + itemsPerPage < pets.length && (
//           <button
//             onClick={handleNext}
//             className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white  font-bold  text-3xl p-3 rounded-full shadow-lg z-10"
//           >
//             &gt;
//           </button>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ShopByPet;

import { useState, useEffect } from "react";
import api from "../../api/api"; // Axios base URL

const ShopByPet = () => {
  const [pets, setPets] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;
  const shiftCount = 2;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await api.get("/shop-by-pet/");
        setPets(res.data);
      } catch (err) {
        console.error("Error fetching pets:", err);
      }
    };
    fetchPets();
  }, []);

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + shiftCount, pets.length - itemsPerPage)
    );
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - shiftCount, 0));
  };

  const visiblePets = pets.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-6">Shop by Pet</h2>
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Prev Button */}
        {startIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg z-10"
          >
            &lt;
          </button>
        )}

        {/* Images Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {visiblePets.map((pet) => (
            <div key={pet.id} className="flex flex-col items-center">
              {/* Green Card */}
              <div className="flex justify-center items-center bg-[#98FB98] rounded-[55px] shadow-md p-4 hover:shadow-lg transition w-full h-[200px]">
                <img
                  src={pet.image}
                  alt={pet.title}
                  className="w-36 h-36 object-contain"
                />
              </div>
              {/* Title below the card */}
              <h3 className="text-center text-xl font-medium mt-4">{pet.title}</h3>
            </div>
          ))}
        </div>

        {/* Next Button */}
        {startIndex + itemsPerPage < pets.length && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white  font-bold  text-3xl p-3 rounded-full shadow-lg z-10"
          >
            &gt;
          </button>
        )}
      </div>
    </section>
  );
};

export default ShopByPet;

