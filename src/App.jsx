import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import UploadForm from './pages/UploadForm';
import Home from './pages/Home';
import SplashScreen from './pages/component/SplashScreen';
import Checkout from './pages/CheckoutPage/Checkout';
import UploadCheckoutForm from './pages/UploadCheckoutForm';
import PaymentPage from './pages/PaymentPage';
import UploadZelle from './pages/UploadZelle';
import UploadAvailableCard from './pages/UploadAvaiableCard';
import EmailTicket from './pages/EmailTicket';
import UploadTicketInfo from './pages/UploadTicketInfo';
import TicketDetails from './pages/TicketDetails';
import BarcodeTicket from './pages/BarcodeTicket';
import Access from './pages/component/Access';
import FourDigitCodeUploader from './pages/FourDigitCodeUploader';
import TransferStatusFlow from './pages/TransferStatusFlow';
import FirebaseDataPage from './pages/FirebaseDataPage';
import UploadTicketInfos from './pages/UploadTicketInfos';
import EmailTickets from './pages/EmailTickets';
import TicketDetailss from './pages/TicketDetailss';
import BarcodeTickets from './pages/BarcodeTickets';

function ProtectedRoute({ accessGranted, children }) {
  const location = useLocation();
  if (!accessGranted) {
    return <Navigate to="/access" state={{ returnPath: location.pathname }} replace />;
  }
  return children;
}

function App() {
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setAccessGranted(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/access" element={<Access setAccessGranted={setAccessGranted} />} />

        <Route path="/" element={
          <ProtectedRoute accessGranted={accessGranted}>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/longer" element={
          <TransferStatusFlow />

        } />

        <Route path="/admindash" element={
          <FirebaseDataPage />

        } />
        <Route path="/home" element={
          <ProtectedRoute accessGranted={accessGranted}>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/uploadform" element={

          <UploadForm />

        } />
        <Route path="/uploadcheckoutform" element={

          <UploadCheckoutForm />

        } />
        <Route path="/checkout" element={
          <ProtectedRoute accessGranted={accessGranted}>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/splashscreen" element={
          <ProtectedRoute accessGranted={accessGranted}>
            <SplashScreen />
          </ProtectedRoute>
        } />
        <Route path="/payment" element={
          <ProtectedRoute accessGranted={accessGranted}>
            <PaymentPage />
          </ProtectedRoute>
        } />
        <Route path="/zelleupload" element={

          <UploadZelle />

        } />
        <Route path="/avail" element={

          <UploadAvailableCard />

        } />
        <Route path="/display/:username" element={

          <EmailTicket />

        } />

        <Route path="/displays/:username" element={

          <EmailTickets />

        } />


        <Route path="/ticketinfo" element={

          <UploadTicketInfo />

        } />

        <Route path="/ticketinfos" element={

          <UploadTicketInfos />

        } />

        <Route path="/code" element={
          <FourDigitCodeUploader />

        } />
        <Route path="/ticketdetails" element={

          <TicketDetails />

        } />

             
        <Route path="/barcode" element={

          <BarcodeTicket />

        } />


         <Route path="/sticketdetails" element={

          <TicketDetailss />

        } />

         <Route path="/sbarcode" element={

          <BarcodeTickets />

        } />

       

      </Routes>
    </BrowserRouter>
  );
}

export default App;
