

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../../api/api";

// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast"; 

// // ---- STAR COMPONENT ----
// const StarRating = ({ rating, setRating, interactive = false }) => {
//   return (
//     <div className="flex space-x-1">
//       {Array.from({ length: 5 }, (_, i) => (
//         <span
//           key={i}
//           className={`text-2xl cursor-pointer ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
//           onClick={() => interactive && setRating(i + 1)}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );
// };


// const ProductDescriptionPage = () => {
//   const { id } = useParams(); // product id from route

//   const navigate = useNavigate();

// const handleAddToCart = async () => {
//   try {
//     await api.post("/cart/add/", { product_id: product.id, quantity });
//     toast.success(`${quantity} ${product.name} added to cart!`, { duration: 3000 });
//   } catch (err) {
//     if (err.response?.status === 401) {
//       toast.error("Please log in to add items to cart", { duration: 3000 });
//       navigate("/login");
//     } else {
//       toast.error("Something went wrong", { duration: 3000 });
//       console.error(err);
//     }
//   }
// };

// const handleBuyNow = async () => {
//   try {
//     await api.post("/cart/add/", { product_id: product.id, quantity });
//     toast.success(`${quantity} ${product.name} added to cart! Redirecting to checkout...`, { duration: 3000 });
//     setTimeout(() => navigate("/cart"), 500); // short delay to show toast
//   } catch (err) {
//     if (err.response?.status === 401) {
//       toast.error("Please log in to proceed to checkout", { duration: 3000 });
//       navigate("/login");
//     } else {
//       toast.error("Something went wrong", { duration: 3000 });
//       console.error(err);
//     }
//   }
// };


//   // ---- STATE HOOKS ----
//   const [product, setProduct] = useState(null);
//   const [detail, setDetail] = useState(null);
//   const [reviews, setReviews] = useState([]);

//   const [quantity, setQuantity] = useState(1);
//   const [mainImage, setMainImage] = useState(null);

//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [agree, setAgree] = useState(false);

//   // ---- FETCH DATA ----
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data: prod } = await api.get(`/products/${id}/`);
//         setProduct(prod);
//         setMainImage(prod.image);

//         const { data: det } = await api.get(`/product-details/?product=${id}`);
//         setDetail(det.length ? det[0] : null);

//         const { data: rev } = await api.get(`/reviews/?product=${id}`);
//         setReviews(rev);
//       } catch (err) {
//         console.error("Error loading product description page:", err);
//       }
//     };

//     fetchData();
//   }, [id]);

//   // ---- HANDLE REVIEW SUBMIT ----
//   const handleReviewSubmit = async (e) => {
//   e.preventDefault();
//   if (!agree) {
//     toast.error("You must agree to terms and conditions");
//     return;
//   }

//   try {
//     if (rating === 0) {
//       toast.error("Please select a rating");
//       return;
//     }

//     await api.post("/reviews/", {
//       product: id,
//       rating,
//       review_text: reviewText,
//       user_name: name,
//       user_email: email,
//     });

//     // Reset form
//     setRating(0);
//     setReviewText("");
//     setName("");
//     setEmail("");
//     setAgree(false);

//     // Refresh reviews
//     const { data: rev } = await api.get(`/reviews/?product=${id}`);
//     setReviews(rev);

//     toast.success("Review submitted successfully!", { autoClose: 3000 });
//   } catch (err) {
//     console.error(err);
//     toast.error("Failed to submit review", { autoClose: 3000 });
//   }
// };


//   if (!product) return <div className="text-center py-10">Loading...</div>;

//   // ---- DERIVED DATA ----
//   const allImages = [product.image, ...(product.additional_images?.map((img) => img.image) || [])];

//   const detailSections = [];
//   if (detail) {
//     for (let i = 1; i <= 5; i++) {
//       const title = detail[`title${i}`];
//       const paragraph = detail[`paragraph${i}`];
//       if (title) detailSections.push({ title, paragraph });
//     }
//   }

