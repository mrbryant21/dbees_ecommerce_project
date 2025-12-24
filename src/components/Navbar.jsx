import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  Heart,
  ChevronDown,
  Sparkles,
  Gift,
  Baby,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(2);

  const categories = [
    { name: "New Arrivals", icon: Sparkles, badge: "New" },
    { name: "Clothing", path: "/shop/clothing" },
    { name: "Toys", path: "/shop/toys" },
    { name: "Nursery", path: "/shop/nursery" },
    { name: "Feeding", path: "/shop/feeding" },
    { name: "Sale", badge: "50% Off", badgeColor: "bg-red-500" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white shadow-md">
      {/* Top Announcement Bar with Gradient */}
      <div className="bg-linear-to-r from-babyPink via-babyBlue to-babyBlue py-2.5 text-center text-sm font-semibold text-stone-600 tracking-wide">
        <div className="flex items-center justify-center gap-2">
          <Gift size={16} className="animate-pulse" />
          <span>FREE SHIPPING ON ORDERS OVER $50 + FREE RETURNS</span>
          <Gift size={16} className="animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-pink-500 transition p-2"
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo with Icon */}
          <div className="shrink-0 flex items-center gap-2 ">
            <Link to="/" className="flex items-center gap-2 group ">
              <img className="max-h-16" src={Logo} alt="" />
            </Link>
          </div>

          {/* Desktop Navigation with Dropdowns */}
          <div className="hidden lg:flex space-x-1 items-center">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path || "/shop"}
                className="relative px-4 py-2 text-xs text-slate-700 hover:text-pink-500 font-medium transition rounded-lg hover:bg-pink-50 group"
              >
                <span className="flex items-center gap-1">
                  {cat.icon && <cat.icon size={16} />}
                  {cat.name}
                  {cat.badge && (
                    <span
                      className={`ml-2 ${cat.badgeColor || "bg-pink-500"} text-white text-[10px] px-2 py-0.5 rounded-full font-bold`}
                    >
                      {cat.badge}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 text-slate-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* User Account */}
            <Link
              to="/profile"
              className="p-2.5 text-slate-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition hidden sm:block"
              aria-label="Account"
            >
              <User size={18} />
            </Link>

            {/* Wishlist with Badge */}
            <Link
              to="/wishlist"
              className="p-2.5 text-slate-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition relative"
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart with Badge */}
            <Link
              to="/cart"
              className="p-2.5 text-slate-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="py-4 border-t border-slate-100 animate-fadeIn">
            <div className="relative">
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg animate-fadeIn">
          <div className="px-4 py-4 space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path || "/shop"}
                className="flex items-center justify-between px-4 py-3 text-slate-700 font-medium hover:bg-pink-50 hover:text-pink-500 rounded-lg transition"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-2">
                  {cat.icon && <cat.icon size={18} />}
                  {cat.name}
                </span>
                {cat.badge && (
                  <span
                    className={`${cat.badgeColor || "bg-pink-500"} text-white text-xs px-2 py-1 rounded-full font-bold`}
                  >
                    {cat.badge}
                  </span>
                )}
              </Link>
            ))}
            <Link
              to="/profile"
              className="flex items-center px-4 py-3 text-slate-700 font-medium hover:bg-pink-50 hover:text-pink-500 rounded-lg transition sm:hidden"
              onClick={() => setIsOpen(false)}
            >
              <User size={18} className="mr-2" />
              My Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
