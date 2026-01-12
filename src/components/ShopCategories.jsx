import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categories as fallbackCategories, fetchCategories } from "../data/categories";

const CategorySelection = () => {
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
      setLoading(false);
    };
    loadCategories();
  }, []);

  return (
    <section className="py-16 mx-auto bg-linear-to-t from-white to-babyBlue/50">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-pink-500 text-center md:text-left">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 overflow-hidden shadow-sm">
          {categories.map((category) => (
            <Link
              to={`/shop/${category.slug}`}
              className="group relative h-64 lg:h-72 overflow-hidden cursor-pointer"
              key={category.id || category.slug}
            >
              <img
                src={category.image || "/cat_images/newborn_essentials.png"}
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
