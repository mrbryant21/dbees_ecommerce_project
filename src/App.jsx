import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Error404 from "./errors/404.jsx";
import CartAndCheckout from "./pages/CartandCheckout";
import UserAuth from "./pages/auth/UserAuth";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UserProfile from "./pages/profile/UserProfile";
import OrderSuccess from "./pages/OrderSuccess";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import CookiePolicy from "./pages/CookiePolicy.jsx";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import SizeGuide from "./pages/SizeGuide"
import Wishlist from "./pages/Wishlist";
import Returns from "./pages/Returns";

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<Category />} />
            <Route path="/shop/:category/:subcategory" element={<Category />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<CartAndCheckout />} />
            <Route path="/checkout" element={<CartAndCheckout />} />
            <Route path="/auth" element={<UserAuth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* <Route path="/checkout" element={<Checkout/> } /> */}
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/size-guide" element={<SizeGuide />} /> 
            <Route path="/returns" element={<Returns />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}


export default App;
