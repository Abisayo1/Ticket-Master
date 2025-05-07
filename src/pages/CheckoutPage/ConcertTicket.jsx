import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase"; // Adjust the path to your Firebase config

export default function ConcertTicket() {
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    const ticketRef = ref(db, "uploads/latest");
    const unsubscribe = onValue(ticketRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTicketData(data);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!ticketData) {
    return null; // or <p>Loading...</p> if you want a loading state
  }

  return (
    <div className="max-w-[490px] p-20 absolute right-20 top-[760px] hidden sm:block shadow-lg rounded-2xl border border-gray-200">
      <img
        src={ticketData.logo}
        alt="Stadium Map"
        className="rounded-t-2xl"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {ticketData.heading1}
        </h2>
        <p className="text-sm text-gray-600">{ticketData.heading2}</p>
        <p className="text-sm text-gray-600 mb-2">{ticketData.heading3}</p>
        <p className="text-sm text-gray-800 font-medium">{ticketData.body2}</p>
      </div>
    </div>
  );
}
