import React, { useEffect, useState } from "react";
import { ref, get, set } from "firebase/database";
import { db } from "../../firebase"; // Adjust path as needed
import { useNavigate } from "react-router-dom"; // Step 1


export default function DesktopTicketOrder({ insuranceSelected }) {
  const navigate = useNavigate();
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [data, setData] = useState({
    ticketQuantity: 0,
    price: 0,
    fees: 0,
    insuranceFee: 0,
    processingFee: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uploadsSnap = await get(ref(db, "uploads/latest"));
        const checkoutSnap = await get(ref(db, "uploadcheckout/latest"));

        const uploads = uploadsSnap.val() || {};
        const checkout = checkoutSnap.val() || {};

        setData({
          ticketQuantity: Number(uploads.ticketQuantity) || 0,
          price: Number(uploads.price) || 0,
          fees: Number(uploads.fees) || 0,
          insuranceFee: Number(uploads.insuranceFee) || 0,
          processingFee: Number(checkout.processingFee) || 0,
        });
      } catch (err) {
        console.error("Error fetching ticket order data:", err);
      }
    };

    fetchData();
  }, []);

  const { ticketQuantity, price, fees, insuranceFee, processingFee } = data;


  const subtotal = ticketQuantity * price;
  const totalFees = ticketQuantity * fees;
  const totalInsurance = insuranceSelected ? ticketQuantity * insuranceFee : 0;
  const total = subtotal + totalFees + totalInsurance + processingFee;

  const handlePlaceOrder = async () => {
    if (agreeChecked) {
      try {
        await set(ref(db, "orders/total"), {
          totalAmount: total,
          timestamp: Date.now(), // optional: track when the order was placed
        });
        navigate("/payment");
      } catch (error) {
        console.error("Error saving total to Firebase:", error);
        alert("There was an issue processing your order. Please try again.");
      }
    } else {
      alert("Please agree to the Terms of Use before placing your order.");
    }
  };

  return (
    <div className="max-w-xl p-20 absolute right-20 top-48 border hidden sm:block bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        TOTAL <span className="float-right">${total.toFixed(2)}</span>
      </h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Tickets</h3>
        <p className="text-sm text-gray-500">
          Verified Resale Tickets: ${price.toFixed(2)} x {ticketQuantity}
        </p>
        <p className="text-right font-medium">${subtotal.toFixed(2)}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Fees</h3>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Service Fee: ${fees.toFixed(2)} x {ticketQuantity}</span>
          <span>${totalFees.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Order Processing Fee</span>
          <span>${processingFee.toFixed(2)}</span>
        </div>
        {insuranceSelected && (
          <div className="flex justify-between text-sm text-gray-500">
            <span>Insurance Fee: ${insuranceFee.toFixed(2)} x {ticketQuantity}</span>
            <span>${totalInsurance.toFixed(2)}</span>
          </div>
        )}
      </div>

      <a href="#" className="text-sm text-blue-600 underline mb-2 inline-block">Cancel Order</a>

      <p className="text-xs text-gray-600 mb-1">*All Sales Final - No Refunds or Exchanges</p>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="agree"
          className="mr-2"
          checked={agreeChecked}
          onChange={(e) => setAgreeChecked(e.target.checked)} // 🔵 Handle checkbox
        />
        <label htmlFor="agree" className="text-sm">
          I have read and agree to the current{" "}
          <a href="#" className="text-blue-600 underline">Terms of Use</a>.
        </label>
      </div>

      <button
        onClick={handlePlaceOrder}
        className={`w-full font-semibold py-2 px-4 rounded-xl 
          ${agreeChecked ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        Place Order
      </button>

      <p className="text-xs text-gray-500 mt-2">*Exceptions may apply, see our Terms of Use.</p>
    </div>
  );
}
