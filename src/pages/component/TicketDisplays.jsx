import React, { useEffect, useState, useRef } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import AddToAppleWalletButton from "./AddToAppleWalletButton.jsx";

// TicketCard component
function TicketCard({ sharedData, ticket, timeLeft, index, username }) {
  if (!sharedData || !ticket) return null;

  const { level, topic1, topic2, image } = sharedData;
  const { sec, row, seat } = ticket;
  const navigate = useNavigate();

  return (
    <div className="w-full flex-shrink-0 snap-center px-4 max-w-lg">
      <div className="rounded-2xl overflow-hidden bg-white">
        <div className="text-white text-center py-2 text-lg font-bold" style={{ backgroundColor: '#1c4ed5' }}>
          {level}
        </div>
        <div className="flex justify-between px-6 py-4 bg-blue-600 text-white font-semibold text-sm">
          <span className="text-center">SEC<br />{sec}</span>
          <span className="text-center">ROW<br />{row}</span>
          <span className="text-center">SEAT<br />{seat}</span>
        </div>
        <div
          className="relative flex flex-col items-center text-white p-6 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent z-0" />
          <div className="relative z-10 mt-auto text-center">
            <div className="text-sm font-bold mt-28">{topic1}</div>
            <div className="text-sm">{topic2}</div>
          </div>
        </div>
        <div className="text-center text-gray-700 text-sm p-4">
          <AddToAppleWalletButton />
        </div>
        <div className="flex justify-around py-4 mt-10 mr-10 ml-10 text-blue-600 text-sm font-medium">
          <button
            onClick={() => navigate("/sbarcode", { state: { ticketIndex: index, username } })}
          >
            View Barcode
          </button>
          <button
            onClick={() => navigate("/sticketdetails", { state: { ticketIndex: index, username } })}
          >
            Ticket Details
          </button>
        </div>
        <div className="text-white text-center py-3 text-sm font-semibold" style={{ backgroundColor: '#1c4ed5' }}>
          <div className="flex items-center justify-center space-x-1">
            <img src="/ticket.png" alt="Verified" className="w-4 h-4" />
            <span>ticketmaster.verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main TicketDisplays component
export default function TicketDisplays() {
  const [ticketData, setTicketData] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const scrollRef = useRef(null);
  const { username } = useParams(); // 🟢 Get username from the URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, `ticketinfos/${username}`)); // 🔵 Fetch user-specific data
        if (snapshot.exists()) {
          const data = snapshot.val();
          setTicketData(data);
        }
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    if (!ticketData?.timestamp) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = ticketData.timestamp - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const totalSeconds = Math.floor(diff / 1000);
        setTimeLeft({
          days: Math.floor(totalSeconds / (3600 * 24)),
          hours: Math.floor((totalSeconds % (3600 * 24)) / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ticketData]);

  useEffect(() => {
    if (ticketData) {
      const timer = setTimeout(() => setShowButtons(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [ticketData]);

  const handleScroll = () => {
    const scrollLeft = scrollRef.current.scrollLeft;
    const slideWidth = scrollRef.current.clientWidth;
    const index = Math.round(scrollLeft / slideWidth);
    setCurrentIndex(index);
  };

  const tickets = ticketData?.tickets || [];

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 space-y-4">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full overflow-x-scroll flex snap-x snap-mandatory space-x-4 pb-4 scroll-smooth hide-scrollbar"
      >
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <TicketCard
              key={index}
              index={index}
              username={username}
              sharedData={ticketData}
              ticket={ticket}
              timeLeft={timeLeft}
            />
          ))
        ) : (
          <TicketCard
            index={0}
            username={username}
            sharedData={ticketData}
            ticket={{ sec: "-", row: "-", seat: "-" }}
            timeLeft={timeLeft}
          />
        )}
      </div>

      <div className="flex space-x-2">
        {tickets.map((_, index) => (
          <span
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentIndex === index ? "bg-blue-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {showButtons && (
        <div className="flex justify-center p-4">
          <div className="flex gap-4 w-[300px]">
            <button className="flex-1 bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl hover:bg-blue-700 transition">
              Transfer
            </button>
            <button className="flex-1 bg-gray-300 text-white font-semibold py-2 px-6 rounded-xl cursor-not-allowed">
              Sell
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
