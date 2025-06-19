import React, { useState, useEffect } from "react";
import { ref, set, get } from "firebase/database";
import { db } from "../../firebase"; // adjust the path as needed
import SavedCardDisplay from "./SavedCardDisplay"; // adjust path if needed

export default function ChSection1() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [availableMethods, setAvailableMethods] = useState([]);

  const [showCardForm, setShowCardForm] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
    country: "United States",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: "",
    phone: "",
    saveCard: true,
    setPrimary: false,
  });
  const [cardSaving, setCardSaving] = useState(false);

  const methods = [
    { name: "PayPal", logo: "/logos/paypal.png" },
    { name: "Venmo", logo: "/logos/venmo.png" },
    { name: "Zelle", logo: "/logos/zelle.png" },
    { name: "Apple Pay", logo: "/logos/applepay.png" },
    { name: "Cash App", logo: "/logos/cashapp.png" },
  ];

  useEffect(() => {
    const fetchAvailableMethods = async () => {
      try {
        const snapshot = await get(ref(db, "payment_cards"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setAvailableMethods(Object.keys(data));
        } else {
          setAvailableMethods([]);
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        setAvailableMethods([]);
      }
    };

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

  const handleCardSubmit = async () => {
    const cardRef = ref(db, "credit_cards/userCard");

    setCardSaving(true);

    try {
      await set(cardRef, cardInfo);
      alert("Card saved successfully!");
      setCardInfo({
        name: "",
        number: "",
        expiry: "",
        cvv: "",
        country: "United States",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postal: "",
        phone: "",
        saveCard: true,
        setPrimary: false,
      });
      setShowCardForm(false);
    } catch (error) {
      console.error("Error saving card:", error);
      alert("Failed to save card.");
    } finally {
      setCardSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border block sm:hidden rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">PAYMENT</h2>
      <p className="text-sm text-gray-700 mb-4">
        To provide flexibility, we offer alternative payment methods if credit or debit card payments don’t work ; please review the following options.
      </p>

      <div className="mb-4">
        <h3 className="font-bold text-sm">Use Credit/Debit Card</h3>

        {/* Inserted SavedCardDisplay component here */}


        <SavedCardDisplay />

        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 text-xl font-bold">
              {showCardForm ? "←" : "+"}
            </span>
            <img src="/logos/card.png.png" alt="card" className="w-10 h-7" />
          </div>
          <button
            onClick={() => setShowCardForm(!showCardForm)}
            className="text-blue-600 text-sm underline"
          >
            {showCardForm ? "Back to Stored Cards" : "Add New Card"}
          </button>
        </div>

        {showCardForm && (
          <div className="mt-4 space-y-3 border p-4 rounded-xl bg-gray-50">
            <div className="flex justify-between text-sm text-gray-600 space-x-2">
              <img src="/logos/express.png.png" className="w-10" />
              <img src="/logos/visa.png.png" className="w-10" />
              <img src="/logos/mastercard.png.png" className="w-10" />
              <img src="/logos/discover.png.png" className="w-10" />
              <img src="/logos/diner.png.png" className="w-10" />
              <img src="/logos/maestro.png.png" className="w-10" />
            </div>

            <input type="text" placeholder="Name on Card" value={cardInfo.name} onChange={e => setCardInfo({ ...cardInfo, name: e.target.value })} className="w-full border rounded px-2 py-2 text-sm" />
            <input type="text" placeholder="Card Number" value={cardInfo.number} onChange={e => setCardInfo({ ...cardInfo, number: e.target.value })} className="w-full border rounded px-2 py-2 text-sm" />
            <input type="text" placeholder="Expiration Date (MM/YY)" value={cardInfo.expiry} onChange={e => setCardInfo({ ...cardInfo, expiry: e.target.value })} className="w-full border rounded px-2 py-2 text-sm" />
            <input type="password" placeholder="Security Code (CVV)" value={cardInfo.cvv} onChange={e => setCardInfo({ ...cardInfo, cvv: e.target.value })} className="w-full border rounded px-2 py-2 text-sm" />

            <select value={cardInfo.country} onChange={e => setCardInfo({ ...cardInfo, country: e.target.value })} className="w-full border rounded px-2 py-2 text-sm">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
            <input type="text" placeholder="Address Line 1" value={cardInfo.address1} onChange={e => setCardInfo({ ...cardInfo, address1: e.target.value })} className="w-full border rounded px-2 py-2 text-sm" />
            <input type="text" placeholder="Address Line 2 (Optional)" value={cardInfo.address2} onChange={e => setCardInfo({ ...cardInfo, address2: e.target.value })} className="w-full border rounded px-2 py-2 text-sm" />
            <input type="text" placeholder="City" value={cardInfo.city} onChange={e => setCardInfo({ ...cardInfo, city: e.target.value })} className="w-full border rounded px-2 py-2 text-sm" />
            <input type="text" placeholder="State" value={cardInfo.state} onChange={e => setCardInfo({ ...cardInfo, state: e.target.value })} className="w-full border rounded px-2 py-2 text-sm" />
            <input type="text" placeholder="Postal Code" value={cardInfo.postal} onChange={e => setCardInfo({ ...cardInfo, postal: e.target.value })} className="w-full border rounded px-2 py-2 text-sm" />
            <input type="text" placeholder="Phone Number" value={cardInfo.phone} onChange={e => setCardInfo({ ...cardInfo, phone: e.target.value })} className="w-full border rounded px-2 py-2 text-sm" />

            <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" checked={cardInfo.saveCard} onChange={() => setCardInfo({ ...cardInfo, saveCard: !cardInfo.saveCard })} />
              <span>Save this card for future purchases <a href="#" className="text-blue-600">Privacy policy</a></span>
            </label>

            <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" checked={cardInfo.setPrimary} onChange={() => setCardInfo({ ...cardInfo, setPrimary: !cardInfo.setPrimary })} />
              <span>Set as a primary card for payment</span>
            </label>

            <div className="flex space-x-4">
              <button onClick={handleCardSubmit} disabled={cardSaving} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                {cardSaving ? "Saving..." : "Add New Card"}
              </button>
              <button onClick={() => setShowCardForm(false)} className="w-full text-blue-600 py-2 px-4">Cancel</button>
            </div>
          </div>
        )}
      </div>

      <h3 className="text-md font-semibold mb-2">Seller's payment methods</h3>
      <div className="space-y-3 mb-4">
        {methods.map((method) => {
          const isAvailable = availableMethods.includes(method.name);
          return (
            <label
              key={method.name}
              className={`flex items-center space-x-3 border rounded-xl p-2 ${isAvailable ? "hover:bg-gray-50 cursor-pointer" : "bg-gray-100 opacity-60"}`}
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
