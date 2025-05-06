import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ Added Routes here
import UploadForm from './pages/UploadForm';
import Home from './pages/Home';
import SplashScreen from './pages/component/SplashScreen';
import Checkout from './pages/CheckoutPage/Checkout';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Checkout />} />
        <Route path='/uploadform' element={<UploadForm />} />
        <Route path = '/checkout' element = {<Checkout />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
