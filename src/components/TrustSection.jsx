import React from "react";
import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Reliable shipping worldwide.",
    bgColor: "bg-[#e0f2fe]", // Your light blue
    iconColor: "text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% protected transactions.",
    bgColor: "bg-[#dcfce7]", // Your light green
    iconColor: "text-green-600",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Simple 30-day return policy.",
    bgColor: "bg-[#fce7f3]", // Your light pink
    iconColor: "text-pink-600",
  },
  {
    icon: Headset,
    title: "Customer Support",
    description: "Friendly help when needed.",
    bgColor: "bg-[#e0f2fe]", // Reusing blue for balance
    iconColor: "text-blue-600",
  },
];

const TrustSection = () => {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-pink-400 mb-6">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center p-4 rounded-xl border border-transparent hover:border-gray-100 hover:shadow-sm transition-all duration-200"
            >
              {/* Icon Container */}
              <div
                className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${feature.bgColor} mr-4`}
              >
                <feature.icon
                  className={`w-6 h-6 ${feature.iconColor}`}
                  strokeWidth={2}
                />
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
