import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"; // Ensure this path is correct
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // Tracks which menu is open

  // Dummy data for cart/wishlist
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(2);

  // --- CONFIGURATION DATA ---
  // This defines what shows up in the "Shop By Category" column for each tab
  const navigationData = {
    Clothing: {
      categories: [
        "Bodysuits",
        "Rompers & Jumpsuits",
        "Sleepwear",
        "Dresses",
        "Tops & Tees",
        "Bottoms",
        "Outerwear",
      ],
      image:
        "/images/baby_clothing.webp",
      color: "bg-blue-100",
    },
    Toys: {
      categories: [
        "Soft Plush Toys",
        "Wooden Toys",
        "Educational & STEM",
        "Rattles & Teethers",
        "Activity Gyms",
        "Dolls & Action Figures",
      ],
      image:
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600",
      color: "bg-yellow-100",
    },
    Nursery: {
      categories: [
        "Cribs & Bassinets",
        "Bedding Sets",
        "Decor & Wall Art",
        "Storage & Organization",
        "Lighting",
        "Nursing Chairs",
      ],
      image:
        "/images/baby_nursery.jpg",
      color: "bg-green-100",
    },
    Feeding: {
      categories: [
        "Bottles & Nipples",
        "High Chairs",
        "Bibs & Burp Cloths",
        "Breastfeeding",
        "Toddler Utensils",
        "Food Processors",
      ],
      image:
        "/images/baby_feeding.webp",
      color: "bg-orange-100",
    },
    "Maternity Wear": {
      categories: [
        "Dresses",
        "Tops",
        "Leggings",
        "Nursing Bras",
        "Loungewear",
        "Postpartum Care",
      ],
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
      <div className="bg-gradient-to-r from-pink-200 via-blue-200 to-blue-200 py-2.5 text-center text-sm font-semibold text-stone-600 tracking-wide relative z-50">
        <div className="flex items-center justify-center gap-2">
          <Gift size={16} className="animate-pulse text-pink-600" />
          <span>FREE SHIPPING ON ORDERS OVER $50 + FREE RETURNS</span>
          <Gift size={16} className="animate-pulse text-pink-600" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative bg-white z-40">
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
            <Link to="/" className="flex items-center gap-2 group">
              {/* Replace with your actual Logo */}
              <img className="max-h-12" src={Logo} alt="Logo" />
              {/* Fallback text if logo image fails */}
              {!Logo && (
                <span className="text-2xl font-bold text-pink-500">
                  BabyShop
                </span>
              )}
            </Link>
          </div>

          {/* DESKTOP NAVIGATION ITEMS */}
          <div className="hidden lg:flex space-x-8 items-center h-full">
            {/* 1. New Arrivals (No Dropdown usually, or simple) */}
            <Link
              to="/shop/new"
              className="flex items-center gap-1 text-sm font-bold text-slate-700 hover:text-pink-500 transition"
            >
              <Sparkles size={16} className="text-yellow-400" />
              New Arrivals
            </Link>

            {/* 2. Dynamic Categories with MEGA MENU */}
            {Object.keys(navigationData).map((item) => (
              <div
                key={item}
                className="h-full flex items-center"
                onMouseEnter={() => setActiveMenu(item)}
              >
                <Link
                  to={`/shop/${item.toLowerCase().replace(" ", "-")}`}
                  className={`text-sm font-medium transition py-2 border-b-2 ${
                    activeMenu === item
                      ? "text-pink-500 border-pink-500"
                      : "text-slate-700 border-transparent hover:text-pink-500"
                  }`}
                >
                  {item}
                </Link>
              </div>
            ))}

            {/* 3. Sale Item */}
            <Link
              to="/shop/sale"
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
              className="p-2.5 text-slate-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition hidden sm:block"
            >
              <User size={20} />
            </Link>

            <Link
              to="/wishlist"
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
              />
            </div>
          </div>
        )}
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 transition-all duration-300 origin-top z-30 ${
          activeMenu
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
        onMouseEnter={() => setActiveMenu(activeMenu)} // Keep open while hovering the menu itself
        onMouseLeave={() => setActiveMenu(null)}
      >
        {activeMenu && navigationData[activeMenu] && (
          <div className="max-w-7xl mx-auto px-8 py-10">
            <div className="grid grid-cols-4 gap-8">
              {/* Part 1: Shop By Category */}
              <div className="col-span-1 border-r border-slate-100 pr-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Shop {activeMenu}
                </h3>
                <ul className="space-y-3">
                  {navigationData[activeMenu].categories.map((cat) => (
                    <li key={cat}>
                      <Link
                        to={`/shop/${activeMenu.toLowerCase()}/${cat.toLowerCase().replace(/ /g, "-")}`}
                        className="text-slate-600 hover:text-pink-500 hover:translate-x-1 transition-all inline-block font-medium"
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2">
                    <Link
                      to={`/shop/${activeMenu.toLowerCase()}`}
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
                        to="#"
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
                      to="#"
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
                    src={navigationData[activeMenu].image}
                    alt={activeMenu}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <span className="text-white text-lg font-bold mb-2">
                      {activeMenu} Collection
                    </span>
                    <button className="bg-white text-slate-900 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-pink-500 hover:text-white transition-colors w-max">
                      Explore Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu (Simplified for mobile, no Mega Menu logic usually needed here) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg h-screen overflow-y-auto pb-20">
          <div className="px-4 py-4 space-y-1">
            {Object.keys(navigationData).map((cat) => (
              <Link
                key={cat}
                to={`/shop/${cat.toLowerCase()}`}
                className="flex items-center justify-between px-4 py-3 text-slate-700 font-medium hover:bg-pink-50 hover:text-pink-500 rounded-lg transition"
                onClick={() => setIsOpen(false)}
              >
                {cat}
              </Link>
            ))}
            <Link
              to="/shop/sale"
              className="flex items-center justify-between px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              Sale
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
