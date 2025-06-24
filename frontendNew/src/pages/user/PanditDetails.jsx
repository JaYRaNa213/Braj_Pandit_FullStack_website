// / ✅ 4. Frontend: src/pages/user/PanditDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axiosInstance from '../../services/axios';

const PanditDetails = () => {
  const { id } = useParams();
  const [pandit, setPandit] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axiosInstance.get(`/api/user/pandits/${id}`);
        setPandit(res?.data?.data);
      } catch (err) {
        console.error('Error loading pandit details', err);
      }
    };
    fetchDetails();
  }, [id]);

  if (!pandit) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={pandit.imageUrl}
          alt={pandit.name}
          className="w-64 h-64 object-cover rounded shadow"
        />
        <div>
          <h2 className="text-3xl font-bold text-red-700 mb-2">{pandit.name}</h2>
          <p className="text-gray-600 mb-1">Expertise: {pandit.expertise}</p>
          <p className="text-gray-600 mb-1">Experience: {pandit.experience}</p>
          <p className="text-gray-600 mb-3">Location: {pandit.location}</p>
          <button className="bg-red-600 text-white px-6 py-2 rounded">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default PanditDetails;