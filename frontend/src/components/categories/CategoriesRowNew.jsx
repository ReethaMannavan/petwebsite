

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/api";
// import { ChevronDown } from "lucide-react";

// const CategoriesRowNew = () => {
//   const [categories, setCategories] = useState([]);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const navigate = useNavigate();

//   // Replace these with your actual category IDs from Django
//   const PET_SERVICES_ID = 4;
//   const CONSULT_VET_ID = 7;

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const { data } = await api.get("/categories/");
//         setCategories(data);
//       } catch (err) {
//         console.error("Failed to load categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleNavigate = ({ categoryId, subcategoryId, subitemId, subitemName, customRoute }) => {
//     if (customRoute) {
//       navigate(customRoute);
//       setOpenDropdown(null);
//       return;
//     }

//     let query = "";
//     if (subitemId) query = `?subitem=${subitemId}`;
//     else if (subcategoryId) query = `?subcategory=${subcategoryId}`;
//     else if (categoryId) query = `?category=${categoryId}`;
//     else if (subitemName) query = `?subitem_name=${encodeURIComponent(subitemName)}`;

//     navigate(`/products${query}`);
//     setOpenDropdown(null);
//   };

//   const toggleDropdown = (catId) => {
//     setOpenDropdown(openDropdown === catId ? null : catId);
//   };

//   return (
//     <div className="bg-persianblue text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex space-x-4 justify-center">
//         {categories.map((cat) => (
//           <div key={cat.id} className="relative">
//             <div className="flex items-center">
//               {/* Category button */}
//               <button
//                 className={`font-semibold px-3 py-2 hover:text-gray-200 ${
//                   openDropdown === cat.id ? "text-[#FFFF02]" : "text-white"
//                 }`}
//                 onClick={() => {
//                   if (cat.id === PET_SERVICES_ID) {
//                     handleNavigate({ customRoute: "/petservices" });
//                     return;
//                   }
//                   if (cat.id === CONSULT_VET_ID) {
//                     handleNavigate({ customRoute: "/consult-a-vet" });
//                     return;
//                   }
//                   handleNavigate({ categoryId: cat.id });
//                 }}
//               >
//                 {cat.name}
//               </button>

//               {/* Arrow for dropdown if subcategories exist */}
//               {cat.subcategories?.length > 0 && (
//                 <button
//                   className="ml-1 p-1 hover:text-yellow-300"
//                   onClick={() => toggleDropdown(cat.id)}
//                 >
//                   <ChevronDown size={16} />
//                 </button>
//               )}
//             </div>

//             {/* Mega-menu dropdown */}
//             {openDropdown === cat.id && cat.subcategories?.length > 0 && (
//               <div className="absolute top-full left-0 bg-white text-black shadow-lg border mt-1 p-4 z-50 flex space-x-6">
//                 {cat.subcategories.map((sub) => (
//                   <div key={sub.id} className="min-w-[150px]">
//                     {/* Subcategory image */}
//                     {sub.image && (
//                       <img
//                         src={sub.image}
//                         alt={sub.name}
//                         className="mb-2 w-full h-20 object-cover rounded"
//                       />
//                     )}

//                     {/* Subcategory name */}
//                     <h4
//                       className="font-semibold mb-2 cursor-pointer hover:text-blue-600"
//                       onClick={() => handleNavigate({ subcategoryId: sub.id })}
//                     >
//                       {sub.name}
//                     </h4>

//                     {/* Subitems */}
//                     <ul className="space-y-1">
//                       {sub.subitems.map((item) => (
//                         <li key={item.id}>
//                           {item.image && (
//                             <img
//                               src={item.image}
//                               alt={item.name}
//                               className="mb-1 w-full h-16 object-cover rounded"
//                             />
//                           )}
//                           <button
//                             className="text-gray-700 hover:text-blue-500 text-left"
//                             onClick={() =>
//                               handleNavigate({ subitemId: item.id, subitemName: item.name })
//                             }
//                           >
//                             {item.name}
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoriesRowNew;




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/api";
// import { ChevronDown } from "lucide-react";

// const CategoriesRowNew = () => {
//   const [categories, setCategories] = useState([]);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const navigate = useNavigate();

//   // Replace these with your actual category IDs from Django
//   const PET_SERVICES_ID = 4;
//   const CONSULT_VET_ID = 7;

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const { data } = await api.get("/categories/");
//         setCategories(data);
//       } catch (err) {
//         console.error("Failed to load categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleNavigate = ({ categoryId, subcategoryId, subitemId, subitemName, customRoute }) => {
//     if (customRoute) {
//       navigate(customRoute);
//       setOpenDropdown(null);
//       return;
//     }

