

import { useState, useEffect } from "react";
import api from "../../api/api"; // Axios base URL
import { FaStar, FaRegStar } from "react-icons/fa";
import dogcat from '../../assets/images/promo1.PNG'

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4; // show 4 at a time (right side)
  const shiftCount = 2;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products/"); // use your main products list
        let data = res.data;

        // Shuffle the list to simulate "featured"
        data = data.sort(() => Math.random() - 0.5);

        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + shiftCount, products.length - itemsPerPage)
    );
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - shiftCount, 0));
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-12 bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">
        Top Rated Calming Products
      </h2>
      <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Promo Section */}
        <div className="flex flex-col items-center text-center p-4">
  {/* Larger Image */}
  <img
    src={dogcat}
    alt="Promo Banner"
    className="w-[270px] h-[230px] object-cover mb-3"
  />

  {/* Title */}
  <h3 className="font-bold text-lg">Stress-Free Summer</h3>

  {/* Paragraph */}
  <p className="text-black text-sm">
    Keep your pup calm all season
  </p>
</div>


        {/* Right Slider Section */}
        <div className="md:col-span-3 relative">
          {/* Prev Button */}
          {startIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute -left-6 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg z-10"
            >
              &lt;
            </button>
          )}

          {/* Products */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-32 h-32 object-contain mb-2"
                />
                <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
             <div className="flex justify-center my-1 text-yellow-500">
  <FaStar />
  <FaStar />
  <FaStar />
  <FaStar />
  <FaRegStar />
</div>
                <p className="font-bold">₹ {product.price}</p>
              </div>
            ))}
          </div>

          {/* Next Button */}
          {startIndex + itemsPerPage < products.length && (
            <button
              onClick={handleNext}
              className="absolute -right-6 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-2xl p-3 rounded-full shadow-lg z-10"
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
