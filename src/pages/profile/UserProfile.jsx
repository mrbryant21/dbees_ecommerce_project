import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  User as UserIcon,
  Lock,
  Trash2
} from "lucide-react";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged, signOut, updatePassword, deleteUser } from "firebase/auth";
import { collection, query, where, getDocs, orderBy, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";

const UserProfile = () => {
  const { addToCart, toggleWishlist, isInWishlist, wishlist } = useCart();
  const [activeTab, setActiveTab] = useState("orders"); // 'orders', 'wishlist', 'settings'
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // --- AUTH & DATA FETCHING ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/auth");
      } else {
        setUser(currentUser);
        await fetchOrders(currentUser.uid);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchOrders = async (userId) => {
    try {
      // 1. Fetch from 'orders' collection
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const fetchedOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Optional: Fetch 'whatsappOrders' if you want to include those too
      // For now, let's just stick to standard orders or merge them if needed.

      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // If index is missing, it might error on 'orderBy', handle gracefully or fallback
      toast.error("Could not load orders.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    const promise = updatePassword(user, newPassword);

    toast.promise(promise, {
      loading: 'Updating password...',
      success: 'Password updated successfully!',
      error: (err) => {
        if (err.code === 'auth/requires-recent-login') {
          return "Please log out and log back in to perform this action.";
        }
        return "Failed to update password.";
      }
    });

    try {
      await promise;
      setNewPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    const promise = deleteUser(user);

    toast.promise(promise, {
      loading: 'Deleting account...',
      success: 'Account deleted.',
      error: (err) => {
        if (err.code === 'auth/requires-recent-login') {
          return "Please log out and log back in to delete your account.";
        }
        return "Failed to delete account.";
      }
    });

    try {
      await promise;
      navigate("/auth");
    } catch (error) {
      console.error(error);
    }
  };




  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: "Cancelled",
        updatedAt: serverTimestamp()
      });
      toast.success("Order cancelled successfully");
      await fetchOrders(user.uid);
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order.");
    }
  };

  const handleRefundRequest = async (orderId) => {
    if (!window.confirm("Are you sure you want to request a return/refund for this order?")) return;

    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: "Refund Requested",
        updatedAt: serverTimestamp()
      });
      toast.success("Refund request submitted successfully");
      await fetchOrders(user.uid);
    } catch (error) {
      console.error("Error requesting refund:", error);
      toast.error("Failed to submit refund request.");
    }
  };

  const canCancel = (order) => {
    const s = order.status ? order.status.toLowerCase() : "";
    // Allow cancellation if it's not yet shipped or delivered
    const nonCancellable = ["shipped", "in transit", "delivered", "completed", "cancelled", "refund requested"];
    return s && !nonCancellable.includes(s) && (s === "pending" || s === "processing" || s === "paid" || s === "confirmed");
  };

  const canReturn = (order) => {
    const s = order.status ? order.status.toLowerCase() : "";
    if (s !== "delivered") return false;

    // Robust date parsing
    let createdAtMs = null;
    if (order.createdAt?.seconds) {
      createdAtMs = order.createdAt.seconds * 1000;
    } else if (order.createdAt instanceof Date) {
      createdAtMs = order.createdAt.getTime();
    } else if (typeof order.createdAt === "string") {
      createdAtMs = new Date(order.createdAt).getTime();
    }

    if (!createdAtMs || isNaN(createdAtMs)) return false;

    const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    return (now - createdAtMs) <= threeDaysInMs;
  };

  // Helper for Status Colors
  const getStatusColor = (status) => {
    const s = status ? status.toLowerCase() : "";
    if (s === "delivered" || s === "completed") return "bg-green-100 text-green-700 border-green-200";
    if (s === "in transit" || s === "shipped") return "bg-blue-100 text-blue-700 border-blue-200";
    if (s === "pending" || s === "processing") return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (s === "cancelled") return "bg-red-100 text-red-700 border-red-200";
    if (s === "refund requested") return "bg-purple-100 text-purple-700 border-purple-200";
    return "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    )
  }

  if (!user) return null; // Will redirect

  return (
    <>
      <div className="bg-gray-50 min-h-screen pb-20 font-sans">
        <div className="h-28"></div> {/* Spacer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back, {user.displayName || "Valued Customer"}!</p>
            </div>
            <div className="hidden sm:block">
              <span className="text-xs text-gray-400">
                Member since {new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* --- LEFT SIDEBAR NAV --- */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-32">
                <div className="p-4 border-b border-gray-50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon size={20} />}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                <nav className="p-2 space-y-1">
                  {[
                    { id: "orders", icon: Package, label: "My Orders", badge: orders.length },
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
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === item.id
                        ? "bg-gray-900 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-50 hover:text-pink-600"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={18} />
                        {item.label}
                      </div>
                      {item.badge > 0 && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === item.id
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
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
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
                  {orders.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                      <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                      <p className="text-gray-500 mt-1 mb-6">Start shopping to see your orders here.</p>
                      <Link to="/shop" className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-pink-600 hover:bg-pink-700">
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    orders.map((order) => (
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
                                {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                                Total Amount
                              </p>
                              <p className="text-sm font-bold text-gray-900 mt-1">
                                {order.currency} {order.total?.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                                Order #
                              </p>
                              <p className="text-sm font-medium text-gray-600 mt-1">
                                {order.orderId || order.id}
                              </p>
                            </div>
                          </div>
                          {/* Optional Invoice Button */}
                          {/* <button className="text-sm font-bold text-pink-600 border border-pink-200 bg-white px-4 py-2 rounded-lg hover:bg-pink-50 transition">
                            View Invoice
                            </button> */}
                        </div>

                        {/* Order Status & Items */}
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-6">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                            {/* Delivery Estimate Logic can go here */}
                          </div>

                          {/* Items Preview */}
                          <div className="flex items-center gap-4 overflow-x-auto pb-2">
                            {order.items && order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="w-16 h-16 rounded-lg border border-gray-100 overflow-hidden bg-gray-50 shrink-0 relative group"
                                title={item.name}
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                              </div>
                            ))}
                          </div>

                          {/* Order Actions */}
                          {(canCancel(order) || canReturn(order)) && (
                            <div className="mt-6 pt-6 border-t border-gray-100 flex gap-4">
                              {canCancel(order) && (
                                <button
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="text-sm font-bold text-red-600 hover:text-red-700 transition"
                                >
                                  Cancel Order
                                </button>
                              )}
                              {canReturn(order) && (
                                <button
                                  onClick={() => handleRefundRequest(order.id)}
                                  className="text-sm font-bold text-pink-600 hover:text-pink-700 transition"
                                >
                                  Request Return
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* VIEW 2: WISHLIST */}
              {activeTab === "wishlist" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                  {wishlist.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-100">
                      <Heart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                      <p className="text-gray-500 mt-1">Save items you love to revisit later.</p>
                    </div>
                  ) : (
                    wishlist.map((item) => (
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
                          </div>
                          {/* <button className="mt-2 bg-gray-900 text-white text-xs font-bold py-2 rounded-lg hover:bg-pink-600 transition">
                                Add to Cart
                            </button> */}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* VIEW 3: SETTINGS */}
              {activeTab === "settings" && (
                <div className="space-y-8 animate-in fade-in duration-300">

                  {/* Personal Information */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={user.displayName}
                          disabled
                          className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          disabled
                          className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Lock size={20} className="text-gray-400" />
                      Security Settings
                    </h3>

                    <div className="max-w-md space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-pink-500 focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={handleChangePassword}
                        disabled={!newPassword}
                        className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-red-50 rounded-xl shadow-sm border border-red-100 p-8">
                    <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
                      <Trash2 size={20} />
                      Delete Account
                    </h3>
                    <p className="text-sm text-red-700 mb-6">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-red-700 transition"
                    >
                      Delete Account
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