//   // ---- RENDER ----
//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">
//       {/* SECTION 1: PRODUCT MAIN INFO */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* Left: Images */}
//         <div>
//           <img
//             src={mainImage}
//             alt={product.name}
//             className="w-full h-96 object-cover rounded"
//           />
//           <div className="flex mt-4 space-x-3">
//             {allImages.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt={`thumb-${idx}`}
//                 onClick={() => setMainImage(img)}
//                 className={`w-20 h-20 object-cover rounded border cursor-pointer ${
//                   mainImage === img ? "ring-2 ring-blue-500" : ""
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Right: Info */}
//         <div>
//           <h1 className="text-2xl font-bold">{product.name}</h1>
//           {product.coupon_code && <p className="mt-2">Coupon Code: {product.coupon_code}</p>}
//           {product.brand && <p className="mt-1">Brand: {product.brand}</p>}
//           <p className="mt-4 text-gray-700">{product.description}</p>
//           <p className="mt-2">Manufactured by: {product.manufacturer || "N/A"}</p>
//           <p>Importer: {product.importer_name}</p>
//           <p>Address: {product.importer_address}</p>
//           {product.per_gram_price && <p>Per gram price: {product.per_gram_price} ₹</p>}
//           {product.mrp && <p>MRP: ₹ {product.mrp}</p>}

//           <div className="mt-4">
//             <label className="block mb-1 font-semibold">Available Size:</label>
//             <select className="border px-2 py-1 rounded">
//               <option>1kg</option>
//               <option>2kg</option>
//             </select>
//           </div>

//           <div className="mt-4 flex items-center space-x-3">
//             <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1 border">-</button>
//             <span>{quantity}</span>
//             <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1 border">+</button>
//           </div>

//           <div className="mt-6 flex space-x-4">
//             {/* <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Add to Cart</button>
//             <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Buy Now</button> */}

//             <div className="mt-6 flex space-x-4">
//   <button
//     onClick={handleAddToCart}
//     className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//   >
//     Add to Cart
//   </button>
//   <button
//     onClick={handleBuyNow}
//     className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//   >
//     Buy Now
//   </button>
// </div>

//           </div>
//         </div>
//       </div>

//       {/* SECTION 2: PRODUCT DETAIL */}
//       {detail && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16 items-stretch">
//           <div>
//             {detailSections.map((sec, idx) => (
//               <div key={idx} className="mb-4">
//                 <h3 className="font-semibold">{sec.title}</h3>
//                 <p className="text-gray-700">{sec.paragraph}</p>
//               </div>
//             ))}
//           </div>
//           {detail.image && (
//             <img
//               src={detail.image}
//               alt="detail"
//               className="w-full h-full object-cover rounded"
//             />
//           )}
//         </div>
//       )}

//       {/* SECTION 3: REVIEWS */}
//    {/* ---- SECTION 3: REVIEWS & RATINGS ---- */}
// <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
//   {/* LEFT COLUMN: Rating Summary */}
//   <div>
//     <h2 className="text-xl font-bold mb-4">Customer Ratings</h2>

//     {/* Average Rating */}
//     <div className="flex items-center mb-4">
//       <span className="text-3xl font-bold mr-2">{(product.rating || 0).toFixed(1)}</span>
//       <StarRating rating={Math.round(product.rating || 0)} />
//     </div>

//     {/* Rating Distribution */}
//     <div className="space-y-2">
//       {[5, 4, 3, 2, 1].map((star) => {
//         const count = reviews.filter((r) => r.rating === star).length;
//         const total = reviews.length || 1;
//         const percentage = (count / total) * 100;

//         return (
//           <div key={star} className="flex items-center">
//             <span className="w-12">{'★'.repeat(star)}</span>
//             <div className="flex-1 h-4 bg-gray-200 rounded mx-2">
//               <div
//                 className="h-4 bg-yellow-400 rounded"
//                 style={{ width: `${percentage}%` }}
//               />
//             </div>
//             {count > 0 && <span className="w-6 text-sm">{count}</span>}
//           </div>
//         );
//       })}
//     </div>
//   </div>

//   {/* RIGHT COLUMN: Review Form */}
//   <div>
//     <h2 className="text-xl font-bold mb-4">Your Rating & Review</h2>

