// src/pages/AllPujaServices.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const pujaDescriptions = {
  "Diwali Pooja":
    "Diwali is the festival of Laxmi, the Goddess of prosperity and wealth. People perform special puja to invite Her into their homes. Invite prosperity by booking a traditional Laxmi-Ganesh Puja.",
  "Navgraha Shanti":
    "Navgraha Shanti is performed to appease nine celestial bodies (Navagrahas). It brings peace, prosperity, and harmony by reducing planetary doshas.",
  "Griha Pravesh":
    "Griha Pravesh is a sacred ritual performed before entering a new home. It brings happiness, prosperity, and blessings into your household.",
  "Office Pooja":
    "Office Opening Pooja ensures a positive and fresh start in your new office or workplace. It invites success and prosperity in your business venture.",
  "Marriage Ceremony":
    "Marriages are sacred Vedic rituals symbolizing the union of two souls. Book a traditional ceremony for lifelong harmony and blessings.",
  "Mundan Sanskar":
    "Mundan Sanskar is the first haircut ceremony of a child, believed to promote mental and spiritual development while removing negative energies.",
  "Annaprashan":
    "Annaprashan marks the child’s first solid food intake. It is performed with prayers for the child’s health, growth, and well-being.",
  "Bhagwat Katha":
    "Shrimad Bhagwat Katha narrates Lord Krishna’s divine pastimes. Listening to it purifies the soul and brings spiritual upliftment.",
  "Satyanarayan Pooja":
    "Satyanarayan Pooja is a ritual to seek blessings for prosperity and fulfillment of wishes. It involves reading the Katha and offering prayers.",
  "Shraddha Karma":
    "Shraddha Karma is performed to honor ancestors. It brings peace to departed souls and ensures blessings for the living family.",
  "Rudrabhishek":
    "Rudrabhishek is a powerful ritual to worship Lord Shiva. It removes negativity and grants health, prosperity, and spiritual growth.",
};

const groupedServices = {
  "✨ Festivals": [
    {
      img: "diwali.jpg",
      title: "Diwali Pooja",
      rating: 5,
    },
    {
      img: "navgraha.jpg",
      title: "Navgraha Shanti",
      rating: 4,
    },
  ],
  "🏠 Household Rituals": [
    {
      img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
      title: "Griha Pravesh",
      rating: 5,
    },
    {
      img: "office.jpg",
      title: "Office Pooja",
      rating: 4,
    },
  ],
  "👥 Life Events": [
    {
      img: "marriage.jpg",
      title: "Marriage Ceremony",
      rating: 5,
    },
    {
      img: "mundan.jpg",
      title: "Mundan Sanskar",
      rating: 4,
    },
    {
      img: "annaprashan.jpg",
      title: "Annaprashan",
      rating: 4,
    },
  ],
  "🕊️ Spiritual Discourses": [
    {
      img: "bhagwat.jpg",
      title: "Bhagwat Katha",
      rating: 5,
    },
    {
      img: "satyanarayan.jpg",
      title: "Satyanarayan Pooja",
      rating: 4,
    },
  ],
  "🙏 Ancestral & Remedial": [
    {
      img: "shraddha.jpg",
      title: "Shraddha Karma",
      rating: 4,
    },
    {
      img: "rudrabhishek.jpg",
      title: "Rudrabhishek",
      rating: 5,
    },
  ],
};

const AllPujaServices = () => {
  const navigate = useNavigate();

  const handleBooking = (serviceTitle) => {
    navigate(`/puja-details?service=${encodeURIComponent(serviceTitle)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-[#4A1C1C] mb-10">
        🕊️ All Puja Services
      </h1>

      {Object.entries(groupedServices).map(([category, services]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">{category}</h2>
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
                <p className="text-sm text-gray-600 mt-1">
                  {pujaDescriptions[service.title] || "Sacred puja by experienced pandits."}
                </p>
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
