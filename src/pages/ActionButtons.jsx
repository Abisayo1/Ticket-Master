import React from "react";

export default function ActionButtons() {
  return (
    <div className="flex justify-center p-4">
      <div className="flex gap-4 w-[300px]">
        <button className="flex-1 bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md hover:bg-blue-700 transition">
          Transfer
        </button>
        <button className="flex-1 bg-gray-300 text-white font-semibold py-2 px-6 rounded-xl shadow-md cursor-not-allowed">
          Sell
        </button>
      </div>
    </div>
  );
}
