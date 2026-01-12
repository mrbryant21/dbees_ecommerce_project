import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  Heart,
  Sparkles,
  Gift,
  ChevronRight,
} from "lucide-react";
import { categories as fallbackCategories, fetchCategories } from "../data/categories";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartCount, wishlistCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState(null); // Tracks which menu is open
  const [mobileSubMenu, setMobileSubMenu] = useState(null); // Tracks which mobile sub-menu is open
  const [categories, setCategories] = useState(fallbackCategories);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // Load categories from Firestore
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  // Close dropdowns when clicking outside
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // --- CONFIGURATION DATA ---
  // Map images and colors to categories from data
  const categoryExtras = {
    "Newborn Essentials": {
      image:
        "/cat_images/newborn_essentials.png",
      color: "bg-pink-100",
    },
    Clothing: {
      image: "/images/baby_clothing.webp",
      color: "bg-blue-100",
    },
    Toys: {
      image:
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600",
      color: "bg-yellow-100",
    },
    Nursery: {
      image: "/images/baby_nursery.jpg",
      color: "bg-green-100",
    },
    Feeding: {
      image: "/images/baby_feeding.webp",
      color: "bg-orange-100",
    },
    "Bath & Skincare": {
      image:
        "/cat_images/bath_and_skincare.png",
      color: "bg-teal-100",
    },
    "Maternity Wear": {
      image:
        "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600",
      color: "bg-purple-100",
    },
  };

  // Fixed lists for Gender and Age (Shared across all tabs)
  const genders = ["Baby Boy", "Baby Girl", "Unisex / Neutral"];
  const ages = ["0 - 9 Months", "3 - 24 Months", "1 - 6 Years"];

  return (
    <nav
      className="fixed w-full z-50 bg-white shadow-md"
      onMouseLeave={() => setActiveMenu(null)} // Close menu when leaving the whole nav
    >
      {/* Top Announcement Bar */}
      <div className="bg-linear-to-r from-pink-200 via-blue-200 to-blue-200 py-2.5 text-center text-sm font-semibold text-stone-600 tracking-wide relative z-50">
        <div className="flex items-center justify-center gap-2">
          <Gift size={16} className="animate-pulse text-pink-600" />
          <span>FREE SHIPPING ON ORDERS OVER $50 + FREE RETURNS</span>
          <Gift size={16} className="animate-pulse text-pink-600" />
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative bg-white z-40">
        {/* Main Navbar Header */}
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-pink-500 transition p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="shrink-0 flex items-center gap-2">
            <Link
              to="/"
              onClick={() => setActiveMenu(null)}
              className="flex items-center gap-2 group"
            >
              {/* Replace with your actual Logo */}
              <img className="max-h-12" src="/images/logo.png" alt="Logo" />
            </Link>
          </div>

          {/* DESKTOP NAVIGATION ITEMS */}
          <div className="hidden lg:flex space-x-8 items-center h-full">
            {/* 1. New Arrivals (No Dropdown usually, or simple) */}
            <Link
              to="/shop/new"
              onClick={() => setActiveMenu(null)}
              className="flex items-center gap-1 text-sm font-bold text-slate-700 hover:text-pink-500 transition"
            >
              <Sparkles size={16} className="text-yellow-400" />
              New Arrivals
            </Link>

            {/* 2. Dynamic Categories with MEGA MENU */}
            {categories.map((item) => (
              <div
                key={item.id || item.slug}
                className="h-full flex items-center"
                onMouseEnter={() => setActiveMenu(item.name)}
              >
                <Link
                  to={`/shop/${item.slug}`}
                  onClick={() => setActiveMenu(null)}
                  className={`text-sm font-medium transition py-2 border-b-2 ${activeMenu === item.name
                    ? "text-pink-500 border-pink-500"
                    : "text-slate-700 border-transparent hover:text-pink-500"
                    }`}
                >
                  {item.name}
                </Link>
              </div>
            ))}

            {/* 3. Sale Item */}
            <Link
              to="/shop/sale"
              onClick={() => setActiveMenu(null)}
              className="text-sm font-bold text-red-500 hover:text-red-600 transition flex items-center gap-2"
            >
              Sale
              <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                50% Off
              </span>
            </Link>
          </div>

          {/* Action Icons (Search, User, Cart) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 text-slate-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition"
            >
              <Search size={20} />
            </button>

            <Link
              to="/profile"
              onClick={() => setActiveMenu(null)}
              className="p-2.5 text-slate-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition hidden sm:block"
            >
              <User size={20} />
            </Link>

            <Link
              to="/wishlist"
              onClick={() => setActiveMenu(null)}
              className="p-2.5 text-slate-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition relative"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              onClick={() => setActiveMenu(null)}
              className="p-2.5 text-slate-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="py-4 border-t border-slate-100 animate-fadeIn absolute top-full left-0 w-full bg-white px-4 sm:px-8 shadow-md z-50">
            <div className="relative max-w-3xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search for products, categories..."
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-pink-500 focus:outline-none text-slate-700 placeholder-slate-400"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(e);
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 transition-all duration-300 origin-top z-30 ${activeMenu
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-2"
          }`}
        onMouseEnter={() => setActiveMenu(activeMenu)} // Keep open while hovering the menu itself
        onMouseLeave={() => setActiveMenu(null)}
      >
        {activeMenu && (
          <div className="max-w-7xl mx-auto px-8 py-10">
            <div className="grid grid-cols-4 gap-8">
              {/* Part 1: Shop By Category */}
              <div className="col-span-1 border-r border-slate-100 pr-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Shop {activeMenu}
                </h3>
                <ul className="space-y-3">
                  {categories
                    .find((c) => c.name === activeMenu)
                    ?.subcategories.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          to={`/shop/${categories.find((c) => c.name === activeMenu)?.slug}/${cat.slug}`}
                          onClick={() => setActiveMenu(null)}
                          className="text-slate-600 hover:text-pink-500 hover:translate-x-1 transition-all inline-block font-medium"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  <li className="pt-2">
                    <Link
                      to={`/shop/${categories.find((c) => c.name === activeMenu)?.slug}`}
                      onClick={() => setActiveMenu(null)}
                      className="text-pink-500 font-bold text-sm flex items-center gap-1 group"
                    >
                      View All {activeMenu}
                      <ChevronRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Part 2: Shop by Gender */}
              <div className="col-span-1 border-r border-slate-100 pr-6 pl-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Shop By Gender
                </h3>
                <ul className="space-y-3">
                  {genders.map((gender) => (
                    <li key={gender}>
                      <Link
                        to={`/shop?gender=${gender.split(" ")[1] || gender}`}
                        onClick={() => setActiveMenu(null)}
                        className="text-slate-600 hover:text-pink-500 transition-colors block font-medium"
                      >
                        {gender}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Part 3: Shop by Age */}
              <div className="col-span-1 pr-6 pl-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Shop By Age
                </h3>
                <div className="space-y-3">
                  {ages.map((age) => (
                    <Link
                      key={age}
                      to={`/shop?age=${age}`}
                      onClick={() => setActiveMenu(null)}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-pink-200 hover:bg-pink-50 transition group"
                    >
                      <span className="text-slate-600 font-medium group-hover:text-pink-600">
                        {age}
                      </span>
                      <ChevronRight
                        size={14}
                        className="text-slate-300 group-hover:text-pink-500"
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Part 4: Featured Image */}
              <div className="col-span-1">
                <div className="relative h-full w-full rounded-2xl overflow-hidden group shadow-md">
                  <img
                    src={
                      categoryExtras[activeMenu]?.image ||
                      "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?auto=format&fit=crop&q=80&w=600"
                    }
                    alt={activeMenu}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <span className="text-white text-lg font-bold mb-2">
                      {activeMenu} Collection
                    </span>
                    <Link
                      to={`/shop/${activeMenu.toLowerCase().replace(/ /g, "-")}`}
                      onClick={() => setActiveMenu(null)}
                      className="bg-white text-slate-900 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-pink-500 hover:text-white transition-colors w-max text-center"
                    >
                      Explore Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 w-[85%] max-w-sm h-full bg-white z-50 shadow-2xl transition-transform duration-300 ease-out lg:hidden flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Mobile Menu Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img className="h-10" src="/images/logo.png" alt="Logo" />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-pink-500 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 space-y-1">
            {/* New Arrivals */}
            <Link
              to="/shop/new"
              className="flex items-center gap-3 px-4 py-4 text-slate-700 font-bold hover:bg-pink-50 rounded-xl transition"
              onClick={() => setIsOpen(false)}
            >
              <Sparkles size={18} className="text-yellow-400" />
              New Arrivals
            </Link>

            {/* Dynamic Categories */}
            {categories.map((cat) => (
              <div key={cat.id || cat.slug} className="space-y-1">
                <button
                  onClick={() =>
                    setMobileSubMenu(
                      mobileSubMenu === cat.name ? null : cat.name,
                    )
                  }
                  className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all ${mobileSubMenu === cat.name
                    ? "bg-pink-50 text-pink-600 font-bold"
                    : "text-slate-700 font-semibold hover:bg-slate-50"
                    }`}
                >
                  <span>{cat.name}</span>
                  <ChevronRight
                    size={18}
                    className={`transition-transform duration-300 ${mobileSubMenu === cat.name ? "rotate-90" : ""
                      }`}
                  />
                </button>

                {/* Sub-menu Accordion */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileSubMenu === cat.name
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="pl-6 pr-4 py-2 space-y-4 border-l-2 border-pink-100 ml-6 my-2">
                    {/* Subcategories */}
                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                        Categories
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.slug}
                            to={`/shop/${cat.slug}/${sub.slug}`}
                            className="text-sm text-slate-600 hover:text-pink-500 py-1 block"
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Gender/Age Quick Links */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                          Gender
                        </h4>
                        {genders.slice(0, 2).map((g) => (
                          <Link
                            key={g}
                            to={`/shop?gender=${g.split(" ")[1] || g}`}
                            className="text-xs text-slate-500 hover:text-pink-500 py-1 block"
                            onClick={() => setIsOpen(false)}
                          >
                            {g}
                          </Link>
                        ))}
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                          Age
                        </h4>
                        {ages.slice(0, 2).map((a) => (
                          <Link
                            key={a}
                            to={`/shop?age=${a}`}
                            className="text-xs text-slate-500 hover:text-pink-500 py-1 block"
                            onClick={() => setIsOpen(false)}
                          >
                            {a}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      to={`/shop/${cat.name.toLowerCase().replace(/ /g, "-")}`}
                      className="text-pink-500 font-bold text-xs flex items-center gap-1 pt-2"
                      onClick={() => setIsOpen(false)}
                    >
                      View All {cat.name}
                      <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Sale */}
            <Link
              to="/shop/sale"
              className="flex items-center justify-between px-4 py-4 text-red-500 font-bold hover:bg-red-50 rounded-xl transition"
              onClick={() => setIsOpen(false)}
            >
              <span>Sale</span>
              <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                50% Off
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
              <User size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Welcome to D'Bees
              </p>
              <Link
                to="/auth"
                className="text-xs text-pink-500 font-semibold hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Login or Register
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/wishlist"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-pink-200 transition"
              onClick={() => setIsOpen(false)}
            >
              <Heart size={18} />
              Wishlist
            </Link>
            <Link
              to="/cart"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-pink-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-pink-100 hover:bg-pink-600 transition"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag size={18} />
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
