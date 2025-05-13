import React, { useState } from "react";
import { db } from "../firebase";
import { ref, set } from "firebase/database";

export default function UploadAvailableCard() {
  const [selectedCards, setSelectedCards] = useState({
    PayPal: { selected: false, description: "" },
    Venmo: { selected: false, description: "" },
    Zelle: { selected: false, description: "" },
    "Apple Pay": { selected: false, description: "" },
    "Cash App": { selected: false, description: "" },
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCards((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], selected: checked },
    }));
  };

  const handleDescriptionChange = (event, card) => {
    const { value } = event.target;
    setSelectedCards((prevState) => ({
      ...prevState,
      [card]: { ...prevState[card], description: value },
    }));
  };

 const handleSubmit = async () => {
  try {
    const selectedData = {};

    // Prepare only selected cards
    Object.keys(selectedCards).forEach((card) => {
      if (selectedCards[card].selected) {
        selectedData[card] = {
          description: selectedCards[card].description,
        };
      }
    });

    // Overwrite the entire 'payment_cards' node
    await set(ref(db, "payment_cards"), selectedData);

    alert("Payment methods uploaded successfully!");
  } catch (error) {
    console.error("Error uploading payment methods:", error);
    alert("Error uploading payment methods.");
  }
};



  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md mt-5 border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900">Available Payment Methods</h2>
      <p className="text-sm text-gray-700 mb-4">
        Select the payment methods and provide a description for each method
        to guide users on how to use them for ticket payment.
      </p>

      <div className="space-y-4">
        {Object.keys(selectedCards).map((card) => (
          <div key={card} className="flex items-center space-x-3">
            <input
              type="checkbox"
              name={card}
              checked={selectedCards[card].selected}
              onChange={handleCheckboxChange}
              id={card}
              className="h-4 w-4"
            />
            <label htmlFor={card} className="text-sm text-gray-800">
              {card}
            </label>
            {selectedCards[card].selected && (
              <div className="mt-2">
                <textarea
                  placeholder={`Describe how to use ${card} for payment`}
                  value={selectedCards[card].description}
                  onChange={(e) => handleDescriptionChange(e, card)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={4}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Upload Payment Methods
        </button>
      </div>
    </div>
  );
}
