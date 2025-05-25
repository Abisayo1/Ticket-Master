import React from "react";
import { useNavigate } from "react-router-dom";

export default function TransferStatus() {
  const navigate = useNavigate();

  const handleShowAccountNumber = () => {
    navigate(-1); // go back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center mb-24 bg-white px-4 py-8">
      <p className="text-center text-lg text-gray-800 font-medium max-w-md mb-6">
        It's taking longer than expected to confirm your transfer. You don't have to wait here till we confirm it.
      </p>

      <div className="flex items-center w-full max-w-md justify-between mb-6">
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm text-green-600 mt-1">Sent</span>
        </div>

        <div className="flex-1 h-1 bg-gray-300 mx-2 relative overflow-hidden">
          <div className="absolute top-0 h-1 bg-green-400 animate-slide w-1/5"></div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
          <span className="text-sm text-gray-500 mt-1">Received</span>
        </div>
      </div>

      <button className="bg-gray-100 text-gray-800 text-base font-medium px-6 py-2 rounded-md shadow-sm mb-3 hover:bg-gray-200 transition">
        Get help
      </button>

      <button
        onClick={handleShowAccountNumber}
        className="text-sm text-gray-500 underline hover:text-gray-700"
      >
        Show account number
      </button>

      <style jsx>{`
        @keyframes slide {
          0% {
            left: -20%;
          }
          100% {
            left: 100%;
          }
        }
        .animate-slide {
          animation: slide 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
