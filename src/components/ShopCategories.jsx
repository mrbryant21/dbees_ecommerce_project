import React from "react";
import { Link } from "react-router-dom";
import { categories as categoryData } from "../data/categories";

// Map images to categories from data
const categoryImages = {
  "Newborn Essentials": "/cat_images/newborn_essentials.png",
  Clothing: "/cat_images/baby_clothing.jpeg",
  Toys: "/cat_images/toys_and_play.png",
  Nursery: "/cat_images/nursery_decor.png",
  Feeding: "/cat_images/feeding_and_care.png",
  "Bath & Skincare": "/cat_images/bath_and_skincare.png",
  "Maternity Wear":
    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600",
};

const CategorySelection = () => {
  return (
    <section className="py-16 mx-auto bg-linear-to-t from-white to-babyBlue/50">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-pink-500 text-center md:text-left">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 overflow-hidden shadow-sm">
          {categoryData.map((category) => (
            <Link
              to={`/shop/${category.name.toLowerCase().replace(/ /g, "-")}`}
              className="group relative h-64 lg:h-72 overflow-hidden cursor-pointer"
              key={category.name}
            >
              <img
                src={
                  categoryImages[category.name] ||
                  "/cat_images/newborn_essentials.png"
                }
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />

              <div className="absolute inset-0 flex items-end justify-center p-4">
                <span className="text-babyPink font-bold text-xl md:text-2xl text-center tracking-wider drop-shadow-md">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySelection;
