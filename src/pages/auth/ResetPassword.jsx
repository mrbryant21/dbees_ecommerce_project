import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Strength Logic
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length > 5) strength += 1;
    if (pass.length > 7) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    return strength; // Max 4
  };

  const strength = getStrength(password);

  const getStrengthColor = () => {
    if (strength === 0) return "bg-gray-200";
    if (strength <= 2) return "bg-red-500";
    if (strength === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength === 0) return "";
    if (strength <= 2) return "Weak";
    if (strength === 3) return "Medium";
    return "Strong";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword && strength >= 3) {
      setIsSuccess(true);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* --- LEFT COLUMN --- */}
      <div className="hidden lg:block relative bg-gray-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544126566-475a8972d33f?auto=format&fit=crop&q=80&w=1000"
          alt="Sleeping Baby"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
      </div>

      {/* --- RIGHT COLUMN --- */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {isSuccess ? (
            <div className="text-center animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={40} className="text-pink-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Password Updated!
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Your password has been changed successfully.
              </p>
              <Link
                to="/auth"
                className="mt-8 w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-pink-600 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Back to Login <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Set new password
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Must be at least 8 characters.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Password Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 ml-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
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

                  {/* Strength Meter */}
                  {password.length > 0 && (
                    <div className="px-1 pt-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">
                          Security
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase transition-colors ${
                            strength <= 2
                              ? "text-red-500"
                              : strength === 3
                                ? "text-yellow-500"
                                : "text-green-600"
                          }`}
                        >
                          {getStrengthText()}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ease-out ${getStrengthColor()}`}
                          style={{ width: `${(strength / 4) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <div
                          className={`flex items-center gap-1 text-[10px] ${password.length >= 8 ? "text-green-600" : "text-gray-400"}`}
                        >
                          <Check size={10} /> 8+ chars
                        </div>
                        <div
                          className={`flex items-center gap-1 text-[10px] ${/[0-9]/.test(password) ? "text-green-600" : "text-gray-400"}`}
                        >
                          <Check size={10} /> Number
                        </div>
                        <div
                          className={`flex items-center gap-1 text-[10px] ${/[A-Z]/.test(password) ? "text-green-600" : "text-gray-400"}`}
                        >
                          <Check size={10} /> Uppercase
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 ml-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-4 transition-all ${
                        confirmPassword && password !== confirmPassword
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                          : "border-gray-200 focus:border-pink-500 focus:ring-pink-500/10"
                      }`}
                    />
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-red-500 ml-1">
                      Passwords do not match
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={strength < 3 || password !== confirmPassword}
                  className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default ResetPassword;
