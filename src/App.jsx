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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
