import React, { useState } from "react";
import {
  RotateCcw,
  Truck,
  CheckCircle2,
  Search,
  ArrowRight,
  AlertCircle,
  Package,
  Calendar,
  CreditCard,
  Plus,
  Minus,
} from "lucide-react";
import Footer from "../components/Footer";

const Returns = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Return Lookup State
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Do I have to pay for return shipping?",
      answer:
        "No! We offer free return shipping for all orders within Accra. For other regions, a small courier fee of GH₵ 20 will be deducted from your refund.",
    },
    {
      question: "How long does a refund take?",
      answer:
        "Once we receive your return at our warehouse, we inspect it within 24 hours. Your refund is then processed immediately via your original payment method (Mobile Money or Card) and typically appears within 3-5 business days.",
    },
    {
      question: "Can I exchange for a different size?",
      answer:
        "Absolutely. The fastest way to do this is to initiate a return for store credit (which is instant upon receipt) and use that to purchase the new size immediately.",
    },
  ];

  return (
    <>
      <div className="bg-gray-50 min-h-screen pb-20 font-sans">
        <div className="h-28"></div> {/* Spacer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- HERO SECTION --- */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold mb-6">
              <RotateCcw size={14} /> Hassle-Free Returns
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Didn't fit? No problem.
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              We want you to love what you ordered. If something isn't right,
              let's fix it. You have{" "}
              <span className="text-gray-900 font-bold">30 days</span> to return
              or exchange.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* --- LEFT: RETURN WIDGET & STEPS --- */}
            <div className="lg:col-span-7 space-y-8">
              {/* 1. Lookup Form (The "Widget") */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 overflow-hidden relative">
                {/* Decorative gradient blur */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>

                <h2 className="text-xl font-bold text-gray-900 mb-6 relative z-10">
                  Start a Return
                </h2>
                <form className="space-y-4 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                        Order Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ORD-1234"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <a href="/" className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                    Find My Order <ArrowRight size={18} />
                  </a>
                </form>
              </div>

              {/* 2. Visual Process Steps */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6 ml-1">
                  How it works
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Step 1 */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 relative group hover:border-green-200 transition-all">
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-md">
                      1
                    </div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                      <Search size={24} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      Request Online
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Use the form above to select the items you want to return
                      and print your label.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 relative group hover:border-green-200 transition-all">
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-md">
                      2
                    </div>
                    <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                      <Package size={24} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Pack it up</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Place items in the original packaging. Ensure tags are
                      attached and items are unwashed.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 relative group hover:border-green-200 transition-all">
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-md">
                      3
                    </div>
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <Truck size={24} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">We Pick Up</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Our courier will pick up the package from your doorstep.
                      Sit back and relax.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- RIGHT: RULES & FAQ --- */}
            <div className="lg:col-span-5 space-y-8">
              {/* The Rules Checklist */}
              <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Return Policy Checklist
                </h3>
                <ul className="space-y-4">
                  {[
                    {
                      icon: Calendar,
                      text: "Within 30 days of delivery",
                      color: "text-blue-500",
                    },
                    {
                      icon: Package,
                      text: "Original packaging intact",
                      color: "text-yellow-500",
                    },
                    {
                      icon: AlertCircle,
                      text: "Unwashed & Unworn",
                      color: "text-orange-500",
                    },
                    {
                      icon: CheckCircle2,
                      text: "Tags still attached",
                      color: "text-green-500",
                    },
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <item.icon size={20} className={item.color} />
                      <span className="text-sm font-medium text-gray-700">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-xs text-red-600 font-medium leading-relaxed">
                    <strong>Note:</strong> Personalized items and hygiene
                    products (like breast pumps or open diaper packs) cannot be
                    returned.
                  </p>
                </div>
              </div>

              {/* Mini FAQ Accordion */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 ml-1">
                  Common Questions
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-xl border transition-all duration-200 ${
                        openIndex === index
                          ? "border-green-500 shadow-sm"
                          : "border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                      >
                        <span className="text-sm font-bold text-gray-800">
                          {faq.question}
                        </span>
                        {openIndex === index ? (
                          <Minus size={16} className="text-green-600" />
                        ) : (
                          <Plus size={16} className="text-gray-400" />
                        )}
                      </button>
                      {openIndex === index && (
                        <div className="px-4 pb-4 text-xs text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Returns;
