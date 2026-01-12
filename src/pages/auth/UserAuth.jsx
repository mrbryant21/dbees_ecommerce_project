import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";


const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success("Welcome back!");
        navigate("/profile");
      } else {
        // Signup
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await updateProfile(userCredential.user, {
          displayName: formData.fullName
        });
        toast.success("Account created successfully!");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      let errorMessage = "Authentication failed. Please try again.";
      if (error.code === 'auth/email-already-in-use') errorMessage = "Email is already registered.";
      if (error.code === 'auth/wrong-password') errorMessage = "Invalid password.";
      if (error.code === 'auth/user-not-found') errorMessage = "No account found with this email.";
      if (error.code === 'auth/weak-password') errorMessage = "Password should be at least 6 characters.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* --- LEFT COLUMN: Brand & Lifestyle Image --- */}
      {/* Hidden on mobile to keep it fast and clean */}
      <div className="hidden lg:block relative bg-gray-900 overflow-hidden">
        <img
          src="/cat_images/baby_clothing.jpeg"
          alt="Mother and Baby"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

        <div className="relative h-full flex flex-col justify-between p-12">
          {/* Logo Area */}
          <div>
            <img className="h-24" src="/images/logo.png" alt="Logo" />
          </div>

          {/* Testimonial / Brand Vibes */}
          <div className="space-y-4 max-w-md">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-yellow-800 text-[10px] font-bold">★</span>
                </div>
              ))}
            </div>
            <blockquote className="text-xl text-white font-medium leading-relaxed">
              "The quality of the organic cotton is unmatched. It's the only brand I trust for my newborn's sensitive skin."
            </blockquote>
            <div>
              <p className="text-white font-bold text-sm">Sarah Jenkins</p>
              <p className="text-gray-400 text-xs">Happy Mom & Verified Buyer</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: The Form --- */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-white relative">

        {/* Back to Home Button */}
        <Link to="/" className="absolute top-8 left-8 text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-colors">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        <div className="w-full max-w-md space-y-8">

          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {isLogin
                ? "Enter your details to access your account"
                : "Join us for exclusive offers and rewards"}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 cursor-pointer">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 cursor-pointer">
              <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78.85.04 1.96-.71 3.37-.64 2.59.16 3.79 1.83 3.86 1.92-3.11 1.76-2.53 6.64.64 8.01-.52 1.25-1.25 2.5-2.15 2.9zm-3.3-15.15c.66-1.01 1.58-1.58 2.62-1.53.25 1.63-1.25 3.19-2.77 3.23-.33-1.28.02-2.3.15-1.7z" />
              </svg>
              Apple
            </button>
          </div>

          <div className="relative flex items-center">
            <div className="grow border-t border-gray-200"></div>
            <span className=" shrink-0 mx-4 text-xs font-semibold text-gray-400 uppercase">Or continue with email</span>
            <div className="grow border-t border-gray-200"></div>
          </div>

          {/* Form Inputs */}
          <form onSubmit={handleAuth} className="space-y-4">

            {/* Show Name Field only for Signup */}
            {!isLogin && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-xs font-bold text-gray-700 ml-1">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-gray-700">Password</label>
                {isLogin && (
                  <a href="#" className="text-xs font-semibold text-pink-600 hover:text-pink-700">Forgot Password?</a>
                )}
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="flex items-start gap-2 mt-2">
                <CheckCircle2 size={16} className="text-pink-500 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-500">
                  I agree to the <span className="underline cursor-pointer">Terms & Conditions</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 flex items-center justify-center gap-2 mt-6 cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold text-pink-600 hover:text-pink-700 transition-colors"
              >
                {isLogin ? "Sign up for free" : "Log in"}
              </button>
            </p>
          </div>

        </div>

        {/* Footer Links */}
        <div className="absolute bottom-6 text-center text-xs text-gray-400 hidden sm:block">
          &copy; 2024 BabyShop Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default UserAuth;