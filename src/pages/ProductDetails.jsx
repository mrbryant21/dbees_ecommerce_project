import React, { useState } from "react";
import {
  Star,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Share2,
  ArrowRight,
} from "lucide-react";
import CartButton from "../components/CartButton";
import Footer from "../components/Footer";

const ProductDetails = () => {
  // --- DUMMY DATA ---
  const product = {
    id: 1,
    name: "Organic Cotton Knitted Onesie",
    price: 1250.0,
    originalPrice: 1500.0, // For strike-through effect
    description:
      "Crafted from 100% GOTS certified organic cotton, this knitted onesie is designed for ultimate comfort and breathability. Featuring natural wood buttons and a seamless design to prevent irritation on delicate skin.",
    rating: 4.9,
    reviews: 128,
    images: [
      "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?auto=format&fit=crop&q=80&w=800", // Main
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800", // Detail 1
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800", // Detail 2
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800", // Lifestyle
    ],
    colors: [
      { name: "Ocean Blue", value: "bg-blue-200" },
      { name: "Soft Pink", value: "bg-pink-200" },
      { name: "Sage Green", value: "bg-green-200" },
      { name: "Cream", value: "bg-[#F5F5DC]" },
    ],
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M"],
  };

  // --- STATE ---
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("6-12M");
  const [quantity, setQuantity] = useState(1);
  const [currency] = useState("GH₵");
  const [activeTab, setActiveTab] = useState("details");

  const formatPrice = (price) => {
    return price.toLocaleString(undefined, { minimumFractionDigits: 2 });
  };

  return (
    <div className="bg-white min-h-screen pt-16 font-sans">
      {/* --- BREADCRUMBS --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <span className="hover:text-pink-500 cursor-pointer">Home</span>
          <ChevronRight size={14} />
          <span className="hover:text-pink-500 cursor-pointer">Clothing</span>
          <ChevronRight size={14} />
          <span className="hover:text-pink-500 cursor-pointer">Baby Boy</span>
          <ChevronRight size={14} />
          <span className="font-bold text-gray-800">{product.name}</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* --- LEFT: IMMERSIVE GALLERY (7 Cols) --- */}
          <div className="lg:col-span-7">
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnail Grid */}
              <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 shrink-0 pb-2 md:pb-0">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-square w-20 md:w-full rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === index
                        ? "border-pink-500 ring-2 ring-pink-200 ring-offset-2"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative flex-1 aspect-4/3 rounded-2xl overflow-hidden bg-gray-100 group cursor-zoom-in">
                <img
                  src={product.images[activeImage]}
                  alt="Product View"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  -20% OFF
                </div>
                <button className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:text-red-500 transition-all">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            {/* Product Details Text (Placed below images for better flow) */}
            <div className="mt-12 space-y-8">
              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Trust Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">
                      Free Shipping
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      On orders over {currency} 200
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">
                      Secure Payment
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      100% protected payments
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                    <RotateCcw size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">
                      Easy Returns
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      30 day return policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: STICKY INFO PANEL (5 Cols) --- */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 space-y-8">
              {/* Header */}
              <div>
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2">
                    {product.name}
                  </h1>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Share2 size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-2xl border border-yellow-100">
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="font-bold text-yellow-700 text-sm">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 underline decoration-gray-300 hover:text-pink-500 cursor-pointer">
                    Read {product.reviews} reviews
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-pink-600">
                    {currency} {formatPrice(product.price)}
                  </span>
                  <span className="text-lg text-gray-400 line-through font-medium">
                    {currency} {formatPrice(product.originalPrice)}
                  </span>
                </div>
              </div>

              {/* Color Selector */}
              <div>
                <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Color:{" "}
                  <span className="text-pink-600">
                    {product.colors[selectedColor].name}
                  </span>
                </span>
                <div className="flex gap-3 mt-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedColor === index
                          ? "border-pink-500 ring-2 ring-pink-100 ring-offset-2 scale-110"
                          : "border-transparent hover:scale-110"
                      }`}
                    >
                      <div
                        className={`w-full h-full rounded-full ${color.value} shadow-sm`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Select Size
                  </span>
                  <button className="text-xs text-gray-500 underline hover:text-pink-500">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-2xl text-sm font-bold transition-all border-2 ${
                        selectedSize === size
                          ? "border-pink-500 bg-pink-50 text-pink-600"
                          : "border-gray-100 text-gray-600 hover:border-gray-300 bg-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center bg-gray-50 rounded-2xl px-4 border border-gray-200 h-14">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-gray-500 hover:text-pink-600 transition"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-8 text-center font-bold text-lg text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-gray-500 hover:text-pink-600 transition"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* Add To Cart Button */}
                  <button className="flex-1 bg-gray-900 text-white font-bold rounded-2xl py-4 md:h-14 flex items-center justify-center gap-3 shadow-lg shadow-gray-200 hover:bg-pink-600 hover:shadow-pink-200 hover:-translate-y-1 transition-all duration-300">
                    <ShoppingBag size={20} />
                    <span>
                      Add to Cart - {currency}{" "}
                      {formatPrice(product.price * quantity)}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- TABS SECTION --- */}
        <div className="mt-20 border-t border-gray-100 pt-12">
          <div className="flex flex-wrap gap-8 border-b border-gray-100">
            {[
              { id: "details", label: "Product Details" },
              { id: "reviews", label: `Reviews (${product.reviews})` },
              { id: "manufacturer", label: "Manufactured By" },
              { id: "shipping", label: "Shipping & Returns" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-lg font-bold transition-all relative ${
                  activeTab === tab.id
                    ? "text-pink-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="py-10">
            {activeTab === "details" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fadeIn">
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-gray-900">
                    Product Specifications
                  </h4>
                  <ul className="space-y-4">
                    {[
                      { label: "Material", value: "100% Organic Cotton" },
                      { label: "Certification", value: "GOTS Certified" },
                      { label: "Weight", value: "250g" },
                      { label: "Care", value: "Machine Wash Cold" },
                      { label: "Origin", value: "Made in Ghana" },
                    ].map((spec, i) => (
                      <li
                        key={i}
                        className="flex justify-between border-b border-gray-50 pb-2"
                      >
                        <span className="text-gray-500">{spec.label}</span>
                        <span className="font-bold text-gray-800">
                          {spec.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-pink-50 p-8 rounded-3xl">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    Why You'll Love It
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Our knitted onesies are designed with both style and
                    functionality in mind. The organic cotton ensures that your
                    baby stays comfortable all day long, while the natural wood
                    buttons add a touch of timeless elegance. Perfect for
                    gifting or as a staple in your little one's wardrobe.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Review Summary */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="bg-gray-50 p-8 rounded-3xl text-center">
                      <div className="text-5xl font-extrabold text-gray-900 mb-2">
                        {product.rating}
                      </div>
                      <div className="flex justify-center text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={20} fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-gray-500">
                        Based on {product.reviews} reviews
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-bold text-gray-900">Add a Review</h4>
                      <p className="text-sm text-gray-500">
                        Your email address will not be published.
                      </p>
                      <div className="flex gap-1 text-gray-300">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={24}
                            className="cursor-pointer hover:text-yellow-400"
                          />
                        ))}
                      </div>
                      <textarea
                        placeholder="Write your review here..."
                        className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-pink-500 focus:outline-none h-32 transition-colors"
                      />
                      <button className="w-full bg-pink-600 text-white font-bold py-3 rounded-xl hover:bg-pink-700 transition-colors">
                        Submit Review
                      </button>
                    </div>
                  </div>

                  {/* Review List */}
                  <div className="lg:col-span-8 space-y-8">
                    {[
                      {
                        name: "Sarah M.",
                        date: "Oct 12, 2025",
                        rating: 5,
                        comment:
                          "Absolutely beautiful! The quality is even better than I expected. So soft for my baby's skin.",
                      },
                      {
                        name: "James K.",
                        date: "Sep 28, 2025",
                        rating: 4,
                        comment:
                          "Great design and fits perfectly. Shipping was a bit slow but the product is worth it.",
                      },
                    ].map((review, i) => (
                      <div key={i} className="border-b border-gray-100 pb-8">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-gray-900">
                            {review.name}
                          </h5>
                          <span className="text-sm text-gray-400">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex text-yellow-400 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                          ))}
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "manufacturer" && (
              <div className="animate-fadeIn max-w-3xl">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-2xl">
                    DB
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">
                      D'Bees Shop Ghana
                    </h4>
                    <p className="text-gray-500">
                      Premium Baby Essentials since 2020
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  D'Bees Shop is a locally owned Ghanaian brand dedicated to
                  providing high-quality, sustainable, and stylish baby
                  products. We work closely with local artisans and use only the
                  finest organic materials to ensure every piece we create is
                  safe for your baby and kind to the planet.
                </p>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-gray-900">
                    Shipping Info
                  </h4>
                  <p className="text-gray-600">
                    We offer nationwide delivery across Ghana. Standard shipping
                    takes 2-3 business days within Accra and 3-5 business days
                    for other regions.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Accra: GH₵ 20.00</li>
                    <li>• Kumasi: GH₵ 45.00</li>
                    <li>• Other Regions: GH₵ 60.00+</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-gray-900">
                    Return Policy
                  </h4>
                  <p className="text-gray-600">
                    If you're not completely satisfied with your purchase, you
                    can return it within 30 days for a full refund or exchange.
                    Items must be unworn and in their original packaging.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- RELATED PRODUCTS --- */}
        <div className="my-24">
          <div className="flex flex-col justify-center md:flex-row md:justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                You May Also Like
              </h2>
              <p className="text-gray-500 mt-2">
                Handpicked recommendations for you
              </p>
            </div>
            <a
              href="/Shop"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                id: 2,
                name: "Wooden Stacking Rainbow",
                price: 450.0,
                image:
                  "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600",
                category: "Toys",
                rating: 4.7,
                reviews: "(85)",
              },
              {
                id: 3,
                name: "Soft Knit Baby Blanket",
                price: 890.0,
                image:
                  "https://images.unsplash.com/photo-1520031641899-25cd536aabb0?auto=format&fit=crop&q=80&w=600",
                category: "Nursery",
                rating: 4.8,
                reviews: "(200)",
              },
              {
                id: 4,
                name: "Silicone Feeding Set",
                price: 320.5,
                image:
                  "https://images.unsplash.com/photo-1584143997635-64d88e04d49a?auto=format&fit=crop&q=80&w=600",
                category: "Feeding",
                rating: 4.6,
                reviews: "(65)",
              },
              {
                id: 5,
                name: "Plush Teddy Bear",
                price: 250.0,
                image:
                  "https://images.unsplash.com/photo-1555445054-01bf80c48e85?auto=format&fit=crop&q=80&w=600",
                category: "Toys",
                rating: 4.9,
                reviews: "(310)",
              },
            ].map((item) => (
              <div
                className="bg-white rounded-b-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-transparent hover:border-pink-100 flex flex-col"
                key={item.id}
              >
                {/* Image Container */}
                <div className="relative bg-gradient-to-r from-pink-50 to-blue-50 flex items-center justify-center h-64 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.image}
                    alt={item.name}
                  />

                  {/* Heart Button (Right - Fixed placement) */}
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-50 z-10 hover:text-pink-500 transform translate-y-2 group-hover:translate-y-0">
                    <Heart size={18} />
                  </button>
                </div>

                {/* Content Container */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                      {item.category}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg truncate leading-tight">
                      {item.name}
                    </h3>

                    <div className="flex items-center mb-4">
                      <div className="flex items-center text-yellow-400">
                        <Star size={16} fill="currentColor" />
                        <span className="ml-1 text-sm font-bold text-gray-700">
                          {item.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400 ml-2 border-l border-gray-200 pl-2">
                        {item.reviews} reviews
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-50 flex flex-col space-y-3">
                    <span className="text-xl font-extrabold text-red-500 block">
                      <span className="text-sm font-normal text-gray-500 mr-1">
                        {currency}
                      </span>
                      {formatPrice(item.price)}
                    </span>
                    <CartButton />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