//     let query = "";
//     if (subitemId) query = `?subitem=${subitemId}`;
//     else if (subcategoryId) query = `?subcategory=${subcategoryId}`;
//     else if (categoryId) query = `?category=${categoryId}`;
//     else if (subitemName) query = `?subitem_name=${encodeURIComponent(subitemName)}`;

//     navigate(`/products${query}`);
//     setOpenDropdown(null);
//   };

//   const toggleDropdown = (catId) => {
//     setOpenDropdown(openDropdown === catId ? null : catId);
//   };

//   return (
//     <div className="bg-persianblue text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex space-x-4 justify-center">
//         {categories.map((cat) => (
//           <div key={cat.id} className="relative">
//             <div className="flex items-center">
//               {/* Category button */}
//               <button
//                 className={`font-semibold px-3 py-2 hover:text-gray-200 ${
//                   openDropdown === cat.id ? "text-[#FFFF02]" : "text-white"
//                 }`}
//                 onClick={() => {
//                   if (cat.id === PET_SERVICES_ID) {
//                     handleNavigate({ customRoute: "/petservices" });
//                     return;
//                   }
//                   if (cat.id === CONSULT_VET_ID) {
//                     handleNavigate({ customRoute: "/consult-a-vet" });
//                     return;
//                   }
//                   handleNavigate({ categoryId: cat.id });
//                 }}
//               >
//                 {cat.name}
//               </button>

//               {/* Arrow for dropdown if subcategories exist */}
//               {cat.subcategories?.length > 0 && (
//                 <button
//                   className="ml-1 p-1 hover:text-yellow-300"
//                   onClick={() => toggleDropdown(cat.id)}
//                 >
//                   <ChevronDown size={16} />
//                 </button>
//               )}
//             </div>

//             {/* Mega-menu dropdown */}
//             {openDropdown === cat.id && cat.subcategories?.length > 0 && (
//               <div className="absolute top-full left-0 bg-white text-black shadow-lg border mt-1 p-4 z-50 flex space-x-6">
//                 {cat.subcategories.map((sub) => (
//                   <div key={sub.id} className="min-w-[150px]">
//                     {/* Subcategory image */}
//                     {sub.image && (
//                       <img
//                         src={sub.image}
//                         alt={sub.name}
//                         className="mb-2 w-full h-20 object-cover rounded"
//                       />
//                     )}

//                     {/* Subcategory name */}
//                     <h4
//                       className="font-semibold mb-2 cursor-pointer hover:text-blue-600"
//                       onClick={() => handleNavigate({ subcategoryId: sub.id })}
//                     >
//                       {sub.name}
//                     </h4>

//                     {/* Subitems */}
//                     <ul className="space-y-1">
//                       {sub.subitems.map((item) => (
//                         <li key={item.id}>
//                           {item.image && (
//                             <img
//                               src={item.image}
//                               alt={item.name}
//                               className="mb-1 w-full h-16 object-cover rounded"
//                             />
//                           )}
//                           <button
//                             className="text-gray-700 hover:text-blue-500 text-left"
//                             onClick={() =>
//                               handleNavigate({ subitemId: item.id, subitemName: item.name })
//                             }
//                           >
//                             {item.name}
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoriesRowNew;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/api";
// import { ChevronDown } from "lucide-react";

// const CategoriesRowNew = () => {
//   const [categories, setCategories] = useState([]);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const navigate = useNavigate();

//   // Replace these with your actual category IDs from Django
//   const PET_SERVICES_ID = 4;
//   const CONSULT_VET_ID = 7;

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const { data } = await api.get("/categories/");
//         setCategories(data);
//       } catch (err) {
//         console.error("Failed to load categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleNavigate = ({ categoryId, subcategoryId, subitemId, subitemName, customRoute }) => {
//     if (customRoute) {
//       navigate(customRoute);
//       setOpenDropdown(null);
//       return;
//     }

//     let query = "";
//     if (subitemId) query = `?subitem=${subitemId}`;
//     else if (subcategoryId) query = `?subcategory=${subcategoryId}`;
//     else if (categoryId) query = `?category=${categoryId}`;
//     else if (subitemName) query = `?subitem_name=${encodeURIComponent(subitemName)}`;

//     navigate(`/products${query}`);
//     setOpenDropdown(null);
//   };

//   const toggleDropdown = (catId) => {
//     setOpenDropdown(openDropdown === catId ? null : catId);
//   };

