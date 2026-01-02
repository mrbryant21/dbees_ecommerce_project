import { ShoppingCart } from "lucide-react";

const CartButton = ({ onClick, children = "Add to Cart", className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-nurseryGreen hover:bg-emerald-600 hover:scale-105 active:scale-95 text-stone-600 hover:text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer ${className} w-full justify-center`}
    >
      <ShoppingCart size={16} className="group-hover:animate-bounce" />
      <span>{children}</span>
    </button>
  );
};

export default CartButton;
