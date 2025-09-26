

import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import api from "../../api/api";

const FILTERS = {
  Brand: ["Aeolus", "All for Paws", "Arden Grange", "Bayer", "Beapher"],
  Size: ["XSmall", "Small", "Medium", "Large"],
  Breed: ["Beagle", "Golden Retriever", "German Shepherd", "Labrador", "Pug"],
  "Life Stage": ["Puppy", "Adult Dog", "Senior Dog"],
  Flavor: ["Chicken", "Egg", "Fruits", "Vegetables"],
};

const MAP_GROUP_TO_PARAM = {
  Brand: "brand",
  Size: "size",
  Breed: "breed",
  "Life Stage": "life_stage",
  Flavor: "flavor",
};

const SORT_OPTIONS = [
  { value: "bestseller", label: "Best Seller" },
  { value: "relevance", label: "Relevance" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-id", label: "New Arrivals" },
  { value: "-rating", label: "Top Rated" },
];

const PAGE_SIZE = 12;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [paginationCount, setPaginationCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const [masterFiltersOpen, setMasterFiltersOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState(
    Object.keys(FILTERS).reduce((acc, g) => ((acc[g] = false), acc), {})
  );
  const [selectedFilters, setSelectedFilters] = useState(
    () => Object.keys(FILTERS).reduce((acc, g) => ((acc[g] = []), acc), {})
  );
  const [ordering, setOrdering] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamic promo state
  const [promos, setPromos] = useState([]);

  // Expand/collapse groups
  useEffect(() => {
    const newOpen = {};
    Object.keys(FILTERS).forEach((g) => {
      newOpen[g] = masterFiltersOpen;
    });
    setOpenGroups(newOpen);
  }, [masterFiltersOpen]);

  // Parse query params
  useEffect(() => {
    const newSelected = {};
    Object.keys(FILTERS).forEach((g) => {
      const paramKey = MAP_GROUP_TO_PARAM[g];
      const raw = searchParams.get(paramKey);
      newSelected[g] = raw ? raw.split(",").filter(Boolean) : [];
    });
    setSelectedFilters(newSelected);
    setOrdering(searchParams.get("ordering") || "");
    setCurrentPage(parseInt(searchParams.get("page") || "1", 10));
  }, [searchParams]);

  const buildRequest = () => {
    const base = Object.fromEntries([...searchParams]);
    if (!base.page) base.page = 1;
    base.page_size = PAGE_SIZE;
    return base;
  };

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = buildRequest();
        let url = "/products/";
        if (params.subitem_name) url = "/products/filter_by_subitem_name/";

        const { data } = await api.get(url, { params });

        if (data && data.results) {
          setProducts(data.results);
          setPaginationCount(data.count || 0);
        } else if (Array.isArray(data)) {
          setProducts(data);
          setPaginationCount(data.length || 0);
        } else {
          setProducts([]);
          setPaginationCount(0);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const fetchPromos = async () => {
      try {
        const { data } = await api.get("/promos/"); // Fetch promos from backend
        setPromos(data);
      } catch (err) {
        console.error("Error fetching promos:", err);
      }
    };

    fetchProducts();
    fetchPromos();
  }, [searchParams]);

  const setParamsFromState = (overrides = {}) => {
    const sp = new URLSearchParams(searchParams.toString());
    Object.keys(FILTERS).forEach((g) => {
      const key = MAP_GROUP_TO_PARAM[g];
      const values = overrides.selectedFilters?.[g] ?? selectedFilters[g] ?? [];
      if (values.length) sp.set(key, values.join(",")); else sp.delete(key);
    });

    const ord = overrides.ordering !== undefined ? overrides.ordering : ordering;
    if (ord) sp.set("ordering", ord); else sp.delete("ordering");

    const pageToSet = overrides.page !== undefined ? String(overrides.page) : "1";
    sp.set("page", pageToSet);
    sp.set("page_size", String(PAGE_SIZE));
    setSearchParams(sp);
  };

  const toggleFilter = (group, option) => {
    const prev = selectedFilters[group] || [];
    const newVals = prev.includes(option) ? prev.filter((v) => v !== option) : [...prev, option];
    setSelectedFilters((s) => ({ ...s, [group]: newVals }));
    setParamsFromState({ selectedFilters: { ...selectedFilters, [group]: newVals }, page: 1 });
  };

  const toggleGroup = (group) => setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  const handleOrderingChange = (value) => { setOrdering(value); setParamsFromState({ ordering: value, page: 1 }); };
  const handlePageChange = (page) => { const sp = new URLSearchParams(searchParams.toString()); sp.set("page", page); sp.set("page_size", PAGE_SIZE); setSearchParams(sp); };

  const totalPages = Math.max(1, Math.ceil(paginationCount / PAGE_SIZE));

  // Filter products client-side for name substring
  const filteredProducts = products.filter((p) => {
    return Object.keys(FILTERS).every((group) => {
      const options = selectedFilters[group] || [];
      if (!options.length) return true;
      return options.some(opt =>
        (p[MAP_GROUP_TO_PARAM[group]] && p[MAP_GROUP_TO_PARAM[group]].toLowerCase().includes(opt.toLowerCase())) ||
        (p.name && p.name.toLowerCase().includes(opt.toLowerCase()))
      );
    });
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (ordering) {
      case "price": return a.price - b.price;
      case "-price": return b.price - a.price;
      case "-id": return b.id - a.id;
      case "-rating": return b.rating - a.rating;
      default: return 0;
    }
  });

  // Pagination
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedProducts = sortedProducts.slice(start, start + PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-10 gap-6">
      {/* Sidebar */}
      <div className="md:col-span-3">
        <div className="border rounded-lg shadow overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-4 py-3 bg-white text-left"
            onClick={() => setMasterFiltersOpen((v) => !v)}
          >
            <span className="font-semibold">Filters</span>
            <ChevronDown className={`transition-transform ${masterFiltersOpen ? "rotate-180" : ""}`} size={18} />
          </button>

          {masterFiltersOpen && (
            <div className="p-4 bg-white space-y-4">
              {Object.keys(FILTERS).map((group) => (
                <div key={group} className="border-b pb-3">
                  <button className="w-full flex items-center justify-between text-sm font-medium mb-2" onClick={() => toggleGroup(group)}>
                    <span>{group}</span>
                    <ChevronDown className={`transition-transform ${openGroups[group] ? "rotate-180" : ""}`} size={16} />
                  </button>

                  {openGroups[group] && (
                    <div className="space-y-2">
                      {FILTERS[group].map((option) => (
                        <label key={option} className="flex items-center space-x-2 text-sm">
                          <input type="checkbox" checked={(selectedFilters[group] || []).includes(option)} onChange={() => toggleFilter(group, option)} />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

       
        {/* Promo blocks (dynamic, always visible) */}
<div className="space-y-3 mt-3">
  {promos.map((promo) => (
    <div
      key={promo.id}
      className={`p-3 rounded-lg ${promo.bg_class || "bg-gray-50"}`}
    >
       {promo.image && (
        <img
          src={`http://127.0.0.1:8000${promo.image}`} // prepend backend URL
          alt={promo.title}
          className="mt-2 rounded w-full"
        />
      )}
      <h4 className="font-semibold">{promo.title}</h4>
      <p className="text-sm text-gray-600">{promo.description}</p>
     
    </div>
  ))}
</div>



        </div>
      </div>

      {/* Main Content */}
      <div className="md:col-span-7 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Products</h2>
          <select value={ordering} onChange={(e) => handleOrderingChange(e.target.value)} className="border rounded px-3 py-1">
            <option value="">Sort By</option>
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6" style={{ gridAutoRows: "1fr" }}>
          {paginatedProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col h-full">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
              <div className="flex-1 flex flex-col justify-between mt-3">
                <div>
                  <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mt-2 text-sm">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
                    ))}
                    <span className="ml-2 text-gray-600 text-xs">{(product.rating || 0).toFixed(1)}</span>
                  </div>
                  <div className="mt-2 text-lg font-bold">{product.price} ₹</div>
                  {product.weight && <div className="text-gray-500 text-sm">{product.weight}</div>}
                </div>
                {/* <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add to Cart</button> */}
                <button
  onClick={async (e) => {
    e.preventDefault(); // prevent Link navigation
    try {
      await api.post("/cart/add/", {
        product_id: product.id,
        quantity: 1,
      });
      // ✅ Optional toast (since you already use react-hot-toast)
      import("react-hot-toast").then(({ toast }) =>
        toast.success(`${product.name} added to cart`)
      );
      // trigger event to refresh Navbar count
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Failed to add to cart:", err);
      import("react-hot-toast").then(({ toast }) =>
        toast.error("Failed to add to cart")
      );
    }
  }}
  className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
>
  Add to Cart
</button>

              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button disabled={currentPage <= 1} onClick={() => handlePageChange(Math.max(1, currentPage - 1))} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              return <button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`px-3 py-1 border rounded ${currentPage === pageNum ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}>{pageNum}</button>;
            })}
            <button disabled={currentPage >= totalPages} onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
