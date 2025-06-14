import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

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
    insuranceFee: '',
    ticketQuantity: '',
    price: '',
    fees: '',
  });

  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null); // ✅ New banner file
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

  const handleBannerChange = (e) => {
    if (e.target.files[0]) {
      setBannerFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let logoURL = '';
      let bannerURL = '';

      if (logoFile) {
        const logoStorageRef = storageRef(storage, 'logos/latest_logo');
        await uploadBytes(logoStorageRef, logoFile);
        logoURL = await getDownloadURL(logoStorageRef);
      }

      if (bannerFile) {
        const bannerStorageRef = storageRef(storage, 'banners/latest_banner');
        await uploadBytes(bannerStorageRef, bannerFile);
        bannerURL = await getDownloadURL(bannerStorageRef);
      }

      const finalData = {
        ...formData,
        ticketQuantity: Number(formData.ticketQuantity),
        price: Number(formData.price),
        fees: Number(formData.fees),
        logo: logoURL,
        banner: bannerURL, // ✅ Save banner URL too
      };

      const dataRef = ref(db, 'uploads/latest');
      await set(dataRef, finalData);

      alert('Form submitted with images successfully!');

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
        insuranceFee: '',
        ticketQuantity: '',
        price: '',
        fees: '',
      });
      setLogoFile(null);
      setBannerFile(null);
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      alert('Failed to save data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldLabels = {
    heading1: 'Heading 1',
    heading2: 'Heading 2',
    heading3: 'Heading 3',
    heading4: 'Heading 4',
    body1: 'Body 1',
    body2: 'Body 2',
    body3: 'Body 3',
    body4: 'Body 4',
    body5: 'Body 5',
    insuranceFee: 'Insurance Fee',
    ticketQuantity: 'Ticket Quantity',
    price: 'Price',
    fees: 'Additional Fees',
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

        <div>
          <label className="block mb-1 font-medium">Upload Banner</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            className="w-full p-2 border border-gray-300 rounded-xl"
            required
          />
        </div>

        {Object.keys(fieldLabels).map((field) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="mb-1 font-medium text-gray-700">
              {fieldLabels[field]}
            </label>
            <input
              id={field}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-xl"
              required
            />
          </div>
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
