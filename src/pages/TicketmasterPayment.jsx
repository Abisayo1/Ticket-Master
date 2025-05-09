import React, { useEffect, useRef, useState } from "react";

export default function TicketmasterPayment() {
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
    const [showStickyT, setShowStickyT] = useState(false);
    const paymentRef = useRef(null);

    // Countdown
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            if (paymentRef.current) {
                const rect = paymentRef.current.getBoundingClientRect();
                setShowStickyT(rect.top <= 0);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative bg-black text-white w-full max-w-screen overflow-x-hidden">
            {/* Sticky "t" block bar */}
            {showStickyT && (
                <div className="fixed top-0 left-0 w-full bg-black z-50">
                    <div className="italic font-bold text-xl px-4 py-2">t</div>
                </div>
            )}

            {/* Top section */}
            <div className="p-6 flex justify-between items-center">
                <div className="z-10">
                    {!showStickyT && (
                        <p className="text-sm italic font-semibold">
                            ticketmaster<sup>®</sup>
                        </p>
                    )}
                </div>
                <div className="z-10 text-xl font-semibold">{formatTime(timeLeft)}</div>
            </div>

            {/* Blue top line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />

            {/* Decorative lines */}
            <div className="absolute top-0 right-0 w-32 h-20 overflow-hidden pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {[...Array(10)].map((_, i) => (
                        <line
                            key={i}
                            x1={i * 10}
                            y1="0"
                            x2={i * 10 - 40}
                            y2="100"
                            stroke="white"
                            strokeWidth="2"
                            strokeOpacity="0.2"
                        />
                    ))}
                </svg>
            </div>

            {/* Main content */}
            <div ref={paymentRef} className="p-2">
                <h1 className="text-3xl font-bold mb-8 relative  ml-5 inline-block">
                    <span className="relative z-10">Payment</span>
                    <span className="absolute left-0 -bottom-4 w-full h-2 bg-blue-600 z-0"></span>
                </h1>
                {/* Add responsive content below as needed */}
            </div>
        </div>
    );
}
