
import { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, ChevronDown, Search } from "lucide-react"; // added Search
import api from "../../api/api"; 
import { AuthContext } from "../../components/context/AuthContext";
import CategoriesRowNew from "../categories/CategoriesRowNew";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [navbarData, setNavbarData] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const res = await api.get("/navbar/");
        setNavbarData(res.data);
      } catch (err) {
        console.error("Failed to load navbar data:", err);
      }
    };
    fetchNavbar();
  }, []);

  const fetchCartCount = async () => {
    try {
      const res = await api.get("/cart/");
      const count = res.data.items.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    if (user) fetchCartCount();
  }, [user]);

  const linkClasses = ({ isActive }) =>
    isActive ? "text-[#FFFF02] font-semibold" : "hover:text-[#FFFF02]";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 font-montserrat shadow-md">
      {/* Contact Info */}
      <div className="hidden md:flex justify-between items-center bg-[#D9D9D9] text-black text-sm px-6 py-2">
        <div>
          {navbarData?.nav_contact_phone && <span className="mr-4">📞 {navbarData.nav_contact_phone}</span>}
          {navbarData?.nav_contact_email && <span>✉️ {navbarData.nav_contact_email}</span>}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-persianblue text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex flex-col items-start">
            {navbarData?.nav_logo && <img src={navbarData.nav_logo} alt="Logo" className="h-10 w-auto object-contain mb-1" />}
            <span className="text-xl font-bold">{navbarData?.navsite_name || "PetPalooza"}</span>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-2 top-2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search for products"
              className="pl-7 pr-2 py-1 rounded-xl border w-96 text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
                  setSearchQuery("");
                }
              }}
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center text-lg font-semibold">
            <NavLink to="/" className={linkClasses}>Home</NavLink>
            <NavLink to="/about" className={linkClasses}>About</NavLink>
            <NavLink to="/contact" className={linkClasses}>Contact</NavLink>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center space-x-1 hover:text-[#FFFF02] font-semibold"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {user.email} <ChevronDown size={16} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/login" className={linkClasses}>Login</NavLink>
            )}

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `flex items-center ${isActive ? "text-[#FFFF02] font-semibold" : "hover:text-[#FFFF02]"}`
              }
            >
              <ShoppingCart size={20} className="mr-1" />
              Cart {cartCount > 0 && <span className="ml-1 bg-red-500 text-white px-1 rounded text-xs">{cartCount}</span>}
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-persianblue text-white border-t border-brightblue px-6 py-4 space-y-4">
            <NavLink to="/" className={linkClasses}>Home</NavLink>
            <NavLink to="/about" className={linkClasses}>About</NavLink>
            <NavLink to="/contact" className={linkClasses}>Contact</NavLink>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center space-x-1 hover:text-[#FFFF02] font-semibold"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {user.email} <ChevronDown size={16} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg z-50">
                    <button
                      onClick={() => { handleLogout(); setDropdownOpen(false); setIsOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/login" className={linkClasses} onClick={() => setIsOpen(false)}>Login</NavLink>
            )}
            <NavLink to="/cart" className={({ isActive }) =>
              `flex items-center ${isActive ? "text-[#FFFF02] font-semibold" : "hover:text-[#FFFF02]"}`} onClick={() => setIsOpen(false)}>
              <ShoppingCart size={20} className="mr-1" />
              Cart {cartCount > 0 && <span className="ml-1 bg-red-500 text-white px-1 rounded text-xs">{cartCount}</span>}
            </NavLink>
          </div>
        )}

        {/* Categories Row */}
        <CategoriesRowNew />
      </div>
    </nav>
  );
};

export default Navbar;
