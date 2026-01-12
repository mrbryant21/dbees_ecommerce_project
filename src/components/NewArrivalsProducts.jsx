import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Search,
  Menu,
  User,
  ChevronRight,
  Star,
  ArrowRight,
} from "lucide-react";
import CartButton from "./CartButton";
import { fetchProducts } from "../data/products";
import { useCart } from "../context/CartContext";

const NewArrivalsProducts = () => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [currency] = useState("GH₵");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  // Get last 8 products for new arrivals
  const featuredProducts = products.slice(-8);

  const formatPrice = (price) => {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  return (
    <section className="featured-products-section py-16 bg-linear-to-t from-babyBlue/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
        <div className="flex flex-col gap-4 justify-between items-center mb-12 md:flex-row md:gap-6 md:items-center">
          <div>
            <h2 className="text-4xl font-bold text-pink-500 mb-4">
              New Arrivals
            </h2>
            <p className="text-gray-600 font-medium">
              Check out the latest additions to our collection
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-babyPink text-pink-700 font-semibold rounded-full hover:bg-babyBlue hover:text-blue-700 transition-all duration-300"
          >
            View All Products
            {/* The arrow moves slightly to the right on hover */}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <div
              className="bg-white rounded-b-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform cursor-pointer group border border-transparent hover:border-pink-100"
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Image Container */}
              <div className="relative bg-gradient-to-r from-pink-50 to-blue-50 flex items-center justify-center h-64 overflow-hidden">
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

                {/* Heart Button (Right - Fixed placement) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className={`absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 transform translate-y-2 group-hover:translate-y-0 ${isInWishlist(product.id)
                    ? "text-pink-500 opacity-100 translate-y-0"
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
              <div className="p-5">
                <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                  {product.category}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg truncate leading-tight">
                  {product.name}
                </h3>

                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <span className="ml-1 text-sm font-bold text-gray-700">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400 ml-2 border-l border-gray-200 pl-2">
                    {product.reviews} reviews
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-50 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold text-red-500 block">
                      <span className="text-sm font-normal text-gray-500 mr-1">
                        {currency}
                      </span>
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through font-medium">
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
      </div>
    </section>
  );
};

export default NewArrivalsProducts;
