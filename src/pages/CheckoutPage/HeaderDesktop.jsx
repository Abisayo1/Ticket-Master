import React, { useEffect, useState } from "react";

export default function HeaderDesktop() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="hidden relative sm:block bg-black text-white font-sans">
            {/* Logo Header */}
            <div className="fixed top-0 w-full z-50 border-t-4 border-[#034ddc] bg-black px-4 py-3 overflow-hidden transition-all duration-500 ease-in-out">

    {/* Striped top-right decoration - only visible when not scrolled */}
    {!scrolled && (
        <div className="absolute top-0 right-0 w-28 h-16 bg-[repeating-linear-gradient(-45deg,_#444_0,_#444_2px,_transparent_2px,_transparent_4px)] pointer-events-none z-10 transition-opacity duration-500 ease-in-out opacity-100" />
    )}

    <div className="max-w-6xl mx-auto relative z-10">
        <div
            className={`
                text-white italic font-semibold transition-all duration-500 ease-in-out
                ${scrolled ? 'text-3xl font-bold lowercase' : 'text-2xl'}
            `}
        >
            {scrolled ? (
                <span className="transition-all relative duration-500 ease-in-out">t</span>
            ) : (
                <span className="transition-all duration-500 ease-in-out">ticketmaster<sup>®</sup></span>
            )}
        </div>
    </div>
</div>
<div className="absolute top-40 left-0 w-full h-full bg-white z-0 pointer-events-none"></div>



            <div className="max-w-6xl mx-auto p-4">
            
                {/* Header */}
                <div className="text-4xl font-bold mb-6">
                    <span className="border-b-4 border-blue-500 pb-1">CHECKOUT</span>
                </div>

             {/* Content layout */}
<div className="grid relative z-10 grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Left section */}
    <div className="space-y-6">
        {/* Delivery */}
        <div className="bg-white text-black rounded-lg p-4 shadow">
            <h2 className="text-lg font-bold">DELIVERY</h2>
            <div className="flex justify-between">
                <span>Mobile</span>
                <span className="font-bold">FREE</span>
            </div>
            <p className="text-sm mt-2">
                These mobile tickets will be transferred to you directly from a trusted seller. You'll receive an email with instructions on how to accept them on the original ticket provider's mobile app. Please provide details needed for the transfer.
            </p>

            {/* Name Input */}
            <div className="mt-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Email Input */}
            <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    </div>
</div>

            </div>

        </div>
    );
}
