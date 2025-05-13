import React, { useState, useEffect } from "react";
import { ref, set, get } from "firebase/database";
import { db } from "../../firebase"; // adjust path as needed

export default function ChSection1() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [availableMethods, setAvailableMethods] = useState([]);

  const methods = [
    { name: "PayPal", logo: "/logos/paypal.png" },
    { name: "Venmo", logo: "/logos/venmo.png" },
    { name: "Zelle", logo: "/logos/zelle.png" },
    { name: "Apple Pay", logo: "/logos/applepay.png" },
    { name: "Cash App", logo: "/logos/cashapp.png" },
  ];

  useEffect(() => {
    // Check what's available in the database
    const fetchAvailableMethods = async () => {
      try {
        const snapshot = await get(ref(db, "payment_cards"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setAvailableMethods(Object.keys(data));
        } else {
          setAvailableMethods([]); // No methods available
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        setAvailableMethods([]); // Fallback
      }
    };

    // Load saved method from localStorage
    const savedMethod = localStorage.getItem("selectedPaymentMethod");
    if (savedMethod) {
      setPaymentMethod(savedMethod);
      setSubmitted(true);
    }

    fetchAvailableMethods();
  }, []);

  const handleSubmit = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const paymentRef = ref(db, "selectedPaymentMethod");
    set(paymentRef, { method: paymentMethod })
      .then(() => {
        localStorage.setItem("selectedPaymentMethod", paymentMethod);
        setSubmitted(true);
        alert("Payment method submitted!");
      })
      .catch((error) => {
        console.error("Error saving payment method:", error);
        alert("Failed to submit. Please try again.");
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 border block sm:hidden rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">PAYMENT</h2>
      <p className="text-sm text-gray-700 mb-4">
        To provide flexibility, we offer alternative payment methods since credit or debit card
        payments are not accepted; please review the following options.
      </p>

      <h3 className="text-md font-semibold mb-2">Seller's payment methods</h3>
      <div className="space-y-3 mb-4">
        {methods.map((method) => {
          const isAvailable = availableMethods.includes(method.name);
          return (
            <label
              key={method.name}
              className={`flex items-center space-x-3 border rounded-xl p-2 ${
                isAvailable ? "hover:bg-gray-50 cursor-pointer" : "bg-gray-100 opacity-60"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.name}
                checked={paymentMethod === method.name}
                onChange={() => setPaymentMethod(method.name)}
                disabled={!isAvailable}
                className="form-radio text-blue-600"
              />
              <img src={method.logo} alt={method.name} className="w-10 h-10" />
              <span className="text-sm">
                {method.name} {!isAvailable && <span className="text-red-500">(Unavailable)</span>}
              </span>
            </label>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitted}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        {submitted ? "Submitted" : "Submit Payment Method"}
      </button>
    </div>
  );
}
