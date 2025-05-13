import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, set } from 'firebase/database';
import { db } from '../firebase';
import SplashScreen from './component/SplashScreen';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import LoadingOverlay from './component/LoadingOverlay';

export default function Home() {
  const navigate = useNavigate();

  const [logoUrl, setLogoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [storedCode, setStoredCode] = useState('');
  const [checkingCode, setCheckingCode] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  const [content, setContent] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(2);
  const [price, setPrice] = useState(0);
  const [fees, setFees] = useState(0);

  // Fetch access code
  useEffect(() => {
    const fetchAccessCode = async () => {
      try {
        const codeRef = ref(db, 'codes/code');
        const snapshot = await get(codeRef);
        if (snapshot.exists()) {
          setStoredCode(snapshot.val());
        }
      } catch (error) {
        console.error('Error fetching access code:', error);
      } finally {
        setCheckingCode(false);
      }
    };

    fetchAccessCode();
  }, []);

  // Fetch logo from storage
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const storage = getStorage();
        const listRef = storageRef(storage, 'logos/');
        const res = await listAll(listRef);

        if (res.items.length > 0) {
          const firstImageRef = res.items[0];
          const url = await getDownloadURL(firstImageRef);
          setLogoUrl(url);
        } else {
          console.log('No images found in logos folder');
        }
      } catch (error) {
        console.error('Error fetching logo from storage:', error);
      }
    };

    fetchLogo();
  }, []);

  // Splash screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Fetch content from database
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentRef = ref(db, 'uploads');
        const snapshot = await get(contentRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const firstItem = Object.values(data)[0];
          setContent(firstItem);

          if (firstItem.ticketQuantity) setTicketQuantity(firstItem.ticketQuantity);
          if (firstItem.price) setPrice(firstItem.price);
          if (firstItem.fees) setFees(firstItem.fees);
        } else {
          console.log('No data found');
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setIsContentLoaded(true);
      }
    };

    fetchContent();
  }, []);

  // Show splash screen until timeout AND content loaded
  if (showSplash || !isContentLoaded) {
    return <SplashScreen />;
  }

  if (checkingCode) return <div>Checking access...</div>;

 if (!accessGranted) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="mb-36 mt-8 text-center relative -translate-y-6">
        <h1 className="text-4xl font-extrabold italic text-blue-700 leading-none">
          Ticketmaster<sup className="text-sm align-top">®</sup>
        </h1>
        <p className="text-base font-extrabold italic text-blue-700 mt-1 ml-36">
          Verified Resale method
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Enter Access Code</h2>
      <p className="text-gray-600 text-sm mb-4 text-center max-w-md">
       To gain access a verified resale code would be required from the seller.
      </p>
      <input
        type="password"
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        className="border border-gray-300 px-4 py-2 mb-4 rounded w-full max-w-sm"
        placeholder="Access Code"
      />
      <button
        onClick={() => {
          if (userCode === storedCode) {
            setAccessGranted(true);
          } else {
            alert('Invalid code. Please try again.');
          }
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}




  const { heading1, heading2, heading3, heading4, body1, body2, body3, body4, body5 } = content;

  const increaseQuantity = () => {
    if (Number(ticketQuantity) < 5) {
      setTicketQuantity(ticketQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (ticketQuantity > 1) {
      setTicketQuantity(ticketQuantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isLoading && <LoadingOverlay />}

      {/* Header */}
      <div className="bg-black border-t-4 border-[#034ddc] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-left">
            <button className="text-2xl">&#9776;</button>
            <div className="text-xl ml-4 italic font-bold flex items-center">
              <span>ticketmaster</span>
              <span className="ml-1">®</span>
            </div>
          </div>
          <div className="mt-2 text-sm">{heading1}</div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4">
            <img
              onClick={() => navigate('/uploadform')}
              src="/image1.jpg"
              alt="Event"
              className="w-full md:w-48 h-32 object-cover hidden sm:block rounded-lg"
            />
            <div>
              <h1 className="text-l font-bold">{heading2}</h1>
              <h2 className="text-l">{heading3}</h2>
              <h3 className="text-md text-gray-300">{heading4}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Info */}
      <div className="bg-white px-4 sm:px-6 py-6">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
            <img
              src={logoUrl}
              alt="Ticket"
              className="w-20 h-20 object-cover rounded-md mb-2 sm:mb-0"
            />
            <div className="sm:text-left -mt-20 mb-20 md:mt-0 md:mb-0 text-right">
              <h4 className="text-sm font-semibold">{body1}</h4>
              <p className="text-sm text-gray-600">{body2}</p>
            </div>
          </div>

          <hr className="my-2 border-gray-300 sm:hidden" />

          <p className="text-sm sm:text-left text-left">{body3}</p>
          <hr className="my-2 border-gray-300 sm:hidden" />

          <p className="text-sm text-black-600 font-bold sm:text-left text-left">{body4}</p>
          <hr className="my-2 border-gray-300 sm:hidden" />

          <div className="flex justify-between items-center sm:block"></div>
        </div>

        <div className="mt-6">
          <div className="mb-2">
            <span className="text-base font-medium block">Verified Resale Ticket</span>
            <div className="flex items-center gap-1">
              <span className="text-base font-medium">
                ${Number(price) * Number(ticketQuantity)}.00
              </span>
              <span className="text-sm text-gray-500">+${fees}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <div className="flex items-center -mt-16 border rounded-lg overflow-hidden">
              <button
                onClick={decreaseQuantity}
                style={{ backgroundColor: '#949494' }}
                className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center"
              >
                -
              </button>
              <span className="px-4 py-2 bg-gray-100">{ticketQuantity}</span>
              <button
                onClick={increaseQuantity}
                className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Subtotal */}
        <div className="mt-16 border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>SUBTOTAL</span>
            <span>${Number(price) * Number(ticketQuantity) + Number(fees)}.00</span>
          </div>
          <div className="text-sm text-gray-600">{ticketQuantity} Tickets</div>
        </div>

        {/* Next Button */}
        <button
          onClick={async () => {
            try {
              setIsLoading(true);
              const ticketRef = ref(db, 'uploads/latest/ticketQuantity');
              await set(ticketRef, ticketQuantity);
              navigate('/checkout');
            } catch (error) {
              console.error('Error updating ticket quantity:', error);
              setIsLoading(false);
            }
          }}
          className="w-full bg-green-600 hover:bg-green-700 mt-10 text-white text-lg py-3 rounded-none"
        >
          Next
        </button>
      </div>
    </div>
  );
}
