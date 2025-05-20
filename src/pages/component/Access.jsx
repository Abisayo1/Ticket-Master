import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';

function Access({ setAccessGranted }) {
  const [userCode, setUserCode] = useState('');
  const [storedCode, setStoredCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const returnPath = location.state?.returnPath || '/';

  useEffect(() => {
    const codeRef = ref(db, 'codes/code');
    const unsubscribe = onValue(codeRef, (snapshot) => {
      const code = snapshot.val();
      setStoredCode(code);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = () => {
    if (userCode === storedCode) {
      setAccessGranted(true);
      navigate(returnPath);
    } else {
      alert('Invalid code. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="mb-28 text-center relative -translate-y-6">
        <h1 className="text-5xl font-extrabold italic text-blue-700 leading-none tracking-tight">
          Ticketmaster<sup className="text-sm align-top">®</sup>
        </h1>
        <p className="text-sm font-bold italic text-blue-600 mt-1">
          Verified Resale Method
        </p>
      </div>
      <div className="flex flex-col items-center text-center w-full max-w-md px-6 py-8 bg-white shadow-lg rounded-xl transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter Access Code</h2>
        <p className="text-gray-600 text-sm mb-4">
          To gain access, a verified resale code is required from the seller.
        </p>
        <input
          type="password"
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          className="border border-gray-300 px-4 py-2 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Access Code"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-200 w-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Access;