//   return (
//     <div className="bg-persianblue text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex space-x-4 justify-center">
//         {categories.map((cat) => (
//           <div key={cat.id} className="relative">
//             <div className="flex items-center">
//               {/* Category button */}
//               <button
//                 className={`font-semibold px-3 py-2 hover:text-gray-200 ${
//                   openDropdown === cat.id ? "text-[#FFFF02]" : "text-white"
//                 }`}
//                 onClick={() => {
//                   if (cat.id === PET_SERVICES_ID) {
//                     handleNavigate({ customRoute: "/petservices" });
//                     return;
//                   }
//                   if (cat.id === CONSULT_VET_ID) {
//                     handleNavigate({ customRoute: "/consult-a-vet" });
//                     return;
//                   }
//                   handleNavigate({ categoryId: cat.id });
//                 }}
//               >
//                 {cat.name}
//               </button>

//               {/* Arrow for dropdown if subcategories exist */}
//               {cat.subcategories?.length > 0 && (
//                 <button
//                   className="ml-1 p-1 hover:text-yellow-300"
//                   onClick={() => toggleDropdown(cat.id)}
//                 >
//                   <ChevronDown size={16} />
//                 </button>
//               )}
//             </div>

//             {/* Mega-menu dropdown */}
//             {openDropdown === cat.id && cat.subcategories?.length > 0 && (
//               <div className="absolute top-full left-0 bg-white text-black shadow-lg border mt-1 p-4 z-50 flex space-x-6">
//                 {cat.subcategories.map((sub) => (
//                   <div key={sub.id} className="min-w-[150px]">
//                     {/* Subcategory image */}
//                     {sub.image && (
//                       <img
//                         src={sub.image}
//                         alt={sub.name}
//                         className="mb-2 w-full h-20 object-cover rounded"
//                       />
//                     )}

//                     {/* Subcategory name */}
//                     <h4
//                       className="font-semibold mb-2 cursor-pointer hover:text-blue-600"
//                       onClick={() => handleNavigate({ subcategoryId: sub.id })}
//                     >
//                       {sub.name}
//                     </h4>

//                     {/* Subitems */}
//                     <ul className="space-y-1">
//                       {sub.subitems.map((item) => (
//                         <li key={item.id}>
//                           {item.image && (
//                             <img
//                               src={item.image}
//                               alt={item.name}
//                               className="mb-1 w-full h-16 object-cover rounded"
//                             />
//                           )}
//                           <button
//                             className="text-gray-700 hover:text-blue-500 text-left"
//                             onClick={() =>
//                               handleNavigate({ subitemId: item.id, subitemName: item.name })
//                             }
//                           >
//                             {item.name}
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoriesRowNew;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/api";
// import { ChevronDown } from "lucide-react";

// const CategoriesRowNew = () => {
//   const [categories, setCategories] = useState([]);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const navigate = useNavigate();

//   const PET_SERVICES_ID = 4;
//   const CONSULT_VET_ID = 7;

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const { data } = await api.get("/categories/");
//         setCategories(data);
//       } catch (err) {
//         console.error("Failed to load categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleNavigate = ({ categoryId, subcategoryId, subitemId, subitemName, customRoute }) => {
//     if (customRoute) {
//       navigate(customRoute);
//       setOpenDropdown(null);
//       return;
//     }

//     let query = "";
//     if (subitemId) query = `?subitem=${subitemId}`;
//     else if (subcategoryId) query = `?subcategory=${subcategoryId}`;
//     else if (categoryId) query = `?category=${categoryId}`;
//     else if (subitemName) query = `?subitem_name=${encodeURIComponent(subitemName)}`;

//     navigate(`/products${query}`);
//     setOpenDropdown(null);
//   };

//   const toggleDropdown = (catId) => {
//     setOpenDropdown(openDropdown === catId ? null : catId);
//   };

//   return (
//     <div className="bg-persianblue text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex space-x-4 justify-center">
//         {categories.map((cat) => (
//           <div key={cat.id} className="relative">
//             <div className="flex items-center">
//               <button
//                 className={`font-semibold px-3 py-2 hover:text-gray-200 ${openDropdown === cat.id ? "text-[#FFFF02]" : "text-white"}`}
//                 onClick={() => {
//                   if (cat.id === PET_SERVICES_ID) handleNavigate({ customRoute: "/petservices" });
//                   else if (cat.id === CONSULT_VET_ID) handleNavigate({ customRoute: "/consult-a-vet" });
//                   else handleNavigate({ categoryId: cat.id });
//                 }}
//               >
//                 {cat.name}
//               </button>

