import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top Section: Newsletter */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Join our family
              </h3>
              <p className="text-gray-400">
                Get 10% off your first order and exclusive baby tips.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-80 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#e0f2fe] focus:ring-1 focus:ring-[#e0f2fe] transition-colors"
              />
              <button className="px-6 py-3 bg-[#e0f2fe] text-gray-900 font-semibold rounded-lg hover:bg-[#dcfce7] transition-colors duration-300 flex items-center justify-center gap-2">
                Subscribe <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <img src="/images/logo.png" alt="" />
            <p className="text-sm text-gray-400 leading-relaxed">
              Curating the finest essentials for your little ones. Quality,
              safety, and style in every package we deliver.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialLink icon={Facebook} />
              <SocialLink icon={Instagram} />
              <SocialLink icon={Twitter} />
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Shop Categories</h4>
            <ul className="space-y-3">
              <FooterLink text="Strollers & Prams" />
              <FooterLink text="Nursery Furniture" />
              <FooterLink text="Baby Clothing" />
              <FooterLink text="Feeding & Nursing" />
              <FooterLink text="Toys & Learning" />
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <FooterLink text="Track Order" />
              <FooterLink text="Returns & Exchanges" />
              <FooterLink text="Shipping Info" />
              <FooterLink text="Size Guide" />
              <FooterLink text="FAQs" />
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="text-babyBlue shrink-0" size={20} />
                <span>
                  Oppposite Boss FM Building
                  <br />
                  Adum - Kumasi
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="text-babyBlue shrink-0" size={20} />
                <span>+233 (55) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="text-babyBlue shrink-0" size={20} />
                <span>hello@dbeesbabyshop.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} DBees BabyShop. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy 
              </a>
            </div>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart size={12} className="text-babyPink fill-babyPink" />
              <a href="">
                <span>by Softnage</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sub-components for cleaner code
const FooterLink = ({ text }) => (
  <li>
    <a
      href="#"
      className="text-sm hover:text-babyBlue hover:pl-1 transition-all duration-200"
    >
      {text}
    </a>
  </li>
);

const SocialLink = ({ icon: Icon }) => (
  <a
    href="#"
    className="p-2 bg-gray-800 rounded-full hover:bg-babyBlue hover:text-gray-900 transition-all duration-300 group"
  >
    <Icon size={18} />
  </a>
);

export default Footer;
