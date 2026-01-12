import { useState, useEffect } from "react";
import React from "react";
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
import CartButton from "../components/CartButton";
import CategoriesSelection from "../components/ShopCategories";
import TrendingProducts from "../components/TrendingProducts";
import TrustSection from "../components/TrustSection";
import Footer from "../components/Footer";
import NewArrivalsBanners from "../components/NewArrivalsBanners";
import NewArrivalsProducts from "../components/NewArrivalsProducts";
import TestimonialCarousel from "../components/Testimonials";
import { useCart } from "../context/CartContext";
import { fetchProducts } from "../data/products";
import { SkeletonProductCard } from "../components/SkeletonLoader";

const Home = () => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [currency, setCurrency] = useState("GH₵");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const categories = [
    { name: "Newborn Essentials", icon: "👶" },
    { name: "Baby Clothing", icon: "👕" },
    { name: "Toys & Play", icon: "🧸" },
    { name: "Nursery Décor", icon: "🛏️" },
    { name: "Feeding & Care", icon: "🍼" },
    { name: "Bath & Skincare", icon: "🛁" },
  ];

  const featuredProducts = products.filter(p => p.badge === 'Featured' || p.isFeatured).slice(0, 4);

  const formatPrice = (price) => {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const ShopCategories = [
    {
      name: "Newborn Essentials",
      image: "/cat_images/newborn_essentials.png",
    },
    {
      name: "Clothing",
      image: "/cat_images/baby_clothing.jpeg",
    },
    {
      name: "Toys & Play",
      image: "/cat_images/toys_and_play.png",
    },
    {
      name: "Nursery Decor",
      image: "/cat_images/nursery_decor.png",
    },
    {
      name: "Feeding & Care",
      image: "/cat_images/feeding_and_care.png",
    },
    {
      name: "Bath & Skincare",
      image: "/cat_images/baby_and_skincare.png",
    },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section with Categories & Featured Grid */}
      <section className="pt-8 md:pt-0">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-6">
            {/* Categories Sidebar */}
            <aside className="w-64 shrink-0 hidden md:block">
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-4 text-slate-800">
                  Shop by Category
                </h3>
                <nav className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() =>
                        navigate(
                          `/shop/${cat.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`,
                        )
                      }
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-babyPink transition text-left group cursor-pointer"
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                        {cat.name}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Featured banners Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-100 md:h-full">
                {/* Large Featured Card */}
                <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer group relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage: "url('/images/homepage_banner_1.png')",
                    }}
                  />

                  <div className="card-content absolute right-0 bottom-30">
                    <h1 className="text-4xl font-bold text-stone-600 p-6"></h1>
                  </div>
                </div>

                {/* Small Card 1 */}
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer group relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage: "url('/images/homepage_banner_3.png')",
                    }}
                  />
                </div>

                {/* Small Card 2 */}
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer group relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80')",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section py-16 bg-linear-to-t from-babyBlue/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
          <div className="flex flex-col gap-4 justify-between items-center mb-12 md:flex-row md:gap-6 md:items-center">
            <div>
              <h2 className="text-4xl font-bold text-pink-500 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 font-medium">
                Favorite Products for your baby
              </p>
            </div>
            <a
              href="/shop"
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
            {loading ? (
              // Show 8 Skeletons while loading
              [...Array(8)].map((_, index) => (
                <SkeletonProductCard key={index} />
              ))
            ) : (
              featuredProducts.slice(0, 8).map((product) => (
                <div
                  className="bg-white rounded-b-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform cursor-pointer group border border-transparent hover:border-pink-100"
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* Image Container */}
                  <div className="relative bg-linear-to-r from-pink-50 to-blue-50 flex items-center justify-center h-64 overflow-hidden">
                    <img
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
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
                      className={`absolute top-4 right-4 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 transform translate-y-2 group-hover:translate-y-0 ${isInWishlist(product.id)
                        ? "bg-pink-500 text-white opacity-100 translate-y-0"
                        : "bg-white text-gray-400 hover:bg-pink-50 hover:text-pink-500"
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
              ))
            )}
          </div>
        </div>
      </section>

      <CategoriesSelection />

      <NewArrivalsBanners />

      <TrendingProducts />
      {/* Trust & Safety Banners Section */}

      {/* Promo Banner Section */}
      <section>
        <div className="w-full mx-auto">
          <div className="flex flex-col-1 items-center justify-center">
            <a href="">
              <img
                className="w-full h-full object-cover"
                src="/images/promo_banner.png"
                alt="Promotional Banner"
              />
            </a>
          </div>
        </div>
      </section>

      <NewArrivalsProducts />
      <TrustSection />

      <TestimonialCarousel />
      {/* <section className="bg-babyBlue px-6 py-20 mx-auto"></section> */}

      <Footer />
    </div>
  );
};

export default Home;
