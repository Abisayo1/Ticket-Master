import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase'; // Make sure this path is correct

export default function UploadCheckoutForm() {
  const [formData, setFormData] = useState({
    eventtype: '',
    soldby: '',
    byclick: '',
    population: '',
    processingFee: '',
    name: '',
    stadium: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const finalData = { ...formData };

      // Write data to Firebase
      const dataRef = ref(db, 'uploadcheckout/latest');
      await set(dataRef, finalData);

      alert('Form submitted and overwritten in Firebase!');

      setFormData({
        eventtype: '',
        soldby: '',
        byclick: '',
        population: '',
        processingFee: '',
        name: '',
        stadium: '',
      });
    } catch (error) {
      console.error('Error saving to Firebase:', error); // Show actual error in console
      alert('Failed to save data. Please check console for errors.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Upload Content</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
  {[
    { name: 'eventtype', label: 'Type of Event' },
    { name: 'soldby', label: 'Sold By' },
    { name: 'byclick', label: 'By Click (Yes/No)' },
    { name: 'population', label: 'Target Population' },
    { name: 'processingFee', label: 'Processing Fee' },
    { name: 'name', label: 'Name' },
    { name: 'stadium', label: 'Stadium' },
  ].map(({ name, label }) => (
    <div key={name} className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type="text"
        name={name}
        value={formData[name]}
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
