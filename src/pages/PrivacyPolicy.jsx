import React, { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Mail,
  Globe,
  Cookie,
  Server,
} from "lucide-react";
import Footer from "../components/Footer.jsx";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("intro");

  // Scroll spy effect to highlight sidebar items
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "intro",
        "collect",
        "use",
        "cookies",
        "security",
        "rights",
        "contact",
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
          <div className="text-center max-w-2xl mx-auto mb-16">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold mb-6">
              <CheckCircleIcon /> Last Updated: January 5, 2026
            </div> */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-500 text-lg">
              We value your trust. Here is a clear explanation of how we handle
              your data to ensure your family's privacy is protected.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* --- LEFT SIDEBAR (Sticky Nav) --- */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">
                  Contents
                </h3>
                <nav className="space-y-1">
                  {[
                    { id: "intro", label: "Introduction" },
                    { id: "collect", label: "Information We Collect" },
                    { id: "use", label: "How We Use Data" },
                    { id: "cookies", label: "Cookies & Tracking" },
                    { id: "security", label: "Data Security" },
                    { id: "rights", label: "Your Rights" },
                    { id: "contact", label: "Contact Us" },
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
              {/* 1. Introduction */}
              <section
                id="intro"
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
                    <Globe size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Introduction
                  </h2>
                </div>
                <p className="leading-relaxed mb-4">
                  Welcome to DbessShop. We respect your privacy and are committed
                  to protecting your personal data. This privacy policy will
                  inform you as to how we look after your personal data when you
                  visit our website (regardless of where you visit it from) and
                  tell you about your privacy rights and how the law protects
                  you.
                </p>
                <p className="leading-relaxed">
                  By using our services, you agree to the collection and use of
                  information in accordance with this policy.
                </p>
              </section>

              {/* 2. Information We Collect */}
              <section
                id="collect"
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <FileText size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Information We Collect
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-5 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">
                      Personal Identity Data
                    </h3>
                    <p className="text-sm">
                      Includes first name, last name, username or similar
                      identifier, marital status, title, date of birth and
                      gender.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">
                      Contact Data
                    </h3>
                    <p className="text-sm">
                      Includes billing address, delivery address, email address
                      and telephone numbers.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">
                      Financial Data
                    </h3>
                    <p className="text-sm">
                      Includes bank account and payment card details (processed
                      securely via Paystack).
                    </p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">
                      Technical Data
                    </h3>
                    <p className="text-sm">
                      Includes IP address, login data, browser type and version,
                      time zone setting, and operating system.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. How We Use Data */}
              <section
                id="use"
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    <Server size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    How We Use Your Data
                  </h2>
                </div>
                <ul className="space-y-4">
                  {[
                    "To register you as a new customer.",
                    "To process and deliver your order including managing payments, fees and charges.",
                    "To manage our relationship with you including notifying you about changes to our terms or privacy policy.",
                    "To enable you to partake in a prize draw, competition or complete a survey.",
                    "To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance).",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 4. Cookies */}
              <section
                id="cookies"
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                    <Cookie size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Cookies & Tracking
                  </h2>
                </div>
                <p className="leading-relaxed mb-4">
                  You can set your browser to refuse all or some browser
                  cookies, or to alert you when websites set or access cookies.
                  If you disable or refuse cookies, please note that some parts
                  of this website may become inaccessible or not function
                  properly.
                </p>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-sm text-yellow-800">
                  <strong>Note:</strong> We use cookies primarily to keep your
                  shopping cart active and to remember your login status.
                </div>
              </section>

              {/* 5. Security */}
              <section
                id="security"
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-50 rounded-lg text-green-600">
                    <Lock size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Data Security
                  </h2>
                </div>
                <p className="leading-relaxed">
                  We have put in place appropriate security measures to prevent
                  your personal data from being accidentally lost, used or
                  accessed in an unauthorized way, altered or disclosed. In
                  addition, we limit access to your personal data to those
                  employees, agents, contractors and other third parties who
                  have a business need to know.
                </p>
              </section>

              {/* 6. Your Rights */}
              <section
                id="rights"
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <Shield size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Your Rights
                  </h2>
                </div>
                <p className="leading-relaxed mb-4">
                  Under certain circumstances, you have rights under data
                  protection laws in relation to your personal data, including
                  the right to request access, correction, erasure, restriction,
                  transfer, to object to processing, to portability of data and
                  (where the lawful ground of processing is consent) to withdraw
                  consent.
                </p>
              </section>

              {/* 7. Contact Us */}
              <section
                id="contact"
                className="bg-gray-900 rounded-2xl p-8 shadow-lg text-white"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/10 rounded-lg text-white">
                    <Mail size={24} />
                  </div>
                  <h2 className="text-xl font-bold">Contact Us</h2>
                </div>
                <p className="leading-relaxed text-gray-300 mb-6">
                  If you have any questions about this privacy policy or our
                  privacy practices, please contact our Data Privacy Manager.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:privacy@DbessShop.com"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition"
                  >
                    Email Support
                  </a>
                  <div className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-700 rounded-lg text-gray-300">
                    Kumasi, Ghana
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Simple Icon component for the badge
const CheckCircleIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export default PrivacyPolicy;
