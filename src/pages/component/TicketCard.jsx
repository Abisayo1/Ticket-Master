import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase"; // Adjust path if needed

export default function TicketCard() {
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    const dataRef = ref(db, 'ticketinfo');

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTicketData(data);
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  if (!ticketData) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-gray-500">Loading ticket info...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center mt-28 justify-center">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-64 shadow-xl relative overflow-hidden">
        {/* Semi-circle notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-white rounded-b-full z-10" />

        {/* Content */}
        <div className="relative z-20 text-center">
          <p className="text-sm text-gray-300 mt-20 mb-4">
            {ticketData.level || "N/A"}
          </p>

          <div className="flex justify-between text-sm font-medium mb-6">
            <div className="flex flex-col items-center">
              <span className="text-gray-400">SEC</span>
              <span>{ticketData.sec || "N/A"}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-400">ROW</span>
              <span>{ticketData.row || "N/A"}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-400">SEAT</span>
              <span>{ticketData.seat || "N/A"}</span>
            </div>
          </div>

          <div className="rounded-md flex justify-center items-center">
            <img src="/t.png.jpeg" alt="Ticket Icon" className="h-10" />
          </div>

          {/* Verified text with image */}
          <p className="text-xs text-gray-400 mt-2 italic flex items-center justify-center gap-1">
            <img src="/ticket.png" alt="Verified Icon" className="h-3 w-3" />
            ticketmaster.verified
          </p>
        </div>
      </div>
    </div>
  );
}