//     <form
//       onSubmit={async (e) => {
//         e.preventDefault();
//         if (!agree) {
//           alert("You must agree to the terms and conditions.");
//           return;
//         }
//         try {
//           await api.post("/reviews/", {
//             product: id,
//             rating,
//             review_text: reviewText,
//             user_name: name,
//             user_email: email,
//           });
//           // Reset form
//           setRating(0);
//           setReviewText("");
//           setName("");
//           setEmail("");
//           setAgree(false);
//           const { data: rev } = await api.get(`/reviews/?product=${id}`);
//           setReviews(rev);
//           toast.success("Review submitted successfully!", { autoClose: 3000 });
//         } catch (err) {
//           console.error(err);
//           toast.error("Failed to submit review", { autoClose: 3000 });
//         }
//       }}
//       className="space-y-4"
//     >
//       {/* Interactive Stars */}
//       <div>
//         <label className="block mb-1 font-semibold">Your Rating:</label>
//         <StarRating rating={rating} setRating={setRating} interactive />
//       </div>

//       {/* Review Text */}
//       <div>
//         <label className="block mb-1 font-semibold">Your Review:</label>
//         <textarea
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//           className="w-full border rounded px-3 py-2"
//           required
//         />
//       </div>

//       {/* Name & Email */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block mb-1 font-semibold">Your Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="border rounded px-3 py-2 w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Your Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border rounded px-3 py-2 w-full"
//             required
//           />
//         </div>
//       </div>

//       {/* Terms Checkbox */}
//       <div className="flex items-center">
//         <input
//           type="checkbox"
//           checked={agree}
//           onChange={() => setAgree(!agree)}
//           className="mr-2"
//         />
//         <span className="text-sm">I agree to the terms and conditions</span>
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//       >
//         Submit Review
//       </button>
//     </form>
//   </div>
// </div>


//     </div>
//   );
// };

// export default ProductDescriptionPage;



// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../api/api";
// import toast from "react-hot-toast"; 
// import { AuthContext } from "../context/AuthContext";

// // ---- STAR COMPONENT ----
// const StarRating = ({ rating, setRating, interactive = false }) => {
//   return (
//     <div className="flex space-x-1">
//       {Array.from({ length: 5 }, (_, i) => (
//         <span
//           key={i}
//           className={`text-2xl cursor-pointer ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
//           onClick={() => interactive && setRating(i + 1)}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );
// };

// const ProductDescriptionPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const [product, setProduct] = useState(null);
//   const [detail, setDetail] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [mainImage, setMainImage] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [agree, setAgree] = useState(false);

//   // ---- FETCH PRODUCT, DETAILS, REVIEWS ----
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data: prod } = await api.get(`/products/${id}/`);
//         setProduct(prod);
//         setMainImage(prod.image);

//         const { data: det } = await api.get(`/product-details/?product=${id}`);
//         setDetail(det.length ? det[0] : null);

//         const { data: rev } = await api.get(`/reviews/?product=${id}`);
//         setReviews(rev);
//       } catch (err) {
//         console.error("Error loading product description page:", err);
//       }
//     };
//     fetchData();
//   }, [id]);

//   // ---- HANDLE ADD TO CART ----
//   const handleAddToCart = async () => {
//     try {
//       await api.post("/cart/add/", { product_id: product.id, quantity });
//       toast.success(`${quantity} ${product.name} added to cart!`, { duration: 3000 });
//     } catch (err) {
//       if (err.response?.status === 401) {
//         toast.error("Please log in to add items to cart", { duration: 3000 });
//         navigate("/login");
//       } else {
//         toast.error("Something went wrong", { duration: 3000 });
//         console.error(err);
//       }
//     }
//   };

//   // ---- HANDLE BUY NOW ----
//   const handleBuyNow = async () => {
//     try {
//       await api.post("/cart/add/", { product_id: product.id, quantity });
//       toast.success(`${quantity} ${product.name} added to cart! Redirecting to checkout...`, { duration: 3000 });
//       setTimeout(() => navigate("/cart"), 500);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         toast.error("Please log in to proceed to checkout", { duration: 3000 });
//         navigate("/login");
//       } else {
//         toast.error("Something went wrong", { duration: 3000 });
//         console.error(err);
//       }
//     }
//   };

