import React, { useState } from "react";
import {
  Package,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ShoppingBag,
  User,
} from "lucide-react";

import Footer from "../../components/Footer"

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("orders"); // 'orders', 'wishlist', 'settings'

  // --- DUMMY DATA: ORDERS ---
  const orders = [
    {
      id: "#ORD-7782",
      date: "Oct 24, 2025",
      total: 1700.0,
      status: "In Transit",
      items: [
        "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?auto=format&fit=crop&q=80&w=100",
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=100",
      ],
    },
    {
      id: "#ORD-7781",
      date: "Sep 12, 2025",
      total: 450.0,
      status: "Delivered",
      items: [
        "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=100",
      ],
    },
  ];

  // --- DUMMY DATA: WISHLIST ---
  const wishlist = [
    {
      id: 1,
      name: "Silicone Feeding Set - Pink",
      price: 320.0,
      image:
        "https://images.unsplash.com/photo-1584143997635-64d88e04d49a?auto=format&fit=crop&q=80&w=300",
      inStock: true,
    },
    {
      id: 2,
      name: "Smart Baby Monitor 4K",
      price: 2500.0,
      image:
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=300",
      inStock: false,
    },
  ];

  // Helper for Status Colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "In Transit":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen pb-20 font-sans">
        <div className="h-28"></div> {/* Spacer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back, Sarah!</p>
            </div>
            <div className="hidden sm:block">
              <span className="text-xs text-gray-400">
                Member since Dec 2024
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* --- LEFT SIDEBAR NAV --- */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-32">
                <div className="p-4 border-b border-gray-50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">
                    SJ
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Sarah Jenkins
                    </p>
                    <p className="text-xs text-gray-400">sarah@example.com</p>
                  </div>
                </div>
                <nav className="p-2 space-y-1">
                  {[
                    { id: "orders", icon: Package, label: "My Orders" },
                    {
                      id: "wishlist",
                      icon: Heart,
                      label: "My Wishlist",
                      badge: wishlist.length,
                    },
                    {
                      id: "settings",
                      icon: Settings,
                      label: "Account Settings",
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        activeTab === item.id
                          ? "bg-gray-900 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-50 hover:text-pink-600"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={18} />
                        {item.label}
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            activeTab === item.id
                              ? "bg-white text-gray-900"
                              : "bg-pink-100 text-pink-600"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                  <div className="pt-2 mt-2 border-t border-gray-50">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut size={18} />
                      Log Out
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            {/* --- RIGHT CONTENT AREA --- */}
            <div className="lg:col-span-9 space-y-6">
              {/* VIEW 1: ORDER HISTORY */}
              {activeTab === "orders" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      {/* Order Header */}
                      <div className="bg-gray-50/50 p-6 flex flex-wrap gap-6 justify-between items-center border-b border-gray-100">
                        <div className="flex gap-8">
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                              Order Placed
                            </p>
                            <p className="text-sm font-bold text-gray-900 mt-1">
                              {order.date}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                              Total Amount
                            </p>
                            <p className="text-sm font-bold text-gray-900 mt-1">
                              GH₵ {order.total.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                              Order #
                            </p>
                            <p className="text-sm font-medium text-gray-600 mt-1">
                              {order.id}
                            </p>
                          </div>
                        </div>
                        <button className="text-sm font-bold text-pink-600 border border-pink-200 bg-white px-4 py-2 rounded-lg hover:bg-pink-50 transition">
                          View Invoice
                        </button>
                      </div>

                      {/* Order Status & Items */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            {order.status === "Delivered"
                              ? "Arrived on Oct 26"
                              : "Expected arrival: Oct 28"}
                          </span>
                        </div>

                        {/* Visual Tracking Bar (Only for In Transit) */}
                        {order.status === "In Transit" && (
                          <div className="mb-8 relative">
                            <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                              <div className="h-full bg-pink-500 w-2/3 rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]"></div>
                              </div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs font-medium text-gray-400">
                              <span className="text-pink-600">Processing</span>
                              <span className="text-pink-600">Shipped</span>
                              <span>Delivered</span>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-4">
                          {order.items.map((img, idx) => (
                            <div
                              key={idx}
                              className="w-16 h-16 rounded-lg border border-gray-100 overflow-hidden bg-gray-50"
                            >
                              <img
                                src={img}
                                alt="Product"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-16 h-16 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-500">
                              +2 more
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* VIEW 2: WISHLIST */}
              {activeTab === "wishlist" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 group hover:border-pink-200 transition-all"
                    >
                      <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-sm font-bold text-pink-600 mt-1">
                            GH₵ {item.price.toLocaleString()}
                          </p>
                          <p
                            className={`text-xs mt-1 ${item.inStock ? "text-green-600" : "text-red-500"}`}
                          >
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </p>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button className="flex-1 bg-gray-900 text-white text-xs font-bold py-2 rounded-lg hover:bg-pink-600 transition">
                            Add to Cart
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg transition">
                            <Heart size={16} className="fill-current" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* VIEW 3: SETTINGS (Simple) */}
              {activeTab === "settings" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-in fade-in duration-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">
                    Profile Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Sarah Jenkins"
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="sarah@example.com"
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue="+233 55 123 4567"
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-pink-600 transition">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
