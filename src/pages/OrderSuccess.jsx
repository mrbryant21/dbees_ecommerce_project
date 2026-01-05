import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  Copy,
  ArrowRight,
  ShoppingBag,
  Truck,
  MapPin,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import Footer from "../components/Footer";

const OrderSuccess = () => {
  const [copied, setCopied] = useState(false);
  const orderId = "ORD-8829-XJ";

  // Dummy data for purchased items preview
  const purchasedItems = [
    "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=100",
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen pb-20 font-sans">
        <div className="h-16"></div> {/* Spacer */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- MAIN SUCCESS CARD --- */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
            <div className="p-8 sm:p-12 text-center">
              {/* Animated Success Icon */}
              <div className="mb-6 relative inline-block">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-500">
                  <CheckCircle2 size={40} className="text-green-600" />
                </div>
                {/* Decorative particles */}
                <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
                <div className="absolute bottom-1 left-0 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Thank you for your order!
              </h1>
              <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
                Your order has been placed successfully.
                .
              </p>

              {/* Order Details Box */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Order Number */}
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                      Order Number
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900 font-mono">
                        {orderId}
                      </span>
                      <button
                        onClick={handleCopy}
                        className="p-1.5 hover:bg-gray-200 rounded-md transition-colors text-gray-400 hover:text-gray-600 relative group"
                        title="Copy Order ID"
                      >
                        {copied ? (
                          <Check size={14} className="text-green-600" />
                        ) : (
                          <Copy size={14} />
                        )}
                        {/* Tooltip */}
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {copied ? "Copied!" : "Copy ID"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Expected Delivery */}
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                      Estimated Delivery
                    </p>
                    <div className="flex items-center gap-2 text-gray-900">
                      <Calendar size={18} className="text-pink-500" />
                      <span className="text-sm font-bold">Oct 28, 2025</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Timeline Visualization */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded-full -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-0 w-[15%] h-1 bg-green-500 rounded-full -translate-y-1/2"></div>

                    <div className="relative flex justify-between text-xs font-medium text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm z-10"></div>
                        <span className="text-green-600 font-bold">
                          Confirmed
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-200 border-2 border-white shadow-sm z-10"></div>
                        <span>Processing</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-200 border-2 border-white shadow-sm z-10"></div>
                        <span>Shipped</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-200 border-2 border-white shadow-sm z-10"></div>
                        <span>Delivered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Preview */}
              <div className="mt-6 flex items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-400 mr-2">Includes:</span>
                <div className="flex -space-x-3">
                  {purchasedItems.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Item"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/profile"
                  className="w-full sm:w-auto px-8 py-3 rounded-full border border-gray-200 text-gray-700 font-bold text-sm hover:border-gray-900 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  Track Order <Truck size={16} />
                </Link>
                <Link
                  to="/"
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-gray-900 text-white font-bold text-sm shadow-lg hover:bg-pink-600 hover:shadow-pink-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  Continue Shopping <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Bottom Support Link */}
            <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Need help?{" "}
                <a href="#" className="text-pink-600 font-bold hover:underline">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;
