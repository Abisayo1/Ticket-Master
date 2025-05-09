import React, { useState, useEffect } from "react";
import { ref as dbRef, push, set, get } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Copy } from 'lucide-react';

export default function ZellePayment() {
  const [receiptFile, setReceiptFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const navigate = useNavigate();


  // Firebase values
  const [amount, setAmount] = useState("");
  const [bankLabel, setBankLabel] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankNumberLabel, setBankNumberLabel] = useState("");
  const [bankNumber, setBankNumber] = useState("");

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch payment and bank details
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const totalSnap = await get(dbRef(db, "orders/total/totalAmount"));
        const bankSnap = await get(dbRef(db, "bank/details"));

        setAmount(totalSnap.val() || "0.00");
        const bankData = bankSnap.val() || {};

        setBankLabel(bankData.Bank || "ZELLE NAME");
        setBankName(bankData.BankName || "");
        setBankNumberLabel(bankData.BankNo || "ZELLE NUMBER");
        setBankNumber(bankData.Number || "");
      } catch (error) {
        console.error("Failed to fetch payment info:", error);
      }
    };

    fetchPaymentDetails();
  }, []);

  const handleFileChange = (e) => {
    setReceiptFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!receiptFile) {
      alert("Press camera icon to upload screenshot of receipt");
      return;
    }

    setUploading(true);
    try {
      const imageRef = storageRef(storage, `receipts/${Date.now()}_${receiptFile.name}`);
      await uploadBytes(imageRef, receiptFile);
      const downloadURL = await getDownloadURL(imageRef);

      const newReceiptRef = push(dbRef(db, "receipts"));
      await set(newReceiptRef, {
        receiptUrl: downloadURL,
        timestamp: Date.now(),
      });

      setUploaded(true);
      alert("Receipt uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload receipt.");
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied!");
    });
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 p-4 min-h-screen">
      {/* Main card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mb-4">
  <div className="border-b pb-4 mb-4">
    <h2 className="text-sm font-semibold text-gray-500">{bankLabel}</h2>
    <p className="text-lg font-semibold text-gray-800">{bankName}</p>

    <h2 className="mt-4 text-sm font-semibold text-gray-500">{bankNumberLabel}</h2>
    <div className="flex justify-between items-center">
      <p className="text-lg text-gray-800">{bankNumber}</p>
      <button
        className="text-gray-400 hover:text-gray-600"
        onClick={() => copyToClipboard(bankNumber)}
      >
        <Copy className="w-5 h-5" />
      </button>
    </div>

    <h2 className="mt-4 text-sm font-semibold text-gray-500">AMOUNT</h2>
    <div className="flex justify-between items-center">
      <p className="text-lg text-gray-800">${amount}</p>
      <button
        className="text-gray-400 hover:text-gray-600"
        onClick={() => copyToClipboard(`$${amount}`)}
      >
        <Copy className="w-5 h-5" />
      </button>
    </div>        <p className="mt-4 text-sm text-gray-500 text-center">
            This account is for this transaction only and
            <br />
            expires in <span className="text-green-600">{formatTime(timeLeft)}</span>
          </p>
        </div>
  
        <div className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg py-2 px-3 justify-between hover:bg-gray-100">
            <button
              onClick={handleUpload}
              className="text-left flex-1 text-gray-800"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Submit Payment Receipt"}
            </button>
            <label htmlFor="receiptUpload" className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="receiptUpload"
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
            disabled={!uploaded}
            className={`w-full py-2 rounded-lg ${
              uploaded
                ? "bg-blue-600 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-700 cursor-not-allowed"
            }`}
          >
            I've sent the money
          </button>
        </div>
      </div>
  
      {/* Buttons outside the card */}
      <div className="flex gap-4 mt-8 w-full max-w-md">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 flex-1 hover:bg-gray-100"
        >
          <PencilSquareIcon className="h-5 w-5" />
          Change Payment Method
        </button>
        <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 flex-1 hover:bg-gray-100">
          <XMarkIcon className="h-5 w-5" />
          Cancel Payment
        </button>
      </div>
    </div>
  );
  }
