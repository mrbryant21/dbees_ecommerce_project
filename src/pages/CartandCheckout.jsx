import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Trash2,
  Minus,
  Plus,
  ChevronRight,
  CreditCard,
  Truck,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Banknote,
} from "lucide-react";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const CartAndCheckout = () => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  // --- STATE ---
  const [step, setStep] = useState(1); // 1: Cart, 2: Details, 3: Payment
  const [paymentMethod, setPaymentMethod] = useState("card"); // card, momo, cod

  useEffect(() => {
    if (location.pathname === "/checkout") {
      setStep(2);
    } else {
      setStep(1);
    }
  }, [location.pathname]);

  const [currency] = useState("GH₵");

  // --- HELPERS ---
  const shipping = 50.0;
  const total = subtotal + shipping;

  const formatPrice = (price) =>
    price.toLocaleString(undefined, { minimumFractionDigits: 2 });

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="h-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* --- PAGE HEADER (Small & Clean) --- */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900">
            {step === 1 ? "Shopping Cart" : "Checkout"}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <span className={step >= 1 ? "text-pink-600 font-medium" : ""}>
              Cart
            </span>
            <ChevronRight size={14} />
            <span className={step >= 2 ? "text-pink-600 font-medium" : ""}>
              Details
            </span>
            <ChevronRight size={14} />
            <span className={step >= 3 ? "text-pink-600 font-medium" : ""}>
              Payment
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* --- LEFT COLUMN (Dynamic Content) --- */}
          <div className="lg:col-span-8">
            {/* STEP 1: CART VIEW */}
            {step === 1 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 space-y-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="text-gray-300" size={32} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Your cart is empty
                      </h3>
                      <p className="text-sm text-gray-500 mt-2 mb-6">
                        Looks like you haven't added anything to your cart yet.
                      </p>
                      <button
                        onClick={() => navigate("/shop")}
                        className="bg-gray-900 text-white text-sm font-bold px-8 py-3 rounded-full hover:bg-pink-600 transition-all"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 sm:gap-6 items-start pb-6 border-b border-gray-50 last:border-0 last:pb-0"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-sm font-bold text-gray-900 truncate pr-4">
                                {item.name}
                              </h3>
                              <p className="text-xs text-gray-500 mt-1">
                                {item.detail ||
                                  `${item.category} | ${item.subcategory}`}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="flex justify-between items-end mt-4">
                            {/* Quantity Control */}
                            <div className="flex items-center border border-gray-200 rounded-lg h-8">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="px-2 text-gray-500 hover:text-pink-600 transition"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-2 text-gray-500 hover:text-pink-600 transition"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-sm font-bold text-gray-900">
                              {currency}{" "}
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: DETAILS (Guest/Login) */}
            {step === 2 && (
              <div className="space-y-6">
                {/* 1. Contact Info */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <span className="bg-gray-900 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                        1
                      </span>
                      Contact Information
                    </h3>
                    <button className="text-xs text-pink-600 font-bold hover:underline">
                      Already have an account? Log in
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-200"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-200"
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="guest"
                      className="rounded text-pink-500 focus:ring-pink-500"
                    />
                    <label htmlFor="guest" className="text-xs text-gray-600">
                      Checkout as guest (No account needed)
                    </label>
                  </div>
                </div>

                {/* 2. Shipping Address */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <span className="bg-gray-900 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                      2
                    </span>
                    Shipping Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      className="md:col-span-2 w-full text-sm p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                    />
                    <div className="relative">
                      <select className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 appearance-none bg-white">
                        <option>Ashanti Region</option>
                        <option>Greater Accra</option>
                        <option>Central Region</option>
                      </select>
                      <ChevronRight
                        className="absolute right-3 top-3.5 rotate-90 text-gray-400"
                        size={14}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {step === 3 && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-6">
                  <span className="bg-gray-900 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    3
                  </span>
                  Payment Method
                </h3>

                <div className="space-y-3">
                  {/* Card Option */}
                  <label
                    className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="text-pink-600 focus:ring-pink-500"
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`p-2 rounded-md shadow-sm ${
                          paymentMethod === "card"
                            ? "bg-white text-pink-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-gray-900">
                          Credit / Debit Card
                        </span>
                        <span className="block text-xs text-gray-500">
                          Secure payment via Paystack
                        </span>
                      </div>
                    </div>
                    {paymentMethod === "card" && (
                      <CheckCircle2 size={18} className="text-pink-600" />
                    )}
                  </label>

                  {/* Mobile Money Option */}
                  <label
                    className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "momo"
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "momo"}
                      onChange={() => setPaymentMethod("momo")}
                      className="text-pink-600 focus:ring-pink-500"
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`p-2 rounded-md shadow-sm ${
                          paymentMethod === "momo"
                            ? "bg-white text-pink-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <Lock size={20} />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-gray-900">
                          Mobile Money
                        </span>
                        <span className="block text-xs text-gray-500">
                          MTN, Vodafone, AirtelTigo
                        </span>
                      </div>
                    </div>
                    {paymentMethod === "momo" && (
                      <CheckCircle2 size={18} className="text-pink-600" />
                    )}
                  </label>

                  {/* Cash on Delivery Option */}
                  <label
                    className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="text-pink-600 focus:ring-pink-500"
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`p-2 rounded-md shadow-sm ${
                          paymentMethod === "cod"
                            ? "bg-white text-pink-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <Banknote size={20} />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-gray-900">
                          Cash on Delivery
                        </span>
                        <span className="block text-xs text-gray-500">
                          Pay when you receive your order
                        </span>
                      </div>
                    </div>
                    {paymentMethod === "cod" && (
                      <CheckCircle2 size={18} className="text-pink-600" />
                    )}
                  </label>
                </div>

                {/* Card Inputs (Dummy) - Only show if card is selected */}
                {paymentMethod === "card" && (
                  <div className="mt-6 pt-6 border-t border-gray-100 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="col-span-2 w-full text-sm p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                      />
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>
                )}

                {/* Mobile Money Instructions - Only show if momo is selected */}
                {paymentMethod === "momo" && (
                  <div className="mt-6 pt-6 border-t border-gray-100 animate-fadeIn">
                    <p className="text-sm text-gray-600 mb-4">
                      Please enter your mobile money number to receive a payment
                      prompt.
                    </p>
                    <input
                      type="tel"
                      placeholder="024 XXX XXXX"
                      className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                    />
                  </div>
                )}

                {/* COD Instructions - Only show if cod is selected */}
                {paymentMethod === "cod" && (
                  <div className="mt-6 pt-6 border-t border-gray-100 animate-fadeIn">
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                      <p className="text-sm text-amber-800">
                        <strong>Note:</strong> Please ensure you have the exact
                        amount ready for the delivery agent. We also accept
                        mobile money transfers to the agent upon delivery.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between items-center">
              {step > 1 ? (
                <button
                  onClick={() => {
                    if (step === 2) navigate("/cart");
                    else setStep(step - 1);
                  }}
                  className="text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1"
                >
                  <ChevronRight size={16} className="rotate-180" /> Back
                </button>
              ) : (
                <button
                  onClick={() => navigate("/shop")}
                  className="text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1"
                >
                  <ChevronRight size={16} className="rotate-180" /> Continue
                  Shopping
                </button>
              )}

              <button
                onClick={() => {
                  if (step === 1) navigate("/checkout");
                  else setStep(Math.min(3, step + 1));
                }}
                className="bg-gray-900 text-white text-sm font-bold px-8 py-3 rounded-full shadow-lg hover:bg-pink-600 transition-all flex items-center gap-2 cursor-pointer"
              >
                {step === 3
                  ? paymentMethod === "cod"
                    ? "Place Order"
                    : "Pay Now"
                  : "Proceed to Checkout"}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* --- RIGHT COLUMN (Sticky Order Summary) --- */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-28">
              <h3 className="text-sm font-bold text-gray-900 mb-6">
                Order Summary
              </h3>

              <div className="space-y-3 pb-6 border-b border-gray-100">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>
                    {currency} {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping Estimate</span>
                  <span>
                    {currency} {formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax Estimate</span>
                  <span>{currency} 0.00</span>
                </div>
              </div>

              <div className="py-4 flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">
                  Order Total
                </span>
                <span className="text-xl font-bold text-pink-600">
                  {currency} {formatPrice(total)}
                </span>
              </div>

              <div className="mt-4 bg-gray-50 p-3 rounded-lg flex items-start gap-3">
                <ShieldCheck
                  size={18}
                  className="text-green-600 shrink-0 mt-0.5"
                />
                <p className="text-xs text-gray-500 leading-relaxed">
                  <strong>Secure Checkout.</strong> Your payment information is
                  encrypted and processed securely.
                </p>
              </div>

              {/* Promo Code Input */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-500"
                  />
                  <button className="text-xs font-bold text-white bg-gray-900 px-4 rounded-lg hover:bg-gray-800">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartAndCheckout;
