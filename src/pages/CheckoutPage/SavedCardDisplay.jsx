import React, { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { db } from "../../firebase"; // Adjust path as needed
import { FaCcMastercard } from "react-icons/fa";

export default function SavedCardDisplay() {
  const [card, setCard] = useState(null);
  const [cvv, setCvv] = useState("");
  const [cvvError, setCvvError] = useState("");

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const snapshot = await get(ref(db, "credit_cards/userCard"));
        if (snapshot.exists()) {
          setCard(snapshot.val());
        }
      } catch (error) {
        console.error("Error fetching card:", error);
      }
    };

    fetchCard();
  }, []);

  const handleCvvChange = (e) => {
    const value = e.target.value;
    setCvv(value);
    if (value.length !== 3 || !/^\d+$/.test(value)) {
      setCvvError("Please enter your card security code.");
    } else {
      setCvvError("");
    }
  };

  if (!card) return <p>Loading...</p>;

  const last4Digits = card.number.slice(-4);

  return (
    <div className="max-w-md mx-auto border border-gray-300 rounded-lg bg-blue-50 p-4 space-y-3">
      <div className="flex items-start space-x-3">
        <input type="radio" name="savedCard" className="mt-1 text-blue-600" checked readOnly />
        <div>
          <div className="flex items-center space-x-2 font-semibold text-sm">
            <div className="flex space-x-1">
              <img src="/logos/mastercard.png.png" className="w-6 h-6" alt="Mastercard logo" />
              {/* <img src="/logos/mastercard2.png" className="w-6 h-6" alt="Mastercard logo" /> */}
            </div>
            <span>Mastercard – {last4Digits}</span>
          </div>
          <div className="text-gray-600 text-sm mt-1">
            {card.name} | exp. {card.expiry}
          </div>
          <div className="text-sm mt-1 space-x-3">
            <button className="text-blue-600 underline">Edit</button>
            <button className="text-blue-600 underline">Delete</button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Security Code</label>
        <div className="flex items-center space-x-3">
          <input
            type="password"
            placeholder="CVV"
            value={cvv}
            onChange={handleCvvChange}
            className={`border rounded-md px-3 py-2 text-sm w-40 ${
              cvvError ? "border-red-500" : "border-gray-300"
            }`}
          />
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <img src="/logos/card.png.png" alt="CVV Icon" className="w-6 h-6" />
            <span>3-digits on back of card</span>
          </div>
        </div>
        {cvvError && <p className="text-sm text-red-500 mt-1">{cvvError}</p>}
      </div>
    </div>
  );
}
