import React from "react";

export default function TicketOrder() {
  return (
    <div className="max-w-md mx-auto p-6 block sm:hidden mt-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">TOTAL <span className="float-right">$501.37</span></h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Tickets</h3>
        <p className="text-sm text-gray-500">Verified Resale Tickets: $209.00 x 2</p>
        <p className="text-right font-medium">$418.00</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Fees</h3>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Service Fee: $39.71 x 2</span>
          <span>$79.42</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Order Processing Fee</span>
          <span>$3.95</span>
        </div>
      </div>

      <a href="#" className="text-sm text-blue-600 underline mb-2 inline-block">Cancel Order</a>

      <p className="text-xs text-gray-600 mb-1">*All Sales Final - No Refunds or Exchanges</p>

      <div className="flex items-center mb-4">
        <input type="checkbox" id="agree" className="mr-2" />
        <label htmlFor="agree" className="text-sm">
          I have read and agree to the current <a href="#" className="text-blue-600 underline">Terms of Use</a>.
        </label>
      </div>

      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl">
        Place Order
      </button>

      <p className="text-xs text-gray-500 mt-2">*Exceptions may apply, see our Terms of Use.</p>
    </div>
  );
}
