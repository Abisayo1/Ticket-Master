import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { db } from '../firebase';
import SplashScreen from './component/SplashScreen';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';



export default function Home() {
  const navigate = useNavigate();
  const [logoUrl, setLogoUrl] = useState('');

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const storage = getStorage();
        const listRef = storageRef(storage, 'logos/');
        const res = await listAll(listRef);
  
        if (res.items.length > 0) {
          // Get download URL of the first image
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

useEffect(() => {
  const timer = setTimeout(() => {
    setShowSplash(false);
  }, 2500); // 2.5 seconds splash screen

  return () => clearTimeout(timer);
}, []);

  const [content, setContent] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(2);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentRef = ref(db, 'uploads');
        const snapshot = await get(contentRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setContent(Object.values(data));
        } else {
          console.log('No data found');
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };
    fetchContent();
  }, []);

  if (!content) {
    return <div>Loading...</div>;
  }

  const { logo, heading1, heading2, heading3, heading4, body1, body2, body3, body4, body5, fees} = content[0];

  const increaseQuantity = () => {
    if (ticketQuantity < 5) {
      setTicketQuantity(ticketQuantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (ticketQuantity > 1) {
      setTicketQuantity(ticketQuantity - 1);
    }
  };
  
  
  if (showSplash) {
    return <SplashScreen />;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-black text-white">
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
            <img onClick={() => navigate('/uploadform')}
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
        <div className="text-center md:text-left mb-4">
          <h4 className="text-lg font-semibold">{body1}</h4>
          <p className="text-sm text-gray-600">{body2}</p>
        </div>

        <div className="flex items-start gap-4 border border-gray-300 p-4 rounded-md">
  <img
    src= {logoUrl}
    alt="Ticket"
    className="w-20 h-20 object-cover rounded-md"
  />
  <div className="flex-1 space-y-2">
    <p className="text-sm">{body3}</p>
    <p className="text-sm text-red-600">{body4}</p>
    <p className="text-sm text-gray-700">{body5}</p>
  </div>
</div>


        {/* Ticket Controls */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-medium">Ticket Price</span>
            <span className="text-base font-medium">${132 * ticketQuantity}.00</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={decreaseQuantity}
                className="bg-blue-600 text-white px-4 py-2"
              >
                -
              </button>
              <span className="px-4 py-2 bg-gray-100">{ticketQuantity}</span>
              <button
                onClick={increaseQuantity}
                className="bg-blue-600 text-white px-4 py-2"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-500">{fees}</span>
          </div>
        </div>

        {/* Subtotal */}
        <div className="mt-16 border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>SUBTOTAL</span>
            <span>${132 * ticketQuantity}.00</span>
          </div>
          <div className="text-sm text-gray-600">{ticketQuantity} Tickets</div>
        </div>

        {/* Next Button */}
        <div className="mt-6">
          <button onClick={() => navigate('/uploadform')} className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-full">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
