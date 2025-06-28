// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPanditById } from "../../services/user/panditService";

const PanditDetails = () => {
  const { id } = useParams();
  const [pandit, setPandit] = useState(null);

  useEffect(() => {
    const fetchPandit = async () => {
      try {
        const res = await getPanditById(id);
        setPandit(res.data?.data);
      } catch (error) {
        console.error("Error fetching pandit details");
      }
    };

    fetchPandit();
  }, [id]);

  if (!pandit) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow rounded">
      <img src={pandit.imageUrl} alt={pandit.name} className="w-full h-64 object-cover rounded" />
      <h2 className="text-2xl font-bold mt-4">{pandit.name}</h2>
      <p className="text-gray-700 mt-2">{pandit.expertise}</p>
      <p className="text-gray-600">{pandit.experience} - {pandit.location}</p>
      <p className="mt-4">{pandit.bio}</p>
    </div>
  );
};

export default PanditDetails;
