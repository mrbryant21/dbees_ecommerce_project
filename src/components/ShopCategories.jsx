import React from "react";

// Mock data for demonstration purposes - ensure you have your actual data
const ShopCategories = [
  { name: "New Born Essentials", image: "/cat_images/newborn_essentials.png" },
  { name: "Baby Clothing", image: "/cat_images/baby_clothing.jpeg" },
  { name: "Toys & Play", image: "/cat_images/toys_and_play.png" },
  { name: "Nursery Decor", image: "/cat_images/nursery_decor.png" },
  { name: "Feeding & Care", image: "/cat_images/feeding_and_care.png" },
  { name: "Bath & Skincare", image: "/cat_images/bath_and_skincare.png" },
];

const CategorySelection = () => {
  return (
    <section className="py-16 mx-auto bg-linear-to-t from-white to-babyBlue/50">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-pink-500 text-center md:text-left">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-hidden shadow-sm">
          {ShopCategories.map((category) => (
            <div
              className="group relative h-64 lg:h-72 overflow-hidden cursor-pointer"
              key={category.name}
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />

              <div className="absolute inset-0 flex items-end justify-center p-4">
                <span className="text-babyPink font-bold text-xl md:text-2xl text-center tracking-wider drop-shadow-md">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySelection;
