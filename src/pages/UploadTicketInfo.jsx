import React, { useState, useEffect } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase'; // Make sure this path is correct

export default function Uploadticketinfo() {
  const [formData, setFormData] = useState({
    userId: '', // Unique ID field
    level: '',
    topic1: '',
    topic2: '',
    ticketQuantity: '',
    day: '',
    month: '',
    year: '',
  });

  const [tickets, setTickets] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update tickets array when ticket quantity changes
  useEffect(() => {
    const qty = parseInt(formData.ticketQuantity, 10);
    if (!isNaN(qty) && qty > 0) {
      const newTickets = Array.from({ length: qty }, () => ({
        sec: '',
        row: '',
        seat: '',
      }));
      setTickets(newTickets);
    } else {
      setTickets([]);
    }
  }, [formData.ticketQuantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...tickets];
    updatedTickets[index][field] = value;
    setTickets(updatedTickets);
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
      const { userId, ...rest } = formData;

      if (!userId.trim()) {
        alert('User ID is required!');
        return;
      }

      const fullData = {
        ...rest,
        image: imageData || '',
        tickets,
      };

      const dataRef = ref(db, `ticketinfo/${userId}`);
      await set(dataRef, fullData);

      const ticketQtyRef = ref(db, `uploads/${userId}/ticketQuantity`);
      await set(ticketQtyRef, formData.ticketQuantity);

      alert('Ticket info and individual seat details uploaded successfully!');

      // Reset form
      setFormData({
        userId: '',
        level: '',
        topic1: '',
        topic2: '',
        ticketQuantity: '',
        day: '',
        month: '',
        year: '',
      });
      setTickets([]);
      setImageData(null);
    } catch (error) {
      console.error('Error uploading ticket info:', error);
      alert('Upload failed. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Upload Ticket Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* General Info Fields */}
        {[
          { name: 'userId', label: 'User ID' },
          { name: 'level', label: 'Level' },
          { name: 'topic1', label: 'Topic 1' },
          { name: 'topic2', label: 'Topic 2' },
          { name: 'ticketQuantity', label: 'Ticket Quantity' },
          { name: 'day', label: 'Day' },
          { name: 'month', label: 'Month' },
          { name: 'year', label: 'Year' },
        ].map(({ name, label }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-1 font-medium text-gray-700">{label}</label>
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

        {/* Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="imageUpload" className="mb-1 font-medium text-gray-700">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
        </div>

        {/* Per Ticket Customization */}
        {tickets.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mt-4">Ticket Details</h3>
            {tickets.map((ticket, index) => (
              <div key={index} className="border p-4 rounded-xl shadow-sm bg-gray-50">
                <p className="font-medium mb-2">Ticket #{index + 1}</p>
                {['sec', 'row', 'seat'].map((field) => (
                  <div key={field} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {field}
                    </label>
                    <input
                      type="text"
                      value={ticket[field]}
                      onChange={(e) => handleTicketChange(index, field, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-xl"
                      required
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
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
