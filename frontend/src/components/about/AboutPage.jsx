// import { useEffect, useState } from "react";
// import api from "../../api/api";

// export default function AboutPage() {
//   const [hero, setHero] = useState(null);
//   const [cards, setCards] = useState([]);
//   const [split, setSplit] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const heroRes = await api.get("/about/hero/");
//         const cardRes = await api.get("/about/cards/");
//         const splitRes = await api.get("/about/split/");

//         setHero(heroRes.data[0]); // Assuming only 1 hero section
//         setCards(cardRes.data);
//         setSplit(splitRes.data[0]); // Assuming only 1 split section
//       } catch (error) {
//         console.error("Error fetching about page data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="font-montserrat">
//       {/* Hero Section */}
//       {hero && (
//         <section className="relative w-full">
//           <img
//             src={hero.image}
//             alt={hero.title1}
//             className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
//           />
//           {/* Centered text box inside image */}
//           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white p-4 rounded-lg max-w-2xl text-center">
//             <h2 className="text-xl md:text-2xl font-bold mb-2">{hero.title1}</h2>
//             <p className="text-sm md:text-base">{hero.paragraph1}</p>
//           </div>
//         </section>
//       )}

//       {/* Second Paragraph under Hero */}
//       {hero && (
//         <section className="bg-[#98FB98] py-8 px-4 text-center">
//           <h3 className="text-lg md:text-xl font-bold mb-3">{hero.title2}</h3>
//           <p className="text-sm md:text-base max-w-3xl mx-auto">
//             {hero.paragraph2}
//           </p>
//         </section>
//       )}

//       {/* Cards Section */}
//       <section className="py-10 px-4 max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {cards.map((card) => (
//             <div
//               key={card.id}
//               className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
//             >
//               <img
//                 src={card.image}
//                 alt={card.title}
//                 className="h-48 w-full object-cover"
//               />
//               <div className="p-4 flex flex-col flex-grow justify-between">
//                 <h4 className="text-lg font-semibold mb-3">{card.title}</h4>
//                 <a
//                   href={card.button_link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="mt-auto inline-block text-center bg-[#0045FF] hover:bg-[#1C49C2] text-white px-4 py-2 rounded-lg transition"
//                 >
//                   {card.button_text}
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Split Section */}
//       {split && (
//         <section className="py-10 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           {/* Left Text */}
//           <div>
//             <h3 className="text-xl md:text-2xl font-bold mb-4">{split.title}</h3>
//             <p className="text-sm md:text-base">{split.paragraph}</p>
//           </div>
//           {/* Right Image */}
//           <div>
//             <img
//               src={split.image}
//               alt={split.title}
//               className="rounded-2xl shadow-lg w-full object-cover"
//             />
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../../api/api";

export default function AboutPage() {
  const [hero, setHero] = useState(null);
  const [cards, setCards] = useState([]);
  const [split, setSplit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const heroRes = await api.get("/about/hero/");
        const cardRes = await api.get("/about/cards/");
        const splitRes = await api.get("/about/split/");

        setHero(heroRes.data[0]); // Assuming only 1 hero section
        setCards(cardRes.data);
        setSplit(splitRes.data[0]); // Assuming only 1 split section
      } catch (error) {
        console.error("Error fetching about page data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="font-montserrat">
      {/* Hero Section */}
      {hero && (
        <section className="relative w-full mt-10">
          <img
            src={hero.image}
            alt={hero.title1}
            className="w-full h-[400px] md:h-[500px] object-contain rounded-lg"
          />
          {/* Centered text box inside image */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white p-4 rounded-lg max-w-2xl text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-2">{hero.title1}</h2>
            <p className="text-sm md:text-base font-semibold">{hero.paragraph1}</p>
          </div>
        </section>
      )}

      {/* Second Paragraph under Hero */}
      {hero && (
        <section className="bg-[#98FB98] py-8 px-4 text-center w-[820px] mx-auto">
          <h3 className="text-lg md:text-xl font-bold mb-3">{hero.title2}</h3>
          <p className="text-sm md:text-base max-w-3xl mx-auto">
            {hero.paragraph2}
          </p>
        </section>
      )}

      {/* Cards Section */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl border border-black px-4 py-4 shadow-lg overflow-hidden flex flex-col"
            >
              <img
                src={card.image}
                alt={card.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-grow justify-between">
                <h4 className="text-lg font-semibold mb-3">{card.title}</h4>
                <a
                  href={card.button_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block text-center bg-[#0045FF] hover:bg-[#1C49C2] text-white px-4 py-2 rounded-lg transition"
                >
                  {card.button_text}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Split Section */}
      {split && (
        <section className="py-10 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Text */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">{split.title}</h3>
            <p className="text-sm md:text-base">{split.paragraph}</p>
          </div>
          {/* Right Image */}
          <div>
            <img
              src={split.image}
              alt={split.title}
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>
        </section>
      )}
    </div>
  );
}
