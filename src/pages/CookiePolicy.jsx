import React, { useState, useEffect } from "react";
import { 
  Cookie, 
  Info, 
  Settings, 
  ShieldCheck, 
  BarChart3, 
  Target, 
  ToggleRight, 
  ToggleLeft
} from "lucide-react";
import Footer from "../components/Footer";

const CookiePolicy = () => {
  const [activeSection, setActiveSection] = useState("what-are-cookies");

  // Scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["what-are-cookies", "how-we-use", "types", "manage", "contact"];
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
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans text-gray-600">
      <div className="h-28"></div> {/* Spacer */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-6">
            <Cookie size={14} /> Last Updated: January 1, 2026
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            We use cookies to sweeten your shopping experience. Here’s how we use them to keep your cart full and your login secure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT SIDEBAR (Sticky Nav) --- */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">
                On this page
              </h3>
              <nav className="space-y-1">
                {[
                  { id: "what-are-cookies", label: "What are Cookies?" },
                  { id: "how-we-use", label: "How We Use Them" },
                  { id: "types", label: "Types of Cookies" },
                  { id: "manage", label: "Managing Preferences" },
                  { id: "contact", label: "Contact Us" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? "bg-white text-amber-600 shadow-sm border-l-4 border-amber-500"
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
            
            {/* 1. What are Cookies? */}
            <section id="what-are-cookies" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                  <Info size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">What are Cookies?</h2>
              </div>
              <p className="leading-relaxed mb-4">
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
              </p>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-4 items-start">
                 <Cookie className="text-amber-500 shrink-0 mt-1" />
                 <p className="text-sm text-amber-900">
                   Think of a cookie like a memory aid. It helps us remember that you put those "Cute Baby Shoes" in your cart so they don't disappear when you click to another page.
                 </p>
              </div>
            </section>

            {/* 2. How We Use Them */}
            <section id="how-we-use" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <BarChart3 size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">How We Use Cookies</h2>
              </div>
              <p className="leading-relaxed mb-4">
                We use cookies for several reasons, detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Keeping you signed in",
                  "Remembering your cart items",
                  "Understanding how you use the site",
                  "Personalizing content for you"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 px-4 py-3 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. Types of Cookies (Visual Grid) */}
            <section id="types" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                  <Settings size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Types of Cookies We Use</h2>
              </div>
              
              <div className="space-y-4">
                
                {/* Essential Cookies */}
                <div className="border border-gray-200 rounded-xl p-5 hover:border-amber-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                       <div className="bg-gray-100 p-2 rounded-lg h-fit text-gray-600"><ShieldCheck size={20} /></div>
                       <div>
                         <h3 className="font-bold text-gray-900">Strictly Necessary Cookies</h3>
                         <p className="text-sm text-gray-500 mt-1 max-w-lg">
                           These are essential for the website to function properly. They include login sessions and shopping cart contents.
                         </p>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="flex items-center justify-end gap-2 text-green-600 text-xs font-bold uppercase tracking-wider mb-1">
                          Always Active <ToggleRight size={24} className="fill-current" />
                       </div>
                       <span className="text-xs text-gray-400">Cannot be disabled</span>
                    </div>
                  </div>
                </div>

                {/* Performance Cookies */}
                <div className="border border-gray-200 rounded-xl p-5 hover:border-amber-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                       <div className="bg-blue-50 p-2 rounded-lg h-fit text-blue-600"><BarChart3 size={20} /></div>
                       <div>
                         <h3 className="font-bold text-gray-900">Performance & Analytics</h3>
                         <p className="text-sm text-gray-500 mt-1 max-w-lg">
                           These allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                         </p>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="flex items-center justify-end gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 cursor-not-allowed opacity-50">
                          Optional <ToggleLeft size={24} />
                       </div>
                    </div>
                  </div>
                </div>

                {/* Targeting Cookies */}
                <div className="border border-gray-200 rounded-xl p-5 hover:border-amber-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                       <div className="bg-purple-50 p-2 rounded-lg h-fit text-purple-600"><Target size={20} /></div>
                       <div>
                         <h3 className="font-bold text-gray-900">Targeting & Advertising</h3>
                         <p className="text-sm text-gray-500 mt-1 max-w-lg">
                           Used to build a profile of your interests and show you relevant adverts on other sites (like Facebook or Google).
                         </p>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="flex items-center justify-end gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 cursor-not-allowed opacity-50">
                          Optional <ToggleLeft size={24} />
                       </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 4. Managing Preferences */}
            <section id="manage" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <Settings size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Managing Preferences</h2>
              </div>
              <p className="leading-relaxed mb-4">
                You can change your cookie preferences any time by clicking the "Cookie Settings" link in the footer. Alternatively, most web browsers allow some control of most cookies through the browser settings.
              </p>
              <div className="flex flex-wrap gap-3">
                 <a href="#" className="text-xs font-bold bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">Google Chrome</a>
                 <a href="#" className="text-xs font-bold bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">Safari</a>
                 <a href="#" className="text-xs font-bold bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition">Firefox</a>
              </div>
            </section>

            {/* 5. Contact */}
            <section id="contact" className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
               <h2 className="text-lg font-bold text-amber-900 mb-2">Have questions about our cookies?</h2>
               <p className="text-sm text-amber-800 mb-4">
                 If you have any questions or comments about this policy, please do not hesitate to contact us.
               </p>
               <button className="bg-white text-amber-700 font-bold px-6 py-2 rounded-lg shadow-sm hover:shadow-md transition text-sm">
                 Contact Privacy Team
               </button>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;