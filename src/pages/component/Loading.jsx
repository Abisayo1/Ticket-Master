import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center z-50">
      <div className="relative w-16 h-16">
        {/* Inner Spinner - #864bac */}
        <svg className="absolute inset-0 animate-spin" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="12"
            fill="none"
            stroke="#864bac"
            strokeWidth="6"
            strokeDasharray="60"
            strokeLinecap="round"
          />
        </svg>

        {/* Middle Spinner - #25a5a8 */}
        <svg className="absolute inset-0 animate-spin" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="24"
            fill="none"
            stroke="#25a5a8"
            strokeWidth="6"
            strokeDasharray="60"
            strokeLinecap="round"
          />
        </svg>

        {/* Outer Spinner - #0469d7 */}
        <svg className="absolute inset-0 animate-spin" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="36"
            fill="none"
            stroke="#0469d7"
            strokeWidth="6"
            strokeDasharray="60"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <p className="text-sm font-bold text-white mt-4">Waiting for Sellers Details</p>
    </div>
  );
}
