import React, { useState, useRef } from "react";

const PriceRangeSlider = ({ min, max, onChange, currency }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);

  // Convert value to percentage for the colored track width
  const getPercent = (value) => Math.round(((value - min) / (max - min)) * 100);

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxVal - 100); // Prevent crossing
    setMinVal(value);
    minValRef.current = value;
    onChange({ min: value, max: maxVal });
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minVal + 100); // Prevent crossing
    setMaxVal(value);
    maxValRef.current = value;
    onChange({ min: minVal, max: value });
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
          Filter by Price
        </h3>
      </div>

      {/* Slider Container */}
      <div className="relative w-full h-2 mb-6">
        {/* Background Track (Gray) */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-full z-0"></div>

        {/* Active Track (Pink) */}
        <div
          className="absolute h-2 bg-pink-500 rounded-full z-10"
          style={{
            left: `${getPercent(minVal)}%`,
            width: `${getPercent(maxVal) - getPercent(minVal)}%`,
          }}
        ></div>

        {/* Min Value Slider (Left Circle) */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          className="thumb z-30"
          style={{ zIndex: minVal > max - 100 ? "50" : "30" }}
        />

        {/* Max Value Slider (Right Circle) */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          className="thumb z-40"
        />
      </div>

      {/* Price Display Boxes */}
      <div className="flex justify-between items-center">
        <div className="border-2 border-gray-100 px-4 py-2 rounded-lg">
          <span className="text-xs text-gray-400 block">Min Price</span>
          <span className="font-bold text-gray-700">
            {currency} {minVal}
          </span>
        </div>
        <div className="text-gray-300 font-bold">-</div>
        <div className="border-2 border-gray-100 px-4 py-2 rounded-lg">
          <span className="text-xs text-gray-400 block">Max Price</span>
          <span className="font-bold text-gray-700">
            {currency} {maxVal}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
