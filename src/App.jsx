import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ Added Routes here
import UploadForm from './pages/UploadForm';
import Home from './pages/Home';
import SplashScreen from './pages/component/SplashScreen';
import Checkout from './pages/CheckoutPage/Checkout';
import UploadCheckoutForm from './pages/UploadCheckoutForm';
import PaymentPage from './pages/PaymentPage';
import UploadZelle from './pages/UploadZelle';
import UploadAvailableCard from './pages/UploadAvaiableCard';
import FourDigitCodeUploader from './pages/FourDigitCodeUploader';
import EmailTicket from './pages/EmailTicket';
import UploadTicketInfo from './pages/UploadTicketInfo';
import TicketDetails from './pages/TicketDetails';
import BarcodeTicket from './pages/BarcodeTicket';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/uploadform' element={<UploadForm />} />
        <Route path='/uploadcheckoutform' element={<UploadCheckoutForm />} />
        <Route path = '/checkout' element = {<Checkout />}/>
        <Route path = '/home' element = {<Home />}/>
        <Route path = '/splashscreen' element = {<SplashScreen />}/>
        <Route path = '/payment' element = {<PaymentPage />}/>
        <Route path = '/zelleupload' element = {<UploadZelle />}/>
        <Route path='/avail' element={<UploadAvailableCard />} />
        <Route path='/code' element={<FourDigitCodeUploader />} />
        <Route path='/display' element={<EmailTicket />} />
        <Route path='ticketinfo' element={<UploadTicketInfo/>}/>
        <Route path='/ticketdetails' element={<TicketDetails />} />
        <Route path='/barcode' element={<BarcodeTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
