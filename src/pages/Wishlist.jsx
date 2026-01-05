import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { X, ShoppingBag } from "lucide-react";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg mb-4">
            Your wishlist is currently empty.
          </p>
          <Link
            to="/shop"
            className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 text-slate-500 hover:text-red-500 transition"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  {product.name}
                </h3>
                <p className="text-slate-500 mt-1">${product.price}</p>
                <button className="mt-4 w-full bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-900 transition flex items-center justify-center gap-2">
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
