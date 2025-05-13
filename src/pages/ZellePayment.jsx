import React, { useState, useEffect } from "react";
import { ref as dbRef, push, set, get } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Copy } from 'lucide-react';

export default function ZellePayment() {
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptName, setReceiptName] = useState("");
  const [receiptURL, setReceiptURL] = useState("");
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [payerName, setPayerName] = useState("");

  const [amount, setAmount] = useState("");
  const [bankLabel, setBankLabel] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankNumberLabel, setBankNumberLabel] = useState("");
  const [bankNumber, setBankNumber] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDescription, setPaymentDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      alert("This payment session has expired.");
      navigate(-1);
    }
  }, [timeLeft, navigate]);

  // Fetch payment details
  useEffect(() => {
    const fetchDetails = async () => {
      const totalSnap = await get(dbRef(db, "orders/total/totalAmount"));
      const bankSnap = await get(dbRef(db, "bank/details"));
      const methodSnap = await get(dbRef(db, "selectedPaymentMethod/method"));

      setAmount(totalSnap.val() || "0.00");
      const bankData = bankSnap.val() || {};
      setBankLabel(bankData.Bank || "ZELLE NAME");
      setBankName(bankData.BankName || "");
      setBankNumberLabel(bankData.BankNo || "ZELLE NUMBER");
      setBankNumber(bankData.Number || "");

      const method = methodSnap.val();
      setPaymentMethod(method || "");
      if (method) {
        const descSnap = await get(dbRef(db, `payment_cards/${method}/description`));
        setPaymentDescription(descSnap.val() || "");
      }
    };

    fetchDetails();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceiptFile(file);
      setReceiptName(file.name);
    }
  };

  const handleSubmitPayment = async () => {
    if (!receiptFile || !payerName.trim()) {
      alert("Please upload receipt and enter payer's name.");
      return;
    }

    setLoading(true);

    try {
      const imageRef = storageRef(storage, `receipts/${Date.now()}_${receiptFile.name}`);
      await uploadBytes(imageRef, receiptFile);
      const downloadURL = await getDownloadURL(imageRef);
      setReceiptURL(downloadURL);

      const newReceiptRef = push(dbRef(db, "receipts"));
      await set(newReceiptRef, {
        receiptUrl: downloadURL,
        payerName: payerName.trim(),
        timestamp: Date.now(),
      });

      alert("Payment submitted successfully!");
      setReceiptFile(null);
      setReceiptName("");
      setPayerName("");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit payment.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => alert("Copied!"));
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const isFormValid = receiptFile && payerName.trim();

  return (
    <div className="flex flex-col items-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mb-4">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{bankLabel}</h2>
          <p className="text-lg text-gray-800">{bankName}</p>

          <h2 className="mt-4 text-lg font-semibold text-gray-800">{bankNumberLabel}</h2>
          <div className="flex justify-between items-center">
            <p className="text-lg text-gray-800">{bankNumber}</p>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => copyToClipboard(bankNumber)}
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>

          <h2 className="mt-4 text-lg font-semibold text-gray-800">AMOUNT</h2>
          <div className="flex justify-between items-center">
            <p className="text-lg text-gray-800">${amount}</p>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => copyToClipboard(`$${amount}`)}
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>

          {paymentDescription && (
            <p className="mt-2 text-sm text-gray-500 text-center">{paymentDescription}</p>
          )}

          <p className="mt-4 text-sm text-gray-500 text-center">
            This account is for this transaction only and <br />
            expires in <span className="text-green-600">{formatTime(timeLeft)}</span>
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center my-2 text-blue-600">
            <svg className="animate-spin h-5 w-5 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            Uploading and saving your payment...
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            value={payerName}
            onChange={(e) => setPayerName(e.target.value)}
            placeholder="Enter name of person paying"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            disabled={loading}
          />

          <div className="flex items-center border border-gray-300 rounded-lg py-2 px-3 justify-between hover:bg-gray-100">
            <button className="text-left flex-1 text-gray-800" disabled>
              {receiptName || "Submit Payment Receipt"}
            </button>
            <label htmlFor="receiptUpload" className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="receiptUpload"
                disabled={loading}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7h2l2-3h10l2 3h2a2 2 0 012 2v9a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
                <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </label>
          </div>

          <button
            onClick={handleSubmitPayment}
            disabled={!isFormValid || loading}
            className={`w-full py-2 rounded-lg ${
              isFormValid && !loading
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-700 cursor-not-allowed"
            }`}
          >
            {loading ? "Submitting..." : "Payment Completed"}
          </button>
        </div>
      </div>

      <div className="flex gap-4 mt-8 w-full max-w-md">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 flex-1 hover:bg-gray-100"
          disabled={loading}
        >
          <PencilSquareIcon className="h-5 w-5" />
          Change Payment Method
        </button>
        <button
          className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 flex-1 hover:bg-gray-100"
          disabled={loading}
        >
          <XMarkIcon className="h-5 w-5" />
          Cancel Payment
        </button>
      </div>
    </div>
  );
}
