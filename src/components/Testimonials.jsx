import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Mother of 2",
    quote:
      "The organic cotton onesies are unmatched. They wash perfectly and stay soft.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "New Dad",
    quote:
      "Fastest delivery ever. Ordered Tuesday, arrived Thursday. Support was great!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
  },
  {
    id: 3,
    name: "Emily & James",
    role: "Parents of Twins",
    quote:
      "Curated selection saves us so much time. Everything here is a winner.",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  },
  {
    id: 4,
    name: "Jessica Wu",
    role: "Toddler Mom",
    quote:
      "The learning toys are fantastic. My son is obsessed with the wooden blocks.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
  },
  {
    id: 5,
    name: "David Miller",
    role: "Gift Shopper",
    quote: "Packaging was beautiful. Made for the perfect baby shower gift.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Responsive logic to determine how many cards to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - itemsPerPage ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - itemsPerPage : prevIndex - 1,
    );
  };

  // Auto-play (optional, pauses on hover)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, itemsPerPage]);

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-pink-400">
              What Parents Say
            </h2>
            <div className="w-16 h-1 bg-[#fce7f3] mt-2 rounded-full" />
          </div>

          {/* Nav Buttons */}
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-[#e0f2fe] hover:text-blue-700 hover:border-[#e0f2fe] transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-[#e0f2fe] hover:text-blue-700 hover:border-[#e0f2fe] transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="px-3 flex-shrink-0"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <div className="h-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#e0f2fe] transition-all duration-300 group">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < item.rating ? "#fbbf24" : "none"}
                        className={
                          i < item.rating ? "text-yellow-400" : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-6 h-6 text-[#e0f2fe] -z-10 opacity-50 transform -scale-x-100" />
                    <p className="text-gray-600 italic leading-relaxed text-sm">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* User Profile */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#fce7f3]"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
