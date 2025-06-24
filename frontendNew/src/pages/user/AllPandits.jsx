// src/pages/user/AllPandits.jsx
import React, { useEffect, useState } from "react";
import { getAllPandits } from "../../services/user/panditService";
import { Link } from "react-router-dom";

const AllPandits = () => {
  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetch = async () => {
    try {
      const res = await getAllPandits();  // Already returns res.data from axios
      setPandits(res?.data || []);        // ❗ FIXED: No extra `.data.data`
    } catch (err) {
      console.error("Error fetching pandits", err);
    } finally {
      setLoading(false);
    }
  };
  fetch();
}, []);

  if (loading) return <div className="p-6 text-center">Loading pandits...</div>;

  if (pandits.length === 0)
    return <div className="p-6 text-center text-gray-600">No Pandits Available</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#4A1C1C]">All Verified Pandits</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pandits.map((pandit) => (
          <Link
            key={pandit._id}
            to={`/pandits/${pandit._id}`}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <img
              src={pandit.imageUrl}
              alt={pandit.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-[#4A1C1C]">
              <h3 className="text-lg font-semibold">{pandit.name}</h3>
              <p className="text-sm">{pandit.expertise}</p>
              <div className="text-xs mt-1 text-gray-600">
                {pandit.experience} – {pandit.location}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllPandits;
