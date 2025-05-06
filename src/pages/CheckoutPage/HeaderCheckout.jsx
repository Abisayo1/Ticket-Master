import React, { useEffect, useState } from 'react';

const HeaderCheckout = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen -mb-8 block sm:hidden tablet:-mb-32 bg-gray-100">
            {/* Mobile-Only: Sticky ticketmaster header */}
            <div
                className="fixed top-0 w-full flex justify-center z-50 border-t-[2px] bg-black text-white"  // Added sm:hidden to hide on desktop
                style={{ borderTopColor: '#034ddc' }}
            >
                <div className={`w-full max-w-md transition-all duration-300 ease-in-out ${scrolled ? 'py-2 px-2' : 'p-3'}`}>
                    {!scrolled ? (
                        <div className="text-sm italic text-gray-300">ticketmaster®</div>
                    ) : (
                        <div className="text-3xl italic font-bold text-white">t</div>
                    )}
                </div>
            </div>

            {/* Mobile-Only: Page content wrapper */}
            <div className="flex justify-center pt-20 sm:pt-0"> {/* pt-20 makes room for fixed header */}
                <div className="w-full max-w-md bg-black text-white -mt-9 relative overflow-hidden sm:hidden"> {/* sm:hidden hides on desktop */}
                    {/* Diagonal overlay */}
                    <div className="absolute top-0 right-0 w-28 h-16 bg-[repeating-linear-gradient(-45deg,_#444_0,_#444_2px,_transparent_2px,_transparent_4px)] pointer-events-none z-10"></div>

                    {/* White background from middle downward */}
                    <div className="absolute top-40 left-0 w-full h-full bg-white z-0"></div>

                    {/* Checkout heading (scrolls like normal content) */}
                    <div className="p-4 relative z-20">
                        <div className="text-xl font-bold border-b-4 border-blue-600 w-fit">CHECKOUT</div>
                    </div>

                    {/* Event Info Card */}
                    <div className="relative z-10 mx-4 mt-4 p-4 bg-white text-black rounded shadow-md">
                        <h2 className="font-bold">GRAND NATIONAL TOUR: KENDRICK LAMAR AND SZA</h2>
                        <p className="text-sm text-gray-700">Fri · May 9, 2025 · 7:00 PM</p>
                        <p className="text-sm text-gray-700">
                            MetLife Stadium - East Rutherford, New Jersey
                        </p>
                        <p className="text-sm text-gray-700">
                            SEC 311, Row 2, Seats 3 - 4{' '}
                            <a className="text-blue-600 underline ml-1" href="#">
                                View Seats
                            </a>
                        </p>
                    </div>

                    {/* Delivery Info Card */}
                    <div className="relative z-10 mx-4 mt-11 mb-6 p-4 bg-white text-black rounded shadow-md">
                        <h3 className="font-bold">DELIVERY</h3>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-sm">Mobile</span>
                            <span className="text-sm font-semibold">FREE</span>
                        </div>
                        <p className="text-sm text-gray-700">
                            To access your tickets for entry, you’ll need to download the Ticketmaster App or add your tickets to your mobile wallet.
                        </p>
                    </div>
                </div>
            </div>             
        </div>
    );
};

export default HeaderCheckout;
