import React, { useEffect, useState, useRef } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase"; // Ensure the path is correct
import { useNavigate } from "react-router-dom";

function TicketCard({ ticketData, timeLeft }) {
  if (!ticketData) return null;

  const {
    level,
    sec,
    row,
    seat,
    topic1,
    topic2,
    image,
  } = ticketData;

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
          Ticket will be ready in:
          <div className="flex justify-center mt-2 space-x-4 text-xl font-semibold">
            <div><span>{timeLeft.days}</span><div className="text-xs">DAY</div></div>
            <div><span>{timeLeft.hours}</span><div className="text-xs">HOUR</div></div>
            <div><span>{timeLeft.minutes}</span><div className="text-xs">MIN</div></div>
            <div><span>{timeLeft.seconds}</span><div className="text-xs">SEC</div></div>
          </div>
        </div>
        <div className="flex justify-around py-4 mt-10 mr-10 ml-10 text-blue-600 text-sm font-medium" style={{ columnGap: '0px' }}>
          <button onClick={() => navigate("/barcode")}>View Barcode</button>
          <button onClick={() => navigate("/ticketdetails")}>Ticket Details</button>
        </div>
        <div className="text-white text-center py-3 text-sm font-semibold" style={{ backgroundColor: '#1c4ed5' }}>
          <div className="flex items-center justify-center space-x-0">
            <img src="/ticket.png" alt="Verified" className="w-4 h-4" />
            <span>ticketmaster.verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TicketDisplay() {
  const [ticketData, setTicketData] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketSnapshot = await get(ref(db, "ticketinfo"));
        if (ticketSnapshot.exists()) {
          const data = ticketSnapshot.val();
          setTicketData(data);
        }

        const quantitySnapshot = await get(ref(db, "uploads/latest/ticketQuantity"));
        if (quantitySnapshot.exists()) {
          const quantity = Number(quantitySnapshot.val());
          setTotalSlides(isNaN(quantity) ? 1 : quantity);
        } else {
          setTotalSlides(1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setTotalSlides(1);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!ticketData || !ticketData.timestamp) return;

    const countdown = setInterval(() => {
      const now = Date.now();
      const difference = ticketData.timestamp - now;

      if (difference <= 0) {
        clearInterval(countdown);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const totalSeconds = Math.floor(difference / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [ticketData]);

  useEffect(() => {
    if (ticketData) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [ticketData]);

  const handleScroll = () => {
    const scrollLeft = scrollRef.current.scrollLeft;
    const slideWidth = scrollRef.current.clientWidth;
    const index = Math.round(scrollLeft / slideWidth);
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6 space-y-4">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full overflow-x-scroll flex snap-x snap-mandatory space-x-4 pb-4 scroll-smooth hide-scrollbar"
      >
        {[...Array(totalSlides)].map((_, index) => (
          <TicketCard key={index} ticketData={ticketData} timeLeft={timeLeft} />
        ))}
      </div>

      <div className="flex space-x-2">
        {[...Array(totalSlides)].map((_, index) => (
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
