import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase'; // Ensure the path is correct

export default function UploadTicketInfo() {
  const [formData, setFormData] = useState({
    level: '',
    sec: '',
    row: '',
    seat: '',
    topic1: '',
    topic2: '',
    day: '',
    hour: '',
    minute: '',
    seconds: '',
    ticketQuantity: '', // ✅ Added ticketQuantity
  });

  const [imageData, setImageData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { day, hour, minute, seconds, ticketQuantity } = formData;

      const now = new Date();
      const targetDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        parseInt(day, 10),
        parseInt(hour, 10),
        parseInt(minute, 10),
        parseInt(seconds, 10)
      );

      if (isNaN(targetDate.getTime())) {
        throw new Error('Invalid date or time inputs.');
      }

      const timestamp = targetDate.getTime();

      const fullData = {
        ...formData,
        image: imageData || '',
        timestamp,
      };

      // Upload ticket info to 'ticketinfo' node
      const dataRef = ref(db, 'ticketinfo');
      await set(dataRef, fullData);

      // Upload ticketQuantity separately to 'uploads/latest/ticketQuantity'
      const ticketQtyRef = ref(db, 'uploads/latest/ticketQuantity');
      await set(ticketQtyRef, ticketQuantity);

      alert('Ticket info and ticket quantity uploaded successfully!');

      // Reset form
      setFormData({
        level: '',
        sec: '',
        row: '',
        seat: '',
        topic1: '',
        topic2: '',
        day: '',
        hour: '',
        minute: '',
        seconds: '',
        ticketQuantity: '',
      });
      setImageData(null);
    } catch (error) {
      console.error('Error uploading ticket info:', error);
      alert('Upload failed. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Upload Ticket Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: 'level', label: 'Level' },
          { name: 'sec', label: 'SEC' },
          { name: 'row', label: 'ROW' },
          { name: 'seat', label: 'SEAT' },
          { name: 'topic1', label: 'Topic 1' },
          { name: 'topic2', label: 'Topic 2' },
          { name: 'day', label: 'Day' },
          { name: 'hour', label: 'Hour' },
          { name: 'minute', label: 'Minute' },
          { name: 'seconds', label: 'Seconds' },
          { name: 'ticketQuantity', label: 'Ticket Quantity' }, // ✅ Ticket Quantity input
        ].map(({ name, label }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-1 font-medium text-gray-700">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type="text"
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-xl"
              required
            />
          </div>
        ))}

        <div className="flex flex-col">
          <label htmlFor="imageUpload" className="mb-1 font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

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
