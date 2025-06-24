import React, { useEffect, useState } from "react";
import { getAllPandits } from "../../../services/user/panditService";
import { Link } from "react-router-dom";

const VerifiedPanditJis = () => {
  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPandits = async () => {
      try {
        const res = await getAllPandits();
        const verified = res?.data?.data?.filter((p) => p.status === "approved");
        setPandits(verified?.slice(0, 8) || []);
      } catch (err) {
        console.error("Error fetching pandits", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPandits();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading Pandits...</div>;
  }

  return (
    <section className="bg-white px-4 md:px-16 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-[#4A1C1C]">
            Our <span className="text-red-600">Verified</span> PanditJi
          </h2>
          <p className="text-gray-700 text-lg">
            Book highly knowledgeable Vedic Pandits and Purohits, well-versed in
            Sanskrit mantras, Hindu scriptures, and astrology.
          </p>
          <Link to="/pandits">
            <button className="mt-4 bg-transparent border-2 border-[#4A1C1C] text-[#4A1C1C] font-semibold px-6 py-2 rounded-full hover:bg-[#4A1C1C] hover:text-white transition">
              See All PanditJis
            </button>
          </Link>
        </div>

        <div className="md:w-1/2 grid grid-cols-4 gap-2">
          {pandits.map((pandit) => (
            <Link
              key={pandit._id}
              to={`/pandits/${pandit._id}`}
              className="bg-[#F9F3F1] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition w-[140px]"
            >
              <img
                src={pandit.imageUrl}
                alt={pandit.name}
                className="w-full h-[120px] object-cover"
              />
              <div className="p-2 text-[#4A1C1C]">
                <h3 className="text-sm font-semibold">{pandit.name}</h3>
                <p className="text-xs">{pandit.expertise}</p>
                <div className="text-[10px] flex justify-between mt-1 text-gray-700">
                  <span>{pandit.experience}</span>
                  <span>{pandit.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerifiedPanditJis;
