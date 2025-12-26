import homePageMother from "../assets/home_page_mother.jpg";
import { Heart, Search, Menu, User, ChevronRight, Star } from "lucide-react";
import CartButton from "../components/CartButton";
const Home = () => {
  const categories = [
    { name: "Newborn Essentials", icon: "👶" },
    { name: "Baby Clothing", icon: "👕" },
    { name: "Toys & Play", icon: "🧸" },
    { name: "Nursery Décor", icon: "🛏️" },
    { name: "Feeding & Care", icon: "🍼" },
    { name: "Bath & Skincare", icon: "🛁" },
  ];

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

  const ShopCategories = [
    {
      name: "Newborn Essentials",
      image: "/cat_images/newborn_essentials.png",
    },
    {
      name: "Clothing",
      image: "/cat_images/clothing.jpg",
    },
    {
      name: "Toys & Play",
      image: "/cat_images/toys_play.jpg",
    },
    {
      name: "Nursery Decor",
      image: "../assets/logo.png",
    },
    {
      name: "Feeding & Care",
      image: "../assets/logo.png",
    }, 
    {
      name: "Bath & Skincare",
      image: "../assets/logo.png",
    }
  ]

  return (
    <div className="animate-fadeIn">
      {/* Hero Section with Categories & Featured Grid */}
      <section>
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-6">
            {/* Categories Sidebar */}
            <aside className="w-64 shrink-0">
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-4 text-slate-800">
                  Shop by Category
                </h3>
                <nav className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
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

            {/* Featured Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-4 h-full">
                {/* Large Featured Card */}
                <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer group relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage: `url(${homePageMother})`,
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
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80')",
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
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-pink-500 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 font-medium">
                Favorite Products for your baby
              </p>
            </div>
            <a
              href=""
              className="text-gray-600 font-medium after:content-['_→'] after:ml-2 hover:text-pink-500 transition text-sm"
            >
              View All Products
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

      {/* Category Selection Placeholder */}
      <section className="py-16 mx-auto px-4 bg-linear-to-t from-white to-babyBlue/50">
        <div className="max-w-7xl px-4 sm:px-4 mx-auto lg:px-8">
          <h2 className="text-2xl font-semibold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {ShopCategories.map((category) => (
              <div
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer p-6 flex flex-col items-center justify-center"
                key={category.name}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                />
                <span className="font-semibold text-medium text-gray-700 mt-4">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Trust & Safety Banners Section */}
      
      {/* <section className="bg-babyBlue px-6 py-20 mx-auto"></section> */}
      
    </div>
  );
};

export default Home;
