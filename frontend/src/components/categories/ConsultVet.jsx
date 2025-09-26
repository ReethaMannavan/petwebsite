import React, { useEffect, useState } from "react";
import api from "../../api/api"; // your axios instance
// Make sure tailwind includes Montserrat (font-montserrat) in your config

export default function ConsultVet() {
  const [hero, setHero] = useState(null);
  const [infoBars, setInfoBars] = useState([]);
  const [services, setServices] = useState([]);
  const [highlight, setHighlight] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [h, ib, s, hl, c] = await Promise.all([
          api.get("/consultvet/hero/"),
          api.get("/consultvet/infobar/"),
          api.get("/consultvet/services/"),
          api.get("/consultvet/highlight/"),
          api.get("/consultvet/cards/"),
        ]);

        setHero(h?.data?.[0] ?? null);
        setInfoBars(ib?.data ?? []);
        setServices(s?.data ?? []);
        setHighlight(hl?.data?.[0] ?? null);
        setCards(c?.data ?? []);
      } catch (err) {
        console.error("ConsultVet fetch error:", err);
      }
    })();
  }, []);

  return (
    <div className="consultvet-page font-montserrat text-gray-800">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-2 text-sm text-gray-600">
        <span className="text-gray-500">Home</span>
        <span className="mx-2">/</span>
        <span className="font-medium">Consult Vet</span>
      </div>

      {/* HERO */}
      {hero && (
        <section className="relative w-full">
          <div className="relative h-[420px] md:h-[520px] overflow-hidden">
            {/* Background image */}
            <img
              src={hero.image}
              alt={hero.title || "Consult a Vet"}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Semi-transparent left overlay (if needed) - optional */}
            <div className="absolute inset-0 bg-transparent" />

            {/* Right-side overlays */}
            <div className="absolute top-12 right-4 md:right-12 flex flex-col items-end gap-4 z-20">
              {/* Text overlay - black semi transparent rounded rectangle */}
              <div className="max-w-xs bg-black/75 text-white p-4 rounded-lg shadow-lg">
                {hero.subtitle && (
                  <p className="text-md md:text-lg mt-2 leading-none text-white">
                    {hero.subtitle}
                  </p>
                )}
              </div>

              {/* Blue button overlay below text */}
              {hero.button_text && (
                <a
                  href={hero.button_link || "#"}
                  className="inline-block bg-[#0045FF] hover:bg-[#1C49C2] text-white font-semibold px-5 py-2 rounded-md shadow-md mx-auto mt-11"
                >
                  {hero.button_text}
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Info bar (thin blue strip attached under hero) */}
      {infoBars.length > 0 && (
        <section className="bg-[#0045FF] text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3">
              {infoBars.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-3 text-sm sm:text-base"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full">
                    <img
                      src={it.icon}
                      alt={it.text}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="font-medium">{it.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services: 8 round items */}
      {services.length > 0 && (
        <section className="container mx-auto px-4 py-10 mb-16">
          <div className="flex justify-center">
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-6">
              {services.map((s) => (
                <div key={s.id} className="flex flex-col items-center">
                  <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full bg-[#a1f1ff] shadow-lg">
                    <img
                      src={s.icon}
                      alt={s.title}
                      className="w-20 h-20 md:w-24 md:h-24 object-contain"
                    />
                  </div>
                  <p className="text-xs md:text-sm mt-2 text-center max-w-[90px] text-black font-semibold">
                    {s.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlight section with image half-outside & green background */}
      {highlight && (
        <section className="relative bg-[#98FB98] py-14">
          <div className="container mx-auto px-4 flex flex-col items-center">
            <div className="relative w-full max-w-4xl">
              {/* White rounded rectangle that contains the image and appears to sit over the green band */}
              <div className="mx-auto w-full max-w-3xl relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] bg-white rounded-2xl shadow-xl p-4">
                  {/* inner image */}
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={highlight.image}
                      alt="highlight"
                      className="w-full h-48 md:h-56 object-cover"
                    />
                  </div>
                </div>

                {/* Spacer to create the half-outside effect */}
                <div className="pt-28 md:pt-36" />
              </div>

              {/* Text & button under the overlapped image (centered) */}
              <div className="mt-8 text-center px-4">
                <p className="text-sm md:text-base max-w-2xl mx-auto font-semibold">
                  {highlight.description}
                </p>

                {highlight.button_text && (
                  <div className="mt-6">
                    <a
                      href={highlight.button_link || "#"}
                      className="inline-block bg-[#1C49C2] hover:bg-[#0045FF] text-white px-6 py-2 rounded-md font-semibold"
                    >
                      {highlight.button_text}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Extra Cards Section (3 cards) */}
      {cards.length > 0 && (
        <section className="container mx-auto px-4 md:px-12 lg:px-20 py-1 mb-16 mt-10">
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
            Access our expert vets from anywhere
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-xl shadow-md border border-black 
             flex flex-col items-center text-center justify-center
             w-full h-64 md:h-72 p-12"
              >
                <div className="w-24 h-24 rounded-full bg-[#F6FFF6] flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src={card.image}
                    alt="card"
                    className="w-16 h-16 object-cover"
                  />
                </div>
                <p className="text-sm text-black">{card.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
