import React from "react";

const AddToAppleWalletButton = () => {
  return (
    <button className="flex items-center mx-auto bg-black -mb-32 text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
      <img
        src="logos/apple.jpeg"
        alt="Apple Wallet"
        className="w-6 h-6 mr-2"
      />
      <span className="text-sm font-medium">Add to Apple Wallet</span>
    </button>
  );
};

export default AddToAppleWalletButton;
