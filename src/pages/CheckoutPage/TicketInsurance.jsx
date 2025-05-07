import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../firebase"; // Adjust this if firebase.js is elsewhere

export default function TicketInsurance() {
  const [data, setData] = useState({
    ticketQuantity: 0,
    insuranceFee: 0,
    price: 0,
    fees: 0,
    eventType: "",
    soldBy: "",
    byClick: "",
    population: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uploadsSnap = await get(ref(db, "uploads/latest"));
        const uploadCheckoutSnap = await get(ref(db, "uploadcheckout/latest"));

        const uploads = uploadsSnap.val() || {};
        const uploadCheckout = uploadCheckoutSnap.val() || {};

        setData({
          ticketQuantity: Number(uploads.ticketQuantity) || 0,
          insuranceFee: Number(uploads.insuranceFee) || 0,
          price: Number(uploads.price) || 0,
          fees: Number(uploads.fees) || 0,
          eventType: uploadCheckout.eventtype || "",
          soldBy: uploadCheckout.soldby || "",
          byClick: uploadCheckout.byclick || "",
          population: Number(uploadCheckout.population) || 0,
        });
      } catch (err) {
        console.error("Failed to fetch Firebase data:", err);
      }
    };

    fetchData();
  }, []);

  const {
    ticketQuantity,
    insuranceFee,
    price,
    fees,
    eventType,
    soldBy,
    byClick,
    population,
  } = data;

  const totalInsurance = ticketQuantity * insuranceFee;
  const totalCost = (price + fees + insuranceFee) * ticketQuantity;

  return (
    <div className="max-w-md mx-auto block sm:hidden bg-white p-6 rounded-2xl shadow-md mt-5 border border-gray-200 space-y-4">
      <h2 className="text-lg font-bold text-gray-900 flex items-center justify-between">
        TICKET INSURANCE
        <span className="text-xs text-white bg-red-500 px-2 py-0.5 rounded">
          SELECTION REQUIRED
        </span>
      </h2>

      <p className="text-sm text-gray-700">
        <strong>Get reimbursed</strong> up to 100% of what you spend on tickets including taxes,
        parking, fees or other {eventType}-related items in your order with {eventType} insurance for only{" "}
        <strong>
          ${insuranceFee.toFixed(2)} per ticket (${totalInsurance.toFixed(2)} total)
        </strong>.
      </p>

      <p className="text-sm text-gray-700">
        If you can't attend this {eventType.toLowerCase()} for a number of covered reasons like a
        covered illness, airline delays, traffic accidents, weather emergencies, if you are required
        to work and more, you can be reimbursed for your resale ticket purchase. You’ll also receive
        access to a 24-hour hotline that can give you driving suggestions, provide parking
        information, make group arrangements, and much more.
      </p>

      <p className="text-xs text-gray-500">
        Recommended/offered/sold by {soldBy}. Underwriter: Jefferson Insurance Company. Plan incl.
        insurance & assistance services. Terms & exclusions (incl. for pre-existing conditions)
        apply.{" "}
        <a href="#" className="text-blue-600 underline">
          Plan & Pricing details, disclosures, Coverage Alerts
        </a>. {byClick}
      </p>

      <div className="space-y-3">
        <div className="border border-purple-600 rounded-xl p-3 flex items-start space-x-3 bg-purple-50">
          <input type="radio" name="insurance" id="yes" className="mt-1" />
          <label htmlFor="yes" className="text-sm text-gray-800">
            <span className="block text-xs text-white bg-purple-600 px-2 py-0.5 rounded mb-1 inline-block">
              HIGHLY RECOMMENDED
            </span>
            Yes, protect my resale ticket purchase to Kendrick Lamar at MetLife Stadium.
          </label>
        </div>

        <div className="border border-gray-300 rounded-xl p-3 flex items-start space-x-3">
          <input type="radio" name="insurance" id="no" className="mt-1" />
          <label htmlFor="no" className="text-sm text-gray-800">
            No, do not protect my resale ticket purchase. I understand this decision may put my{" "}
            <strong>${totalCost.toFixed(2)}</strong> purchase at risk.
          </label>
        </div>

        <div>
          <p className="text-sm font-semibold">
            {population.toLocaleString()} people protected their tickets in the last 3 days
          </p>
        </div>
      </div>
    </div>
  );
}