//   // ---- HANDLE REVIEW SUBMIT (ONLY LOGGED-IN USERS) ----
//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       toast.error("You must be logged in to submit a review");
//       navigate("/login");
//       return;
//     }

//     if (!agree) {
//       toast.error("You must agree to terms and conditions");
//       return;
//     }

//     if (rating === 0) {
//       toast.error("Please select a rating");
//       return;
//     }

//     try {
//       await api.post("/reviews/", {
//         product: id,
//         rating,
//         review_text: reviewText,
//         user_name: name,
//         user_email: email,
//       });

//       // Reset form
//       setRating(0);
//       setReviewText("");
//       setName("");
//       setEmail("");
//       setAgree(false);

//       // Refresh reviews
//       const { data: rev } = await api.get(`/reviews/?product=${id}`);
//       setReviews(rev);

//       toast.success("Review submitted successfully!", { autoClose: 3000 });
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to submit review", { autoClose: 3000 });
//     }
//   };

//   if (!product) return <div className="text-center py-10">Loading...</div>;

//   const allImages = [product.image, ...(product.additional_images?.map((img) => img.image) || [])];
//   const detailSections = [];
//   if (detail) {
//     for (let i = 1; i <= 5; i++) {
//       const title = detail[`title${i}`];
//       const paragraph = detail[`paragraph${i}`];
//       if (title) detailSections.push({ title, paragraph });
//     }
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">
//       {/* PRODUCT MAIN INFO */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* IMAGES */}
//         <div>
//           <img
//             src={mainImage}
//             alt={product.name}
//             className="w-full h-96 object-cover rounded"
//           />
//           <div className="flex mt-4 space-x-3">
//             {allImages.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt={`thumb-${idx}`}
//                 onClick={() => setMainImage(img)}
//                 className={`w-20 h-20 object-cover rounded border cursor-pointer ${
//                   mainImage === img ? "ring-2 ring-blue-500" : ""
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* PRODUCT INFO */}
//         <div>
//           <h1 className="text-2xl font-bold">{product.name}</h1>
//           {product.coupon_code && <p className="mt-2">Coupon Code: {product.coupon_code}</p>}
//           {product.brand && <p className="mt-1">Brand: {product.brand}</p>}
//           <p className="mt-4 text-gray-700">{product.description}</p>
//           <p className="mt-2">Manufactured by: {product.manufacturer || "N/A"}</p>
//           <p>Importer: {product.importer_name}</p>
//           <p>Address: {product.importer_address}</p>
//           {product.per_gram_price && <p>Per gram price: {product.per_gram_price} ₹</p>}
//           {product.mrp && <p>MRP: ₹ {product.mrp}</p>}

//           <div className="mt-4">
//             <label className="block mb-1 font-semibold">Available Size:</label>
//             <select className="border px-2 py-1 rounded">
//               <option>1kg</option>
//               <option>2kg</option>
//             </select>
//           </div>

//           <div className="mt-4 flex items-center space-x-3">
//             <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1 border">-</button>
//             <span>{quantity}</span>
//             <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1 border">+</button>
//           </div>

//           <div className="mt-6 flex space-x-4">
//             <button
//               onClick={handleAddToCart}
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={handleBuyNow}
//               className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* PRODUCT DETAILS */}
//       {detail && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16 items-stretch">
//           <div>
//             {detailSections.map((sec, idx) => (
//               <div key={idx} className="mb-4">
//                 <h3 className="font-semibold">{sec.title}</h3>
//                 <p className="text-gray-700">{sec.paragraph}</p>
//               </div>
//             ))}
//           </div>
//           {detail.image && (
//             <img
//               src={detail.image}
//               alt="detail"
//               className="w-full h-full object-cover rounded"
//             />
//           )}
//         </div>
//       )}

