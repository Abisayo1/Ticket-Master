import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ref, get } from "firebase/database";
import { db } from "../../firebase";

export default function GameScheduleCards({ onClose }) {
  const [topic1, setTopic1] = useState("");
  const [topic2, setTopic2] = useState("");

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const snapshot = await get(ref(db, "ticketinfos"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setTopic1(data.topic1 || "");
          setTopic2(data.topic2 || "");
        }
      } catch (error) {
        console.error("Error fetching game schedule info:", error);
      }
    };

    fetchGameInfo();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 flex items-start gap-4 shadow-lg z-50">
      <button
        className="text-gray-400 hover:text-white mt-1"
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={20} />
      </button>
      <div>
        <h2 className="text-lg font-semibold">{topic1}</h2>
        <p className="text-sm text-gray-400 mt-1">{topic2}</p>
      </div>
    </div>
  );
}
