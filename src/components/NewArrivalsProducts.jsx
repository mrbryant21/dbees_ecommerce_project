import React from "react";
import { Heart, Search, Menu, User, ChevronRight, Star, ArrowRight } from "lucide-react";
import CartButton from "./CartButton";

const featuredProducts = [
  {
    id: 1,
    name: "Organic Cotton Onesie Set",
    price: "$24.99",
    image: "/images/organic-cotton.jpg",
    rating: 4.9,
    reviews: "(120)",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Wooden Stacking Toy",
    price: "$15.50",
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&q=80",
    rating: 4.7,
    reviews: "(85)",
    badge: "New Arrival",
  },
  {
    id: 3,
    name: "Soft Knit Baby Blanket",
    price: "$32.00",
    image: "/images/soft_knit_baby_blanket.jpg",
    rating: 4.8,
    reviews: "(200)",
    badge: "Sale",
  },
  {
    id: 4,
    name: "Silicone Feeding Set",
    price: "$18.99",
    image: "/images/silicon_feeding_set.jpg",
    rating: 4.6,
    reviews: "(65)",
    badge: null,
  },
];
const NewArrivalsProducts = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <div
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:transalte-y-1 cursor-pointer group"
              key={product.id}
            >
              <div className="relative bg-linear-to-r from-babyPink to-babyBlue flex items-center justify-center h-64">
                <img
                  className="w-full h-full object-cover"
                  src={product.image}
                  alt={product.name}
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                <button className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart
                    size={16}
                    className="text-pink-500 hover:cursor-pointer"
                  />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  {product.name}
                </h3>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="ml-1 text-sm font-bold text-gray-700">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    {product.reviews}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-600">
                    {product.price}
                  </span>
                  <CartButton />
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