//       {/* REVIEWS & RATINGS */}
//       <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* LEFT: Rating Summary */}
//         <div>
//           <h2 className="text-xl font-bold mb-4">Customer Ratings</h2>
//           <div className="flex items-center mb-4">
//             <span className="text-3xl font-bold mr-2">{(product.rating || 0).toFixed(1)}</span>
//             <StarRating rating={Math.round(product.rating || 0)} />
//           </div>

//           <div className="space-y-2">
//             {[5,4,3,2,1].map((star) => {
//               const count = reviews.filter((r) => r.rating === star).length;
//               const total = reviews.length || 1;
//               const percentage = (count / total) * 100;

//               return (
//                 <div key={star} className="flex items-center">
//                   <span className="w-12">{'★'.repeat(star)}</span>
//                   <div className="flex-1 h-4 bg-gray-200 rounded mx-2">
//                     <div className="h-4 bg-yellow-400 rounded" style={{ width: `${percentage}%` }}/>
//                   </div>
//                   {count > 0 && <span className="w-6 text-sm">{count}</span>}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* RIGHT: Review Form */}
//         <div>
//           <h2 className="text-xl font-bold mb-4">Your Rating & Review</h2>
//           <form onSubmit={handleReviewSubmit} className="space-y-4">
//             <div>
//               <label className="block mb-1 font-semibold">Your Rating:</label>
//               <StarRating rating={rating} setRating={setRating} interactive />
//             </div>

//             <div>
//               <label className="block mb-1 font-semibold">Your Review:</label>
//               <textarea
//                 value={reviewText}
//                 onChange={(e) => setReviewText(e.target.value)}
//                 className="w-full border rounded px-3 py-2"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-1 font-semibold">Your Name:</label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="border rounded px-3 py-2 w-full"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1 font-semibold">Your Email:</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="border rounded px-3 py-2 w-full"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={agree}
//                 onChange={() => setAgree(!agree)}
//                 className="mr-2"
//               />
//               <span className="text-sm">I agree to the terms and conditions</span>
//             </div>

//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//             >
//               Submit Review
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDescriptionPage;



import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast"; 
import { AuthContext } from "../context/AuthContext";

