import React from "react";
import {
  Heart,
  ShieldCheck,
  Leaf,
  Users,
  Star,
  Award,
  ArrowRight,
} from "lucide-react";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      <div className="bg-white min-h-screen font-sans">
        <div className="h-28"></div> {/* Spacer */}
        {/* --- HERO SECTION --- */}
        <div className="relative overflow-hidden mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-6 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
                  <Heart size={14} className="fill-pink-700" /> Since 2020
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  We believe every baby deserves the{" "}
                  <span className="text-pink-500">softest start.</span>
                </h1>
                <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
                  BabyShop wasn't born in a boardroom. It started in a nursery.
                  We exist to bring you products that are safe, sustainable, and
                  crafted with the same love you have for your little one.
                </p>
                <div className="pt-4 flex gap-4">
                  <a href="/shop">
                    <button className="bg-gray-900 text-white font-bold px-8 py-3 rounded-full hover:bg-pink-600 transition-all shadow-lg flex items-center gap-2 cursor-pointer">
                      Start Shopping Now <ArrowRight size={18} />
                    </button>
                  </a>
                </div>
              </div>

              {/* Image Composition */}
              <div className="relative">
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=1200"
                    alt="Mother holding baby"
                    className="w-full h-full object-cover"
                  />
                  {/* Floating Badge */}
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white max-w-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-900">
                        4.9/5 Rating
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      "The only brand I trust for my newborn."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --- STATS SECTION (Dark Mode Contrast) --- */}
        <div className="bg-gray-900 py-16 mb-20 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-800">
              <div className="space-y-2">
                <h3 className="text-4xl font-extrabold text-pink-500">50k+</h3>
                <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">
                  Happy Parents
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-extrabold text-blue-400">120+</h3>
                <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">
                  Countries Served
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-extrabold text-green-400">100%</h3>
                <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">
                  Organic Cotton
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-extrabold text-purple-400">5yr</h3>
                <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">
                  Quality Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* --- CORE VALUES --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Why parents choose us
            </h2>
            <p className="text-gray-500 mt-2">
              We don't just sell products; we deliver peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors">
                <Leaf
                  size={28}
                  className="text-green-600 group-hover:text-white"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                100% Organic & Safe
              </h3>
              <p className="text-gray-500 leading-relaxed">
                We strictly use GOTS certified organic cotton and non-toxic
                dyes. No harsh chemicals, ever. Your baby's skin deserves the
                purest touch.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                <ShieldCheck
                  size={28}
                  className="text-blue-600 group-hover:text-white"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Durability Tested
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Babies are messy. Our clothes are designed to be washed, worn,
                and loved over and over again without losing their shape or
                softness.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-500 transition-colors">
                <Users
                  size={28}
                  className="text-pink-600 group-hover:text-white"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community First
              </h3>
              <p className="text-gray-500 leading-relaxed">
                We are more than a shop. We are a community of parents
                supporting parents. We donate 1% of every sale to local
                orphanages.
              </p>
            </div>
          </div>
        </div>
        {/* --- OUR TEAM / FOUNDER STORY --- */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Founder Image */}
              <div className="order-2 lg:order-1 relative">
                <img
                  src=""
                  className="rounded-2xl shadow-lg grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs hidden md:block">
                  <p className="font-serif italic text-gray-800 text-lg">
                    "I couldn't find clothes that were gentle enough for my
                    daughter's eczema, so I decided to make them myself."
                  </p>
                </div>
              </div>

              {/* Founder Text */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider">
                  <Award size={14} /> The Founder
                </div>
                <h2 className="text-3xl font-bold text-gray-900">CEO</h2>
                <p className="text-gray-500 leading-relaxed">
                  Hi, I'm Sarah. When my daughter was born, she had incredibly
                  sensitive skin. Every "cotton" outfit I bought seemed to
                  irritate her. I started researching fabrics and realized how
                  many chemicals go into standard baby clothes.
                </p>
                <p className="text-gray-500 leading-relaxed">
                  That was the spark for BabyShop. What started as a small
                  project in my garage has grown into a global brand, but our
                  mission remains the same:{" "}
                  <strong>Uncompromised quality for your little ones.</strong>
                </p>

                {/* Signature */}
                <div className="pt-4">
                  <p className="font-handwriting text-2xl text-pink-600 rotate-[-5deg]">
                    CEO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --- CTA SECTION --- */}
        <div className="py-24 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to join the family?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8">
            Experience the difference of organic, sustainable, and love-filled
            products.
          </p>
          <button className="bg-pink-600 text-white font-bold px-10 py-4 rounded-full shadow-xl hover:bg-pink-700 hover:shadow-2xl hover:-translate-y-1 transition-all">
            Start Shopping
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
