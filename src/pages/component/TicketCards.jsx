import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../firebase";
import { useLocation } from "react-router-dom";

export default function TicketCards() {
  const location = useLocation();
  const passedIndex = location.state?.ticketIndex;
  const passedUsername = location.state?.username; // ✅ Get username from state

  const [ticketData, setTicketData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!passedUsername) {
        console.error("No username provided in location state.");
        setLoading(false);
        return;
      }

      try {
        const userRef = ref(db, `ticketinfos/${passedUsername}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const ticketInfo = snapshot.val();
          const tickets = ticketInfo.tickets || [];

          const indexToUse =
            typeof passedIndex === "number" &&
            passedIndex >= 0 &&
            passedIndex < tickets.length
              ? passedIndex
              : 0;

          setTicketData(ticketInfo);
          setSelectedIndex(indexToUse);
        } else {
          console.error("No ticket data found for user:", passedUsername);
        }
      } catch (err) {
        console.error("Error loading ticket:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [passedIndex, passedUsername]);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-gray-500">Loading ticket info...</p>
      </div>
    );
  }

  if (!ticketData || !ticketData.tickets || !ticketData.tickets[selectedIndex]) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-red-500">No valid ticket data found.</p>
      </div>
    );
  }

  const selectedTicket = ticketData.tickets[selectedIndex];

  return (
    <div className="flex flex-col items-center mt-32">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-64 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-white rounded-b-full z-10" />

        <div className="relative z-20 text-center">
          <p className="text-sm text-gray-300 mt-20 mb-4">
            {ticketData.level || "N/A"}
          </p>

          <div className="flex justify-between text-sm font-medium mb-6">
            <div className="flex flex-col items-center">
              <span className="text-gray-400">SEC</span>
              <span>{selectedTicket.sec || "N/A"}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-400">ROW</span>
              <span>{selectedTicket.row || "N/A"}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-400">SEAT</span>
              <span>{selectedTicket.seat || "N/A"}</span>
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