// ---- STAR COMPONENT ----
const StarRating = ({ rating, setRating, interactive = false }) => {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`text-2xl cursor-pointer ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          onClick={() => interactive && setRating(i + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ProductDescriptionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [detail, setDetail] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);

  const getFullImageUrl = (imgPath) => {
    if (!imgPath) return "";
    return imgPath.startsWith("http") ? imgPath : `${import.meta.env.VITE_API_URL}${imgPath}`;
  };

  // ---- FETCH PRODUCT, DETAILS, REVIEWS ----
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: prod } = await api.get(`/products/${id}/`);
        setProduct(prod);
        setMainImage(getFullImageUrl(prod.image));

        const { data: det } = await api.get(`/product-details/?product=${id}`);
        setDetail(det.length ? det[0] : null);

        const { data: rev } = await api.get(`/reviews/?product=${id}`);
        setReviews(rev);
      } catch (err) {
        console.error("Error loading product description page:", err);
      }
    };
    fetchData();
  }, [id]);

  // ---- HANDLE ADD TO CART ----
  const handleAddToCart = async () => {
    try {
      await api.post("/cart/add/", { product_id: product.id, quantity });
      toast.success(`${quantity} ${product.name} added to cart!`, { duration: 3000 });
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please log in to add items to cart", { duration: 3000 });
        navigate("/login");
      } else {
        toast.error("Something went wrong", { duration: 3000 });
        console.error(err);
      }
    }
  };

  // ---- HANDLE BUY NOW ----
  const handleBuyNow = async () => {
    try {
      await api.post("/cart/add/", { product_id: product.id, quantity });
      toast.success(`${quantity} ${product.name} added to cart! Redirecting to checkout...`, { duration: 3000 });
      setTimeout(() => navigate("/cart"), 500);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please log in to proceed to checkout", { duration: 3000 });
        navigate("/login");
      } else {
        toast.error("Something went wrong", { duration: 3000 });
        console.error(err);
      }
    }
  };

  // ---- HANDLE REVIEW SUBMIT (ONLY LOGGED-IN USERS) ----
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to submit a review");
      navigate("/login");
      return;
    }

    if (!agree) {
      toast.error("You must agree to terms and conditions");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      await api.post("/reviews/", {
        product: id,
        rating,
        review_text: reviewText,
        user_name: name,
        user_email: email,
      });

      // Reset form
      setRating(0);
      setReviewText("");
      setName("");
      setEmail("");
      setAgree(false);

      // Refresh reviews
      const { data: rev } = await api.get(`/reviews/?product=${id}`);
      setReviews(rev);

      toast.success("Review submitted successfully!", { autoClose: 3000 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review", { autoClose: 3000 });
    }
  };

  if (!product) return <div className="text-center py-10">Loading...</div>;

  const allImages = [getFullImageUrl(product.image), ...(product.additional_images?.map((img) => getFullImageUrl(img.image)) || [])];

  const detailSections = [];
  if (detail) {
    for (let i = 1; i <= 5; i++) {
      const title = detail[`title${i}`];
      const paragraph = detail[`paragraph${i}`];
      if (title) detailSections.push({ title, paragraph });
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* PRODUCT MAIN INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGES */}
        <div>
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-96 object-cover rounded"
          />
          <div className="flex mt-4 space-x-3">
            {allImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover rounded border cursor-pointer ${mainImage === img ? "ring-2 ring-blue-500" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          {product.coupon_code && <p className="mt-2">Coupon Code: {product.coupon_code}</p>}
          {product.brand && <p className="mt-1">Brand: {product.brand}</p>}
          <p className="mt-4 text-gray-700">{product.description}</p>
          <p className="mt-2">Manufactured by: {product.manufacturer || "N/A"}</p>
          <p>Importer: {product.importer_name}</p>
          <p>Address: {product.importer_address}</p>
          {product.per_gram_price && <p>Per gram price: {product.per_gram_price} ₹</p>}
          {product.mrp && <p>MRP: ₹ {product.mrp}</p>}

          <div className="mt-4">
            <label className="block mb-1 font-semibold">Available Size:</label>
            <select className="border px-2 py-1 rounded">
              <option>1kg</option>
              <option>2kg</option>
            </select>
          </div>

          <div className="mt-4 flex items-center space-x-3">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1 border">-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1 border">+</button>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
<hr className="mt-4 text-black text-xl font-bold"></hr>
      {/* PRODUCT DETAILS */}
      {detail && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16 items-stretch">
          <div>
            {detailSections.map((sec, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="font-semibold">{sec.title}</h3>
                <p className="text-gray-700">{sec.paragraph}</p>
              </div>
            ))}
          </div>
          {detail.image && (
            <img
              src={getFullImageUrl(detail.image)}
              alt="detail"
              className="w-full h-full object-cover rounded"
            />
          )}
        </div>
      )}

      {/* REVIEWS & RATINGS */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 border border-black rounded-xl px-4 py-4">
        {/* LEFT: Rating Summary */}
        <div>
          <h2 className="text-xl font-bold mb-4">Customer Ratings</h2>
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold mr-2">{(product.rating || 0).toFixed(1)}</span>
            <StarRating rating={Math.round(product.rating || 0)} />
          </div>

          <div className="space-y-2">
            {[5,4,3,2,1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              const total = reviews.length || 1;
              const percentage = (count / total) * 100;

              return (
                <div key={star} className="flex items-center">
                  <span className="w-12">{'★'.repeat(star)}</span>
                  <div className="flex-1 h-4 bg-gray-200 rounded mx-2">
                    <div className="h-4 bg-yellow-400 rounded" style={{ width: `${percentage}%` }}/>
                  </div>
                  {count > 0 && <span className="w-6 text-sm">{count}</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Review Form */}
        <div>
          <h2 className="text-xl font-bold mb-4">Your Rating & Review</h2>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Your Rating:</label>
              <StarRating rating={rating} setRating={setRating} interactive />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Your Review:</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold">Your Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Your Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="mr-2"
              />
              <span className="text-sm">I agree to the terms and conditions</span>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionPage;
