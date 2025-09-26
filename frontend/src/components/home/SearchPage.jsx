// import { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import api from "../../api/api";

// export default function SearchPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const query = searchParams.get("query") || "";

//   useEffect(() => {
//     if (query.trim() !== "") fetchProducts(query);
//     else setProducts([]);
//   }, [query]);

//   const fetchProducts = async (searchTerm) => {
//     setLoading(true);
//     try {
//       // Using backend's filter_by_subitem_name endpoint
//       const res = await api.get(`/products/filter_by_subitem_name/?subitem_name=${encodeURIComponent(searchTerm)}`);
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Failed to fetch products:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClickProduct = (id) => {
//     navigate(`/product/${id}`);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-8">
//       <h2 className="text-2xl font-semibold mb-6">
//         Search Results for "{query}"
//       </h2>

//       {loading && <p className="text-center text-gray-500">Loading...</p>}

//       {!loading && products.length === 0 && query.trim() !== "" && (
//         <p className="text-center text-gray-500">No products found for "{query}"</p>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition"
//             onClick={() => handleClickProduct(product.id)}
//           >
//             <img
//               src={product.image || "/placeholder.png"}
//               alt={product.name}
//               className="w-full h-40 object-cover rounded mb-2"
//             />
//             <h3 className="font-semibold text-lg">{product.name}</h3>
//             <p className="text-gray-600">${product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/api";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  // Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/products/"); // fetch all products
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on query
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [query, products]);

  const handleClickProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6">
        Search Results for "{query}"
      </h2>

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {!loading && filteredProducts.length === 0 && query.trim() !== "" && (
        <p className="text-center text-gray-500">No products found for "{query}"</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition"
            onClick={() => handleClickProduct(product.id)}
          >
            <img
              src={product.image || "/placeholder.png"}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
