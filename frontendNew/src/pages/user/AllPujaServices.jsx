import React from "react";
import { useNavigate } from "react-router-dom";

const groupedServices = {
  "✨ Festivals": [
    {
      img: "diwali.jpg",
      title: "Diwali Pooja",
      desc: "Perform Laxmi-Ganesh Puja for wealth and prosperity during Diwali.",
      rating: 5,
    },
    {
      img: "navgraha.jpg",
      title: "Navgraha Shanti",
      desc: "Pacify planetary doshas and promote harmony in life.",
      rating: 4,
    },
  ],
  "🏠 Household Rituals": [
    {
      img: "griha.jpg",
      title: "Griha Pravesh",
      desc: "Auspicious puja for entering a new home.",
      rating: 5,
    },
    {
      img: "office.jpg",
      title: "Office Pooja",
      desc: "Begin your office journey with divine blessings.",
      rating: 4,
    },
  ],
  "👥 Life Events": [
    {
      img: "marriage.jpg",
      title: "Marriage Ceremony",
      desc: "Sacred Vedic rituals to bless your wedding.",
      rating: 5,
    },
    {
      img: "mundan.jpg",
      title: "Mundan Sanskar",
      desc: "Child's first hair removal ceremony.",
      rating: 4,
    },
    {
      img: "annaprashan.jpg",
      title: "Annaprashan",
      desc: "Celebration of a baby’s first solid food.",
      rating: 4,
    },
  ],
  "🕊️ Spiritual Discourses": [
    {
      img: "bhagwat.jpg",
      title: "Bhagwat Katha",
      desc: "Narration of divine pastimes of Lord Krishna.",
      rating: 5,
    },
    {
      img: "satyanarayan.jpg",
      title: "Satyanarayan Pooja",
      desc: "Ritual for peace, harmony, and abundance.",
      rating: 4,
    },
  ],
  "🙏 Ancestral & Remedial": [
    {
      img: "shraddha.jpg",
      title: "Shraddha Karma",
      desc: "Pind daan and rituals to honor ancestors.",
      rating: 4,
    },
    {
      img: "rudrabhishek.jpg",
      title: "Rudrabhishek",
      desc: "Powerful puja to please Lord Shiva and remove negativity.",
      rating: 5,
    },
  ],
};

const AllPujaServices = () => {
  const navigate = useNavigate();

  const handleBooking = (serviceTitle) => {
    navigate(`/booking?service=${encodeURIComponent(serviceTitle)}&pandit=Vrinda%20Pandit`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-[#4A1C1C] mb-10">
        🕊️ All Puja Services
      </h1>

      {Object.entries(groupedServices).map(([category, services]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <img
                  src={`/images/${service.img}`}
                  alt={service.title}
                  className="w-full h-32 object-cover rounded"
                />
                <h3 className="mt-3 font-bold text-lg text-[#4A1C1C]">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{service.desc}</p>
                <div className="mt-2 text-yellow-500 text-sm">
                  {Array(service.rating).fill("⭐️").join(" ")}
                </div>
                <button
                  onClick={() => handleBooking(service.title)}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Book Puja
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPujaServices;
