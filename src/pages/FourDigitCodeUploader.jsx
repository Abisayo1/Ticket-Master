import React, { useState } from "react";
import { db } from "../firebase"; // adjust the path to your firebase config
import { ref, push, set } from "firebase/database";

export default function FourDigitCodeUploader() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
  if (!/^\d{4}$/.test(code)) {
    setMessage("Please enter a valid 4-digit code.");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    const codeRef = ref(db, "codes"); // this will always overwrite "codes"
    await set(codeRef, {
      code: code,
      timestamp: Date.now(),
    });
    setMessage("Code uploaded successfully!");
    setCode("");
  } catch (error) {
    console.error("Upload error:", error);
    setMessage("Failed to upload code.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-lg font-semibold text-center mb-4">Enter 4-Digit Code</h2>
        
        <input
          type="text"
          maxLength={4}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          placeholder="1234"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center text-xl tracking-widest"
        />

        <button
          onClick={handleSubmit}
          disabled={loading || code.length !== 4}
          className={`w-full mt-4 py-2 rounded-lg ${
            loading || code.length !== 4
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Uploading..." : "Submit Code"}
        </button>

        {message && (
          <p className="mt-3 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
