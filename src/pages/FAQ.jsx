import React, { useState } from "react";
import {
  Search,
  Plus,
  Minus,
  MessageCircle,
  Package,
  RefreshCcw,
  CreditCard,
  ShoppingBag,
  HelpCircle,
} from "lucide-react";
import Footer from "../components/Footer";

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // --- FAQ DATA ---
  const faqData = [
    {
      question: "How do I determine the right size for my baby?",
      answer:
        "We recommend checking our detailed Size Guide located on every product page. Since babies grow quickly, if you are between sizes, we always suggest sizing up for longer wear!",
      category: "Products",
    },
    {
      question: "Are your clothes really 100% organic?",
      answer:
        "Yes! All our cotton products are GOTS (Global Organic Textile Standard) certified. This means they are free from harmful chemicals, pesticides, and are ethically produced.",
      category: "Products",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Orders within Accra are delivered within 24 hours. For other regions in Ghana, delivery typically takes 2-3 business days via our courier partners.",
      category: "Shipping",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we only ship within Ghana. We are working on expanding to Nigeria and Kenya soon! Join our newsletter to get notified.",
      category: "Shipping",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase. The item must be unused, unwashed, and in its original packaging. Sale items are final sale.",
      category: "Returns",
    },
    {
      question: "How do I process a return?",
      answer:
        "Simply go to your 'My Orders' page, click on the order, and select 'Request Return'. Our courier will pick up the package from your location.",
      category: "Returns",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Visa, MasterCard, and all mobile money networks (MTN Momo, Vodafone Cash, AirtelTigo) securely processed via Paystack.",
      category: "Payment",
    },
    {
      question: "Can I cancel my order after placing it?",
      answer:
        "We process orders very quickly. You can cancel within 1 hour of placing the order by contacting our support team directly via WhatsApp.",
      category: "Orders",
    },
  ];

  // --- FILTER LOGIC ---
  const filteredFAQs = faqData.filter((item) => {
    const matchesCategory = activeTab === "All" || item.category === activeTab;
    const matchesSearch = item.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = [
    { name: "All", icon: HelpCircle },
    { name: "Shipping", icon: Package },
    { name: "Returns", icon: RefreshCcw },
    { name: "Payment", icon: CreditCard },
    { name: "Products", icon: ShoppingBag },
  ];

  return (
    <>
      <div className="bg-linear-to-t from-babyBlue to-babyPink min-h-screen pb-20 font-sans">
        <div className="h-28"></div> {/* Spacer */}
        {/* --- HERO SECTION --- */}
        <div className="pb-12 pt-4 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              How can we help you?
            </h1>
            <p className="text-gray-500 text-lg mb-8">
              Find answers to common questions about shipping, returns, and our
              products.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto shadow-lg rounded-2xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all"
              />
            </div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          {/* --- CATEGORY TABS --- */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveTab(cat.name);
                  setOpenIndex(null);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === cat.name
                    ? "bg-gray-900 text-white shadow-lg transform -translate-y-1"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-pink-300 hover:text-pink-600"
                }`}
              >
                <cat.icon size={16} />
                {cat.name}
              </button>
            ))}
          </div>

          {/* --- FAQ ACCORDION LIST --- */}
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl border transition-all duration-300 ${
                    openIndex === index
                      ? "border-pink-500 shadow-md ring-4 ring-pink-500/5"
                      : "border-gray-200 hover:border-pink-200"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  >
                    <span
                      className={`font-bold text-lg ${openIndex === index ? "text-gray-900" : "text-gray-700"}`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`p-2 rounded-full transition-colors ${openIndex === index ? "bg-pink-100 text-pink-600" : "bg-gray-50 text-gray-400"}`}
                    >
                      {openIndex === index ? (
                        <Minus size={20} />
                      ) : (
                        <Plus size={20} />
                      )}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "max-h-48 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-6 pt-0 text-gray-500 leading-relaxed border-t border-transparent">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Empty State
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle size={32} className="text-gray-400" />
                </div>
                <h3 className="text-gray-900 font-bold">No results found</h3>
                <p className="text-gray-500 text-sm mt-2">
                  Try adjusting your search terms.
                </p>
              </div>
            )}
          </div>

          {/* --- CONTACT CTA --- */}
          <div className="mt-16 bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-8 sm:p-12 text-center border border-pink-100">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 text-pink-500">
              <MessageCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Can't find the answer you're looking for? Please chat to our
              friendly team.
            </p>
            <button className="bg-gray-900 text-white font-bold px-8 py-3 rounded-full hover:bg-pink-600 transition-all shadow-lg hover:shadow-pink-200 cursor-pointer">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
