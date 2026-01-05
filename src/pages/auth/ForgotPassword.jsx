import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setTimer(60); // Start 60s cooldown for resend
    }, 1000);
  };

  // Countdown Timer Logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* --- LEFT COLUMN: Image --- */}
      <div className="hidden lg:block relative bg-gray-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1515488042361-25f4682ce396?auto=format&fit=crop&q=80&w=1000"
          alt="Peaceful Baby"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
        <div className="relative h-full flex flex-col justify-end p-12">
          <blockquote className="text-xl text-white font-medium leading-relaxed max-w-md">
            "Don't worry, we've got you covered. Security and peace of mind are
            our top priorities."
          </blockquote>
        </div>
      </div>

      {/* --- RIGHT COLUMN: Content --- */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-white relative">
        {/* Back Button */}
        <Link
          to="/auth"
          className="absolute top-8 left-8 text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>

        <div className="w-full max-w-md space-y-8">
          {/* STATE 1: SUCCESS (Check Inbox) */}
          {isSubmitted ? (
            <div className="text-center animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Check your inbox
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                We've sent a password reset link to{" "}
                <span className="font-bold text-gray-800">{email}</span>.
              </p>

              <div className="mt-8 space-y-4">
                <button
                  onClick={() => window.open("mailto:")}
                  className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-pink-600 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Open Email App <ArrowRight size={18} />
                </button>

                <div className="text-sm text-gray-500">
                  Didn't receive the email?{" "}
                  {timer > 0 ? (
                    <span className="font-bold text-pink-600">
                      Resend in {timer}s
                    </span>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="font-bold text-pink-600 hover:underline"
                    >
                      Click to resend
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* STATE 2: FORM (Enter Email) */
            <>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
                  <div className="w-12 h-12 border-2 border-pink-500 rounded-xl flex items-center justify-center -rotate-3 bg-white">
                    <RefreshCw size={24} className="text-pink-500" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Forgot Password?
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  No worries, we'll send you reset instructions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
                >
                  Reset Password
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
