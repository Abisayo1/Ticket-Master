import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ Added Routes here
import UploadForm from './pages/UploadForm';
import Home from './pages/Home';
import SplashScreen from './pages/component/SplashScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UploadForm />} />
        <Route path='/uploadform' element={<UploadForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
