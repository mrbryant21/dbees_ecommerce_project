import React, { useState } from "react";
import {
  Ruler,
  Baby,
  Shirt,
  Scale,
  ArrowRight,
  Info,
  Check,
} from "lucide-react";
import Footer from "../components/Footer";

const SizeGuide = () => {
  const [activeCategory, setActiveCategory] = useState("baby"); // 'baby' or 'toddler'
  const [unit, setUnit] = useState("metric"); // 'metric' (cm/kg) or 'imperial' (in/lbs)

  // --- DATA ---
  const babyData = {
    metric: [
      { label: "Newborn", height: "Up to 50 cm", weight: "2.3 - 3.6 kg" },
      { label: "0 - 3 Months", height: "50 - 61 cm", weight: "3.6 - 5.7 kg" },
      { label: "3 - 6 Months", height: "61 - 67 cm", weight: "5.7 - 7.5 kg" },
      { label: "6 - 12 Months", height: "67 - 72 cm", weight: "7.5 - 9.3 kg" },
      {
        label: "12 - 18 Months",
        height: "72 - 78 cm",
        weight: "9.3 - 11.1 kg",
      },
      {
        label: "18 - 24 Months",
        height: "78 - 83 cm",
        weight: "11.1 - 12.5 kg",
      },
    ],
    imperial: [
      { label: "Newborn", height: "Up to 20 in", weight: "5 - 8 lbs" },
      { label: "0 - 3 Months", height: "20 - 24 in", weight: "8 - 12.5 lbs" },
      {
        label: "3 - 6 Months",
        height: "24 - 26.5 in",
        weight: "12.5 - 16.5 lbs",
      },
      {
        label: "6 - 12 Months",
        height: "26.5 - 28.5 in",
        weight: "16.5 - 20.5 lbs",
      },
      {
        label: "12 - 18 Months",
        height: "28.5 - 30.5 in",
        weight: "20.5 - 24.5 lbs",
      },
      {
        label: "18 - 24 Months",
        height: "30.5 - 32.5 in",
        weight: "24.5 - 27.5 lbs",
      },
    ],
  };

  const toddlerData = {
    metric: [
      {
        label: "2 Years",
        height: "83 - 88 cm",
        chest: "50 - 52 cm",
        waist: "48 - 50 cm",
      },
      {
        label: "3 Years",
        height: "88 - 95 cm",
        chest: "52 - 54 cm",
        waist: "50 - 52 cm",
      },
      {
        label: "4 Years",
        height: "95 - 105 cm",
        chest: "54 - 56 cm",
        waist: "52 - 54 cm",
      },
      {
        label: "5 Years",
        height: "105 - 110 cm",
        chest: "56 - 58 cm",
        waist: "54 - 55 cm",
      },
      {
        label: "6 Years",
        height: "110 - 116 cm",
        chest: "58 - 60 cm",
        waist: "55 - 56 cm",
      },
    ],
    imperial: [
      {
        label: "2 Years",
        height: "33 - 35 in",
        chest: "19.5 - 20.5 in",
        waist: "19 - 19.5 in",
      },
      {
        label: "3 Years",
        height: "35 - 38 in",
        chest: "20.5 - 21 in",
        waist: "19.5 - 20.5 in",
      },
      {
        label: "4 Years",
        height: "38 - 41 in",
        chest: "21 - 22 in",
        waist: "20.5 - 21 in",
      },
      {
        label: "5 Years",
        height: "41 - 44 in",
        chest: "22 - 23 in",
        waist: "21 - 21.5 in",
      },
      {
        label: "6 Years",
        height: "44 - 46 in",
        chest: "23 - 24 in",
        waist: "21.5 - 22 in",
      },
    ],
  };

  const currentData =
    activeCategory === "baby" ? babyData[unit] : toddlerData[unit];

  return (
    <>
      <div className="bg-gray-50 min-h-screen pb-20 font-sans">
        <div className="h-28"></div> {/* Spacer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- PAGE HEADER --- */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold mb-6">
              <Ruler size={14} /> Size Matters
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Find the perfect fit
            </h1>
            <p className="text-gray-500 text-lg">
              Babies grow fast. Use our guide to ensure your little one stays
              comfortable at every stage.
            </p>
          </div>

          {/* --- CONTROLS BAR --- */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 gap-4">
            {/* Category Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveCategory("baby")}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeCategory === "baby"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Baby size={18} /> Baby (0-24m)
              </button>
              <button
                onClick={() => setActiveCategory("toddler")}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeCategory === "toddler"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Shirt size={18} /> Toddler (2-6y)
              </button>
            </div>

            {/* Unit Toggle */}
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-bold ${unit === "metric" ? "text-gray-900" : "text-gray-400"}`}
              >
                CM / KG
              </span>
              <button
                onClick={() =>
                  setUnit(unit === "metric" ? "imperial" : "metric")
                }
                className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors focus:outline-none"
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    unit === "metric" ? "left-1" : "translate-x-7 left-0"
                  }`}
                ></div>
              </button>
              <span
                className={`text-sm font-bold ${unit === "imperial" ? "text-gray-900" : "text-gray-400"}`}
              >
                IN / LBS
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* --- LEFT: DATA TABLE --- */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Age Range
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Height
                        </th>
                        {activeCategory === "baby" ? (
                          <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Weight
                          </th>
                        ) : (
                          <>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                              Chest
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                              Waist
                            </th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {currentData.map((row, index) => (
                        <tr
                          key={index}
                          className="hover:bg-blue-50/30 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <span className="text-sm font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                              {row.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-medium font-mono">
                            {row.height}
                          </td>
                          {activeCategory === "baby" ? (
                            <td className="px-6 py-4 text-sm text-gray-600 font-medium font-mono">
                              {row.weight}
                            </td>
                          ) : (
                            <>
                              <td className="px-6 py-4 text-sm text-gray-600 font-medium font-mono">
                                {row.chest}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600 font-medium font-mono">
                                {row.waist}
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pro Tip Box */}
              <div className="mt-8 bg-pink-50 border border-pink-100 rounded-2xl p-6 flex gap-4">
                <div className="bg-white p-3 rounded-full h-fit text-pink-500 shadow-sm">
                  <Info size={24} />
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold mb-1">
                    When in doubt, size up!
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Babies grow incredibly fast. It is almost always better to
                    buy a size larger so they can grow into it, rather than a
                    size that fits perfectly today but will be too tight next
                    week.
                  </p>
                </div>
              </div>
            </div>

            {/* --- RIGHT: MEASUREMENT GUIDE (Sticky) --- */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 bg-gray-900 text-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Ruler className="text-pink-500" /> How to Measure
                </h3>

                <div className="space-y-8 relative">
                  {/* Vertical Line Connector */}
                  <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-700 z-0"></div>

                  <div className="relative z-10 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-pink-500 flex items-center justify-center font-bold text-sm shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Height</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Measure from the top of the head to the heel while the
                        child is lying down flat (for babies) or standing
                        against a wall.
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-blue-500 flex items-center justify-center font-bold text-sm shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Chest</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Measure under the arms around the fullest part of the
                        chest. Keep the tape level.
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-green-500 flex items-center justify-center font-bold text-sm shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Waist</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Measure around the natural waistline, keeping the tape
                        comfortably loose.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800">
                  <a href="/" className="w-full bg-white text-gray-900 font-bold py-3 rounded-xl hover:bg-pink-500 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer">
                    Start Shopping <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SizeGuide;
