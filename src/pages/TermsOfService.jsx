import React, { useState, useEffect } from "react";
import {
  Scale,
  FileSignature,
  ShoppingBag,
  CreditCard,
  AlertTriangle,
  Gavel,
  RefreshCcw,
  Users,
} from "lucide-react";
import Footer from "../components/Footer";

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState("acceptance");

  // Scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "acceptance",
        "account",
        "products",
        "payments",
        "returns",
        "liability",
        "law",
      ];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen pb-20 font-sans text-gray-600">
        <div className="h-28"></div> {/* Spacer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- PAGE HEADER --- */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Please read these terms carefully. By accessing or using
              DbessShop, you agree to be bound by these terms and all terms
              incorporated by reference.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* --- LEFT SIDEBAR (Sticky Nav) --- */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">
                  Table of Contents
                </h3>
                <nav className="space-y-1">
                  {[
                    { id: "acceptance", label: "Acceptance of Terms" },
                    { id: "account", label: "User Accounts" },
                    { id: "products", label: "Products & Pricing" },
                    { id: "payments", label: "Billing & Payment" },
                    { id: "returns", label: "Returns & Refunds" },
                    { id: "liability", label: "Limitation of Liability" },
                    { id: "law", label: "Governing Law" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        activeSection === item.id
                          ? "bg-white text-pink-600 shadow-sm border-l-4 border-pink-500"
                          : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* --- RIGHT CONTENT --- */}
            <div className="lg:col-span-9 space-y-12">
              {/* 1. Acceptance */}
              <section
                id="acceptance"
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Scale size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Acceptance of Terms
                  </h2>
                </div>
                <p className="leading-relaxed mb-4">
                  These Terms of Service ("Terms") constitute a legally binding
                  agreement between you ("User", "you") and DbessShop ("we",
                  "us", "our"). By accessing or using our website, mobile
                  application, and services, you confirm that you have read,
                  understood, and agree to be bound by these Terms.
                </p>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                  <p className="text-sm text-blue-800 font-medium">
                    If you do not agree to these terms, you may not access or
                    use the services.
                  </p>
                </div>
              </section>

              {/* 2. User Accounts */}
              <section
                id="account"
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    <Users size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    User Accounts
                  </h2>
                </div>
                <p className="leading-relaxed mb-6">
                  To access certain features of the Site, you may be required to
                  register for an account. You agree to provide accurate,
                  current, and complete information during the registration
                  process.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 p-4 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">
                      Account Security
                    </h3>
                    <p className="text-sm">
                      You are responsible for safeguarding your password. You
                      agree not to disclose your password to any third party.
                    </p>
                  </div>
                  <div className="border border-gray-200 p-4 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">
                      Age Restriction
                    </h3>
                    <p className="text-sm">
                      You must be at least 18 years old to create an account and
                      purchase products from our site.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. Products & Pricing */}
              <section
                id="products"
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
                    <ShoppingBag size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Products & Pricing
                  </h2>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 shrink-0"></div>
                    <span className="text-sm md:text-base">
                      <strong>Availability:</strong> All products are subject to
                      availability. We reserve the right to discontinue any
                      product at any time.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 shrink-0"></div>
                    <span className="text-sm md:text-base">
                      <strong>Pricing Errors:</strong> While we strive for
                      accuracy, errors may occur. If we discover an error in the
                      price of items you have ordered, we will inform you as
                      soon as possible.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 shrink-0"></div>
                    <span className="text-sm md:text-base">
                      <strong>Currency:</strong> All prices are displayed in
                      Ghanaian Cedi (GH₵) unless otherwise stated.
                    </span>
                  </li>
                </ul>
              </section>

              {/* 4. Payments */}
              <section
                id="payments"
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-50 rounded-lg text-green-600">
                    <CreditCard size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Billing & Payment
                  </h2>
                </div>
                <p className="leading-relaxed">
                  We accept payments through Visa, MasterCard, and Mobile Money
                  (MTN, Vodafone, AirtelTigo). Payment processing services are
                  provided by Paystack. By providing a payment method, you
                  represent that you are authorized to use that payment method.
                </p>
              </section>

              {/* 5. Returns */}
              <section
                id="returns"
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                    <RefreshCcw size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Returns & Refunds
                  </h2>
                </div>
                <p className="leading-relaxed">
                  Items can be returned within 30 days of receipt of delivery.
                  To be eligible for a return, your item must be unused and in
                  the same condition that you received it.
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  Please review our full{" "}
                  <a href="#" className="text-blue-600 underline">
                    Return Policy
                  </a>{" "}
                  for detailed instructions.
                </p>
              </section>

              {/* 6. Limitation of Liability */}
              <section
                id="liability"
                className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-red-500"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-red-50 rounded-lg text-red-600">
                    <AlertTriangle size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Limitation of Liability
                  </h2>
                </div>
                <p className="leading-relaxed mb-4 font-medium text-gray-800 uppercase text-xs tracking-wide">
                  Please read this section carefully.
                </p>
                <p className="leading-relaxed text-sm">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, DbessShop SHALL NOT BE
                  LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                  OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES,
                  WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA,
                  USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A)
                  YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE
                  SERVICES; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE
                  SERVICES.
                </p>
              </section>

              {/* 7. Governing Law */}
              <section
                id="law"
                className="bg-gray-900 rounded-2xl p-8 shadow-lg text-white"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/10 rounded-lg text-white">
                    <Gavel size={24} />
                  </div>
                  <h2 className="text-xl font-bold">Governing Law</h2>
                </div>
                <p className="leading-relaxed text-gray-300">
                  These Terms shall be governed by and construed in accordance
                  with the laws of the Republic of Ghana, without regard to its
                  conflict of law provisions.
                </p>
              </section>
            </div>
          </div>
        </div>
          </div>
        <Footer />
    </>
  );
};

export default TermsOfService;
