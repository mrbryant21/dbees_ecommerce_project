import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import {
  Heart,
  Search,
  Star,
  Filter,
  ChevronDown,
  SlidersHorizontal,
  Check,
  LayoutGrid,
  List,
} from "lucide-react";
import CartButton from "../components/CartButton";
import PriceRangeSlider from "../components/PriceRangeSlider";
import Footer from "../components/Footer";
import { fetchProducts } from "../data/products";
import { categories as fallbackCategories, fetchCategories } from "../data/categories";
import { useCart } from "../context/CartContext";

const Category = () => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { category: categoryParam, subcategory: subcategoryParam } =
    useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [currency] = useState("GH₵");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedAges, setSelectedAges] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [sortBy, setSortBy] = useState("Featured");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories()
      ]);
      setAllProducts(productsData);
      setCategories(categoriesData);
      setLoading(false);
    };
    loadData();
  }, []);

  // Handle query parameters (gender, age) from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genderParam = params.get("gender");
    const ageParam = params.get("age");
    const searchParam = params.get("search");

    setSelectedGenders(genderParam ? [genderParam] : []);
    setSelectedAges(ageParam ? [ageParam] : []);
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);

  // Normalize params - we want to keep the original slug for matching
  const activeCategory = categories.find(c => c.slug === categoryParam) ||
    categories.find(c => c.name.toLowerCase().replace(/ /g, "-") === categoryParam);

  const currentCategory = activeCategory ? activeCategory.name : (categoryParam ? categoryParam.replace(/-/g, " ") : "All");

  const activeSubcategory = activeCategory?.subcategories.find(s => s.slug === subcategoryParam) ||
    activeCategory?.subcategories.find(s => s.name.toLowerCase().replace(/ /g, "-") === subcategoryParam);

  const currentSubcategory = activeSubcategory ? activeSubcategory.name : (subcategoryParam ? subcategoryParam.replace(/-/g, " ") : null);

  const categorySlug = activeCategory?.slug || categoryParam;
  const subcategorySlug = activeSubcategory?.slug || subcategoryParam;

  // Filter products based on category, subcategory, and other filters
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        // Category Filter
        if (currentCategory !== "All") {
          const productCategory = product.category.toLowerCase();
          const targetCategory = currentCategory.toLowerCase();
          const targetSlug = categorySlug?.toLowerCase();

          if (productCategory !== targetCategory && productCategory !== targetSlug) {
            return false;
          }
        }

        // Subcategory Filter
        if (currentSubcategory) {
          const productSubcat = product.subcategory.toLowerCase();
          const targetSubcat = currentSubcategory.toLowerCase();
          const targetSubSlug = subcategorySlug?.toLowerCase();

          if (productSubcat !== targetSubcat && productSubcat !== targetSubSlug) {
            return false;
          }
        }

        // Price Filter
        if (product.price < priceRange.min || product.price > priceRange.max) {
          return false;
        }

        // Age Filter
        if (selectedAges.length > 0 && !selectedAges.includes(product.age)) {
          return false;
        }

        // Gender Filter
        if (
          selectedGenders.length > 0 &&
          !selectedGenders.includes(product.gender)
        ) {
          return false;
        }

        // Search Filter
        // Search Filter (Multi-keyword)
        if (searchQuery) {
          const searchTokens = searchQuery.toLowerCase().split(/[\s-]+/).filter(Boolean);
          const productText = `
            ${product.name} 
            ${product.category} 
            ${product.subcategory || ""}
          `.toLowerCase();

          // Check if EVERY token in the search query exists in the product text
          const matches = searchTokens.every(token => productText.includes(token));
          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "Price: Low to High") return a.price - b.price;
        if (sortBy === "Price: High to Low") return b.price - a.price;
        if (sortBy === "Newest Arrivals") return b.id - a.id; // Assuming higher ID is newer
        return 0; // Featured (default)
      });
  }, [
    currentCategory,
    currentSubcategory,
    priceRange,
    selectedAges,
    selectedGenders,
    sortBy,
    searchQuery,
    allProducts,
  ]);

  // Data Options
  const ageOptions = [
    "0-6 Months",
    "6-12 Months",
    "12-24 Months",
    "2-4 Years",
    "4-6 Years",
  ];
  const genderOptions = ["Boy", "Girl", "Unisex"];
  const sortOptions = [
    "Featured",
    "Price: Low to High",
    "Price: High to Low",
    "Newest Arrivals",
  ];

  // Toggle Selection Helper
  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".filter-dropdown-container")) {
        setActiveFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const colors = [
    { name: "Blue", class: "bg-blue-400" },
    { name: "Pink", class: "bg-pink-400" },
    { name: "Green", class: "bg-green-400" },
    { name: "Yellow", class: "bg-yellow-400" },
    { name: "White", class: "bg-white border border-gray-200" },
    { name: "Black", class: "bg-gray-800" },
  ];

  // Helper function to format price
  const formatPrice = (price) => {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Spacer for fixed Navbar */}
      <div className="h-24"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- HEADER ROW: Title & Search --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 capitalize">
              {currentSubcategory || currentCategory}
            </h1>
            <p className="text-gray-500 mt-1">
              Showing {filteredProducts.length} results
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 lg:w-96">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            <div className="flex items-center bg-white border-2 border-gray-200 rounded-full p-1 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full transition-all ${viewMode === "grid"
                  ? "bg-pink-500 text-white shadow-sm"
                  : "text-gray-400 hover:text-pink-500"
                  }`}
                title="Grid View"
              >
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-full transition-all ${viewMode === "list"
                  ? "bg-pink-500 text-white shadow-sm"
                  : "text-gray-400 hover:text-pink-500"
                  }`}
                title="List View"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* --- FILTER ROW: Price, Age, Gender --- */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-center filter-dropdown-container">
          <div className="flex items-center gap-2 text-gray-700 font-semibold mr-2">
            <SlidersHorizontal size={20} />
            <span className="hidden sm:inline">Filters:</span>
          </div>
          <div className="flex-1 min-w-[200px]">
            <PriceRangeSlider
              min={0}
              max={5000}
              currency={currency}
              onChange={setPriceRange}
            />
          </div>

          {/* --- AGE FILTER --- */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveFilter(activeFilter === "age" ? null : "age")
              }
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${selectedAges.length > 0 || activeFilter === "age"
                ? "border-pink-500 text-pink-600 bg-pink-50"
                : "border-gray-200 text-gray-600 hover:border-pink-300 bg-white"
                }`}
            >
              By Age
              {selectedAges.length > 0 && (
                <span className="bg-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {selectedAges.length}
                </span>
              )}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${activeFilter === "age" ? "rotate-180" : ""}`}
              />
            </button>

            {/* Age Dropdown */}
            {activeFilter === "age" && (
              <div className="absolute top-full mt-2 left-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="p-2 space-y-1">
                  {ageOptions.map((age) => (
                    <button
                      key={age}
                      onClick={() =>
                        toggleSelection(age, selectedAges, setSelectedAges)
                      }
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-pink-50 text-sm text-gray-600 transition-colors"
                    >
                      <span>{age}</span>
                      {selectedAges.includes(age) && (
                        <Check size={16} className="text-pink-500" />
                      )}
                    </button>
                  ))}
                </div>
                {selectedAges.length > 0 && (
                  <div className="border-t border-gray-100 mt-2 pt-2 px-2">
                    <button
                      onClick={() => setSelectedAges([])}
                      className="text-xs text-red-500 font-bold hover:underline w-full text-center py-1"
                    >
                      Clear Filter
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* --- GENDER FILTER --- */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveFilter(activeFilter === "gender" ? null : "gender")
              }
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${selectedGenders.length > 0 || activeFilter === "gender"
                ? "border-pink-500 text-pink-600 bg-pink-50"
                : "border-gray-200 text-gray-600 hover:border-pink-300 bg-white"
                }`}
            >
              By Gender
              {selectedGenders.length > 0 && (
                <span className="bg-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-5 text-center">
                  {selectedGenders.length}
                </span>
              )}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${activeFilter === "gender" ? "rotate-180" : ""}`}
              />
            </button>

            {/* Gender Dropdown */}
            {activeFilter === "gender" && (
              <div className="absolute top-full mt-2 left-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="p-2 space-y-1">
                  {genderOptions.map((gender) => (
                    <button
                      key={gender}
                      onClick={() =>
                        toggleSelection(
                          gender,
                          selectedGenders,
                          setSelectedGenders,
                        )
                      }
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-pink-50 text-sm text-gray-600 transition-colors"
                    >
                      <span>{gender}</span>
                      {selectedGenders.includes(gender) && (
                        <Check size={16} className="text-pink-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden md:block"></div>

          {/* --- CUSTOM SORT DROPDOWN --- */}
          <div className="relative ml-auto md:ml-0">
            <button
              onClick={() =>
                setActiveFilter(activeFilter === "sort" ? null : "sort")
              }
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-transparent hover:bg-gray-50 text-sm font-bold text-gray-700 transition-colors"
            >
              <span className="text-gray-400 font-normal hidden sm:inline">
                Sort by:
              </span>
              {sortBy}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${activeFilter === "sort" ? "rotate-180" : ""}`}
              />
            </button>

            {activeFilter === "sort" && (
              <div className="absolute top-full mt-2 right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setActiveFilter(null);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors flex justify-between items-center ${sortBy === option
                      ? "bg-pink-50 text-pink-600 font-bold"
                      : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {option}
                    {sortBy === option && <Check size={16} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* --- LEFT SIDEBAR --- */}
          <aside className="hidden lg:block lg:col-span-1 space-y-8 sticky top-32 h-fit">
            {/* Categories Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">
                Categories
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/shop"
                    className={`w-full text-left flex items-center justify-between group ${currentCategory === "All"
                      ? "text-pink-500 font-bold"
                      : "text-gray-600 hover:text-pink-500"
                      }`}
                  >
                    <span>All Products</span>
                    {currentCategory === "All" && (
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                    )}
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id || cat.slug}>
                    <Link
                      to={`/shop/${cat.slug}`}
                      className={`w-full text-left flex items-center justify-between group ${categorySlug === cat.slug
                        ? "text-pink-500 font-bold"
                        : "text-gray-600 hover:text-pink-500"
                        }`}
                    >
                      <span>{cat.name}</span>
                      {categorySlug === cat.slug && (
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                      )}
                    </Link>

                    {/* Subcategories if active */}
                    {categorySlug === cat.slug && (
                      <ul className="ml-4 mt-2 space-y-2 border-l-2 border-pink-100 pl-4">
                        {cat.subcategories.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              to={`/shop/${cat.slug}/${sub.slug}`}
                              className={`text-sm block ${subcategorySlug === sub.slug
                                ? "text-pink-500 font-bold"
                                : "text-gray-500 hover:text-pink-500"
                                }`}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Colors Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-20">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">
                Filter by Color
              </h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full shadow-sm hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-gray-300 ${color.class}`}
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* --- RIGHT PRODUCT GRID --- */}
          <div className="col-span-1 lg:col-span-3 pt-0">
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-6"
                }
              >
                {filteredProducts.map((product) => (
                  <div
                    className={`bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-transparent hover:border-pink-100 ${viewMode === "grid"
                      ? "rounded-b-2xl flex flex-col"
                      : "rounded-2xl flex flex-col sm:flex-row overflow-hidden"
                      }`}
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {/* Image Container */}
                    <div
                      className={`relative bg-gradient-to-r from-pink-50 to-blue-50 flex items-center justify-center overflow-hidden ${viewMode === "grid"
                        ? "h-64 w-full"
                        : "h-64 sm:h-auto sm:w-64 md:w-72 shrink-0"
                        }`}
                    >
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
                        className={`absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 transform translate-y-2 group-hover:translate-y-0 ${isInWishlist(product.id)
                          ? "text-pink-500 opacity-100 translate-y-0"
                          : "text-gray-400 hover:bg-pink-50 hover:text-pink-500"
                          }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                      >
                        <Heart
                          size={18}
                          fill={
                            isInWishlist(product.id) ? "currentColor" : "none"
                          }
                        />
                      </button>
                    </div>

                    {/* Content Container */}
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
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
                      </div>

                      <div
                        className={`pt-2 border-t border-gray-50 flex ${viewMode === "grid" ? "flex-col space-y-3" : "flex-row items-center justify-between gap-4"}`}
                      >
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
                        <div
                          className={viewMode === "list" ? "w-48" : "w-full"}
                        >
                          <CartButton
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Search size={32} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 max-w-xs mx-auto">
                  We couldn't find any products matching your current filters.
                  Try adjusting them!
                </p>
                <button
                  onClick={() => {
                    setPriceRange({ min: 0, max: 5000 });
                    setSelectedAges([]);
                    setSelectedGenders([]);
                    setSearchQuery("");
                  }}
                  className="mt-6 text-pink-500 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Load More Button (Optional polish) */}
            {filteredProducts.length > 0 && (
              <div className="my-12 flex justify-center">
                <button className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-full hover:border-pink-500 hover:text-pink-500 transition-colors cursor-pointer">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Category;