//               {cat.subcategories?.length > 0 && (
//                 <button className="ml-1 p-1 hover:text-yellow-300" onClick={() => toggleDropdown(cat.id)}>
//                   <ChevronDown size={16} />
//                 </button>
//               )}
//             </div>

//             {openDropdown === cat.id && cat.subcategories?.length > 0 && (
//               <div className="absolute top-full left-0 bg-white text-black shadow-lg border mt-1 p-4 z-50 flex space-x-6">
//                 {cat.subcategories.map((sub) => (
//                   <div key={sub.id} className="min-w-[150px]">
//                     {sub.image && <img src={sub.image} alt={sub.name} className="mb-2 w-full h-20 object-cover rounded" />}
//                     <h4 className="font-semibold mb-2 cursor-pointer hover:text-blue-600" onClick={() => handleNavigate({ subcategoryId: sub.id })}>{sub.name}</h4>
//                     <ul className="space-y-1">
//                       {sub.subitems.map((item) => (
//                         <li key={item.id}>
//                           {item.image && <img src={item.image} alt={item.name} className="mb-1 w-full h-16 object-cover rounded" />}
//                           <button className="text-gray-700 hover:text-blue-500 text-left" onClick={() => handleNavigate({ subitemId: item.id, subitemName: item.name })}>
//                             {item.name}
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoriesRowNew;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { ChevronDown } from "lucide-react";

const CategoriesRowNew = () => {
  const [categories, setCategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  // Replace these with your actual category IDs from Django
  const PET_SERVICES_ID = 4;
  const CONSULT_VET_ID = 7;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories/");
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleNavigate = ({ categoryId, subcategoryId, subitemId, subitemName, customRoute }) => {
    if (customRoute) {
      navigate(customRoute);
      setOpenDropdown(null);
      return;
    }

    let query = "";
    if (subitemId) query = `?subitem=${subitemId}`;
    else if (subcategoryId) query = `?subcategory=${subcategoryId}`;
    else if (categoryId) query = `?category=${categoryId}`;
    else if (subitemName) query = `?subitem_name=${encodeURIComponent(subitemName)}`;

    navigate(`/products${query}`);
    setOpenDropdown(null);
  };

  const toggleDropdown = (catId) => {
    setOpenDropdown(openDropdown === catId ? null : catId);
  };

  return (
    <div className="bg-persianblue text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex space-x-4 justify-center">
        {categories.map((cat) => (
          <div key={cat.id} className="relative">
            <div className="flex items-center">
              {/* Category button */}
              <button
                className={`font-semibold px-3 py-2 hover:text-gray-200 ${
                  openDropdown === cat.id ? "text-[#FFFF02]" : "text-white"
                }`}
                onClick={() => {
                  if (cat.id === PET_SERVICES_ID) {
                    handleNavigate({ customRoute: "/petservices" });
                    return;
                  }
                  if (cat.id === CONSULT_VET_ID) {
                    handleNavigate({ customRoute: "/consult-a-vet" });
                    return;
                  }
                  handleNavigate({ categoryId: cat.id });
                }}
              >
                {cat.name}
              </button>

              {/* Arrow for dropdown if subcategories exist */}
              {cat.subcategories?.length > 0 && (
                <button
                  className="ml-1 p-1 hover:text-yellow-300"
                  onClick={() => toggleDropdown(cat.id)}
                >
                  <ChevronDown size={16} />
                </button>
              )}
            </div>

            {/* Mega-menu dropdown */}
            {openDropdown === cat.id && cat.subcategories?.length > 0 && (
              <div className="absolute top-full left-0 bg-white text-black shadow-lg border mt-1 p-4 z-50 flex space-x-6">
                {cat.subcategories.map((sub) => (
                  <div key={sub.id} className="min-w-[150px]">
                    {/* Subcategory image */}
                    {sub.image && (
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="mb-2 w-full h-20 object-cover rounded"
                      />
                    )}

                    {/* Subcategory name */}
                    <h4
                      className="font-semibold mb-2 cursor-pointer hover:text-blue-600"
                      onClick={() => handleNavigate({ subcategoryId: sub.id })}
                    >
                      {sub.name}
                    </h4>

                    {/* Subitems */}
                    <ul className="space-y-1">
                      {sub.subitems.map((item) => (
                        <li key={item.id}>
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="mb-1 w-full h-16 object-cover rounded"
                            />
                          )}
                          <button
                            className="text-gray-700 hover:text-blue-500 text-left"
                            onClick={() =>
                              handleNavigate({ subitemId: item.id, subitemName: item.name })
                            }
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesRowNew;
