import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../firebase";
import { useLocation } from "react-router-dom";

export default function TicketCard() {
  const location = useLocation();
  const passedIndex = location.state?.index; // Make sure this matches how it's passed

  const [ticketData, setTicketData] = useState(null);
  const [ticketList, setTicketList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, "ticketinfo"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const tickets = Object.values(data.tickets || {}); // 🔁 Convert to array

          const index =
            typeof passedIndex === "number" &&
            passedIndex >= 0 &&
            passedIndex < tickets.length
              ? passedIndex
              : 0;

          setTicketData(data);
          setTicketList(tickets);
          setSelectedIndex(index);
        }
      } catch (error) {
        console.error("Error loading ticket data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [passedIndex]);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-gray-500">Loading ticket info...</p>
      </div>
    );
  }

  if (!ticketData || ticketList.length === 0) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-red-500">No valid ticket data found.</p>
      </div>
    );
  }

  const ticket = ticketList[selectedIndex];

  return (
    <div className="flex flex-col items-center mt-32">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-64 shadow-xl relative overflow-hidden">
        {/* Semi-circle notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-white rounded-b-full z-10" />

        {/* Ticket content */}
        <div className="relative z-20 text-center">
          <p className="text-sm text-gray-300 mt-20 mb-4">
            {ticketData.level || "N/A"}
          </p>

          <div className="flex justify-between text-sm font-medium mb-6">
            <div className="flex flex-col items-center">
              <span className="text-gray-400">SEC</span>
              <span>{ticket.sec || "N/A"}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-400">ROW</span>
              <span>{ticket.row || "N/A"}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-400">SEAT</span>
              <span>{ticket.seat || "N/A"}</span>
            </div>
          </div>

          <div className="rounded-md flex justify-center items-center">
            <img src="/t.png.jpeg" alt="Ticket Icon" className="h-10" />
          </div>

          <p className="text-xs text-gray-400 mt-2 italic flex items-center justify-center gap-1">
            <img src="/ticket.png" alt="Verified Icon" className="h-3 w-3" />
            ticketmaster.verified
          </p>
        </div>
      </div>
    </div>
  );
}
