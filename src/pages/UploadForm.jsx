import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase'; // Import 'storage' from your firebase.js

export default function UploadForm() {
  const [formData, setFormData] = useState({
    heading1: '',
    heading2: '',
    heading3: '',
    heading4: '',
    body1: '',
    body2: '',
    body3: '',
    body4: '',
    body5: '',
    fees: '',
  });
  const [logoFile, setLogoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogoChange = (e) => {
    if (e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      let logoURL = '';
  
      // Upload logo image if a file is selected
      if (logoFile) {
        const logoStorageRef = storageRef(storage, `logos/latest_logo`);
        await uploadBytes(logoStorageRef, logoFile);
        logoURL = await getDownloadURL(logoStorageRef);
      }
  
      const finalData = { ...formData, logo: logoURL };
  
      // Overwrite the data in Firebase Realtime Database
      const dataRef = ref(db, 'uploads/latest'); // fixed path to always overwrite
      await set(dataRef, finalData); // use 'set' instead of 'push'
  
      alert('Form submitted and overwritten in Firebase!');
      
      // Reset form
      setFormData({
        heading1: '',
        heading2: '',
        heading3: '',
        heading4: '',
        body1: '',
        body2: '',
        body3: '',
        body4: '',
        body5: '',
        fees: '',
      });
      setLogoFile(null);
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      alert('Failed to save data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Upload Content</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Upload Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full p-2 border border-gray-300 rounded-xl"
            required
          />
        </div>

        {['heading1', 'heading2', 'heading3', 'heading4', 'body1', 'body2', 'body3', 'body4', 'body5', 'fees'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace(/(\d+)/, ' $1').toUpperCase()}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-xl"
            required
          />
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
