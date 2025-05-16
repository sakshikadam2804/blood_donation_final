import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    userType: '',
    name: '',
    email: '',
    phone: '',
    bloodType: '',
    preferredDate: '',
    urgency: '',
    hospital: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    const collectionName = formData.userType === 'donor' ? 'donors' : 'receivers';

    try {
      await addDoc(collection(db, collectionName), {
        ...formData,
        submittedAt: Timestamp.now(),
      });

      setSuccess(true);
      setFormData({
        userType: '',
        name: '',
        email: '',
        phone: '',
        bloodType: '',
        preferredDate: '',
        urgency: '',
        hospital: '',
        message: '',
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="py-16 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Schedule a Donation / Request</h2>

      {success && <p className="text-green-600 mb-4">✅ Submission successful!</p>}
      {error && <p className="text-red-600 mb-4">❌ {error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">I am a:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="donor">Blood Donor</option>
            <option value="receiver">Blood Receiver</option>
          </select>
        </div>

        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Blood Type</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        {formData.userType === 'donor' && (
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        )}

        {formData.userType === 'receiver' && (
          <>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
              placeholder="Preferred Receive Date"
              className="w-full p-2 border rounded"
            />

            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Urgency</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <input
              name="hospital"
              placeholder="Hospital / Location"
              value={formData.hospital}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </>
        )}

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Additional Notes (optional)"
          rows={3}
          className="w-full p-2 border rounded"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </section>
  );
};

export default Contact;
