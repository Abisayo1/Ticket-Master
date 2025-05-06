import React, { useState } from "react";

export default function DesktopPayment() {
  const [paymentMethod, setPaymentMethod] = useState("");

  const methods = [
    { name: "PayPal", logo: "/logos/paypal.png" },
    { name: "Venmo", logo: "/logos/venmo.png" },
    { name: "Zelle", logo: "/logos/zelle.png" },
    { name: "Apple Pay", logo: "/logos/applepay.png" },
    { name: "$ Cash App", logo: "/logos/cashapp.png" },
  ];

  return (
    <div className="max-w-xl p-6 mx-28 border hidden relative sm:block rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">PAYMENT</h2>
      <p className="text-sm text-gray-700 mb-4">
        To provide flexibility, we offer alternative payment methods since credit or debit card
        payments are not accepted; please review the following options.
      </p>

      <h3 className="text-md font-semibold mb-2">Sellers payment methods</h3>
      <div className="space-y-3">
        {methods.map((method) => (
          <label
            key={method.name}
            className="flex items-center space-x-3 border rounded-xl p-2 hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.name}
              checked={paymentMethod === method.name}
              onChange={() => setPaymentMethod(method.name)}
              className="form-radio text-blue-600"
            />
            <img src={method.logo} alt={method.name} className="w-10 h-10s" />
            <span className="text-sm">{method.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
