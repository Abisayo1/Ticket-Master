import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ref, get } from "firebase/database";
import { db } from "../../firebase";

const TicketDesigns = () => {
  const location = useLocation();
  const { index: ticketIndex, username } = location.state || {}; // Get both index and username

  const [ticketInfo, setTicketInfo] = useState({
    level: "",
    sec: "-",
    row: "-",
    seat: "-",
  });

  useEffect(() => {
    const fetchTicketInfo = async () => {
      if (!username) return;

      try {
        const snapshot = await get(ref(db, `ticketinfo/${username}`));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const ticketArray = data.tickets ? Object.values(data.tickets) : [];

          const ticket = ticketArray[ticketIndex] || {};

          setTicketInfo({
            level: data.level || "",
            sec: ticket.sec || "-",
            row: ticket.row || "-",
            seat: ticket.seat || "-",
          });
        }
      } catch (error) {
        console.error("Error fetching ticket info:", error);
      }
    };

    fetchTicketInfo();
  }, [ticketIndex, username]);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="text-white mt-44 mb-32 max-w-sm w-full bg-[#0b1b3c] p-6 rounded-xl relative text-center">
        <h2 className="text-lg mb-14">{ticketInfo.level}</h2>

        <div className="absolute inset-0 flex items-center mt-20 justify-center text-[380px] text-gray-600 opacity-10 font-bold select-none">
          t
        </div>

        <div className="relative z-10 flex justify-between text-lg font-semibold">
          <div>
            <p className="text-sm">SEC</p>
            <p>{ticketInfo.sec}</p>
          </div>
          <div>
            <p className="text-sm">ROW</p>
            <p>{ticketInfo.row}</p>
          </div>
          <div>
            <p className="text-sm">SEAT</p>
            <p>{ticketInfo.seat}</p>
          </div>
        </div>

        <div className="relative z-10 mt-6 bg-white p-3 rounded-md">
          <img
            src="/barcodd.jpeg" // Replace with actual barcode if dynamic
            alt="Barcode"
            className="mx-auto"
          />
          <p className="text-xs text-center text-black mt-2">
            Screenshots won't get you in.
          </p>
        </div>

        <p className="text-xs text-gray-400 mt-2 italic flex items-center justify-center gap-1">
          <img src="/ticket.png" alt="Verified Icon" className="h-3 w-3" />
          ticketmaster.verified
        </p>
      </div>
    </div>
  );
};

export default TicketDesigns;
