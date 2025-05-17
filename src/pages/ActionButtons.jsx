import React, { useEffect, useState } from "react";

export default function ActionButtons() {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 2000); // 4 seconds delay

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  return (
    <div className="flex justify-center p-4">
      {showButtons ? (
        <div className="flex gap-4 w-[300px]">
          <button className="flex-1 bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md hover:bg-blue-700 transition">
            Transfer
          </button>
          <button className="flex-1 bg-gray-300 text-white font-semibold py-2 px-6 rounded-xl shadow-md cursor-not-allowed">
            Sell
          </button>
        </div>
      ) : null}
    </div>
  );
}
