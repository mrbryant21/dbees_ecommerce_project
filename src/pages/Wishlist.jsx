import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { X, Heart, Star, ArrowRight } from "lucide-react";
import CartButton from "../components/CartButton";
import { useState } from "react";

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart, isInWishlist } = useCart();
  const navigate = useNavigate();
  const [currency] = useState("GH₵");

  const formatPrice = (price) => {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">My Wishlist</h1>
          <p className="text-slate-500 font-medium">Keep track of the items you love</p>
        </div>
        <Link
          to="/shop"
          className="group inline-flex items-center gap-2 px-6 py-3 bg-pink-50 text-pink-600 font-semibold rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-sm"
        >
          Continue Shopping
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
          <div className="bg-pink-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={32} className="text-pink-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Your wishlist is empty</h2>
          <p className="text-slate-500 mb-8 max-w-xs mx-auto">
            Looks like you haven't added anything to your wishlist yet.
          </p>
          <Link
            to="/shop"
            className="bg-slate-800 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-500 transition-all duration-300 shadow-lg shadow-slate-100"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-b-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform cursor-pointer group border border-transparent hover:border-pink-100 flex flex-col h-full"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Image Container */}
              <div className="relative bg-gradient-to-r from-pink-50 to-blue-50 flex items-center justify-center h-64 overflow-hidden rounded-t-2xl">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={product.image}
                  alt={product.name}
                />

                {/* Badge (Left) */}
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-pink-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm z-10">
                    {product.badge}
                  </span>
                )}

                {/* Heart Button (Right) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className={`absolute top-4 right-4 p-2 bg-white rounded-full shadow-md transition-all duration-300 z-10 ${isInWishlist(product.id)
                      ? "text-pink-500 opacity-100"
                      : "text-gray-400 hover:bg-pink-50 hover:text-pink-500"
                    }`}
                >
                  <Heart
                    size={18}
                    fill={isInWishlist(product.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>

              {/* Content Container */}
              <div className="p-5 flex flex-col flex-1">
                <div className="text-[10px] text-gray-500 mb-1 font-bold uppercase tracking-widest">
                  {product.category}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base truncate leading-tight">
                  {product.name}
                </h3>

                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <span className="ml-1 text-xs font-bold text-gray-700">
                      {product.rating || "5.0"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 ml-2 border-l border-gray-200 pl-2">
                    {product.reviews || "0"} reviews
                  </span>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-50 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-pink-600 block">
                      <span className="text-xs font-medium text-gray-500 mr-1">
                        {currency}
                      </span>
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through font-medium">
                        {currency} {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <CartButton
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
