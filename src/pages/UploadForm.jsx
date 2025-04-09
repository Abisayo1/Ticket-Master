import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase'; // Correct import for your firebase.js file

export default function UploadForm() {
  const [formData, setFormData] = useState({
    logo: '',
    menu: '',
    heading1: '',
    heading2: '',
    heading3: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Push the formData to Firebase Realtime Database under the 'uploads' node
      const dataRef = ref(db, 'uploads');
      await push(dataRef, formData);
      alert('Form submitted and saved to Firebase!');
      setFormData({ logo: '', menu: '', heading1: '', heading2: '', heading3: '' }); // Clear form after submission
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      alert('Failed to save data. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Upload Content</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="logo"
          placeholder="Logo URL"
          value={formData.logo}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-xl"
          required
        />
        <input
          type="text"
          name="menu"
          placeholder="Menu"
          value={formData.menu}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-xl"
          required
        />
        <input
          type="text"
          name="heading1"
          placeholder="Heading One"
          value={formData.heading1}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-xl"
          required
        />
        <input
          type="text"
          name="heading2"
          placeholder="Heading Two"
          value={formData.heading2}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-xl"
          required
        />
        <input
          type="text"
          name="heading3"
          placeholder="Heading Three"
          value={formData.heading3}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-xl"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
