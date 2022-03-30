import React from "react";

interface lineData {
  index: number;
}

const Line = ({ index }: lineData) => {
  return (
    <div className="absolute inset-y-0 -mb-6 ">
      <div className={`w-1 bg-gray-300 mt-8 h-full`}></div>
      <div
        className={`absolute border-4 rounded-full dot-scale 
        ${index > 0
            ? "top-8 left-1/2 w-4 h-4 bg-gray-300 border-emerald-700"
            : "top-8 left-1/2 w-6 h-6 bg-gray-300 border-emerald-700"
          } `}
      />
    </div>
  );
};

export default Line;
