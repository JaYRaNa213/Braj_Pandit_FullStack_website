// src/components/PujaServices.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Element } from "react-scroll";

const pujaServices = [
  {
    img: "diwali.jpg",
    title: "DIWALI POOJA",
    desc: "Invite prosperity by performing Laxmi-Ganesh Puja during Diwali festival.",
  },
  {
    img: "griha.jpg",
    title: "GRIHA PRAVESH",
    desc: "Ensure auspicious beginnings by performing rituals before entering a new home.",
  },
  {
    img: "marriage.jpg",
    title: "MARRIAGE CEREMONY",
    desc: "Vedic marriage rituals to unite two souls in sacred harmony.",
  },
  {
    img: "bhagwat.jpg",
    title: "BHAGWAT KATHA",
    desc: "A spiritual narration of Lord Krishna's divine pastimes through Shrimad Bhagwatam.",
  },
  {
    img: "satyanarayan.jpg",
    title: "SATYANARAYAN POOJA",
    desc: "Popular puja performed to seek blessings for prosperity and good fortune.",
  },
  {
    img: "office.jpg",
    title: "OFFICE POOJA",
    desc: "Start your business venture with divine blessings for success and growth.",
  },
  {
    img: "mundan.jpg",
    title: "MUNDAN SANSKAR",
    desc: "First hair removal ceremony of a child to promote well-being and growth.",
  },
  {
    img: "navgraha.jpg",
    title: "NAVGRAHA SHANTI",
    desc: "Pacify the nine planetary influences for health, peace, and success.",
  },
  {
    img: "shraddha.jpg",
    title: "SHRADDHA KARMA",
    desc: "Rituals performed in honor of ancestors for peace and moksha.",
  },
  {
    img: "rudrabhishek.jpg",
    title: "RUDRABHISHEK",
    desc: "Powerful Shiva puja for protection, health, and spiritual growth.",
  },
  {
    img: "kumbhabhishekam.jpg",
    title: "KUMBHABHISHEKAM",
    desc: "Temple sanctification ritual for energy restoration and purification.",
  },
  {
    img: "annaprashan.jpg",
    title: "ANNAPRASHAN",
    desc: "A baby's first solid food feeding ceremony for nourishment blessings.",
  },
];

const PujaServices = () => {
  const navigate = useNavigate();

  const handleBooking = (serviceTitle) => {
    const encodedService = encodeURIComponent(serviceTitle);
    const encodedPandit = encodeURIComponent("Vrinda Pandit");
    navigate(`/booking?service=${encodedService}&pandit=${encodedPandit}`);
  };

  const handleViewMore = () => {
    window.scrollTo({ top: 0, behavior: "instant" }); // ✅ Reset scroll
    navigate("/all-puja-services");
  };

  return (
    <Element name="pujaServicesSection">
      <section className="w-full max-w-6xl mb-16 mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center text-red-600">
          Pooja Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {pujaServices.slice(0, 4).map((service, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 shadow-md text-center hover:shadow-lg transition"
            >
              <img
                src={`/images/${service.img}`}
                alt={service.title}
                className="w-full h-32 object-cover rounded"
              />
              <h5 className="text-lg font-bold mt-3 text-gray-800">
                {service.title}
              </h5>
              <p className="text-sm text-gray-600 mt-1">{service.desc}</p>
              <p className="mt-2 font-medium text-gray-700">
                Price: ₹ On Request
              </p>
              <button
                onClick={() => handleBooking(service.title)}
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                BOOK PUJA
              </button>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleViewMore}
            className="bg-transparent border-2 border-red-600 text-red-600 px-6 py-2 rounded-full hover:bg-red-600 hover:text-white transition"
          >
            View More Puja Services
          </button>
        </div>
      </section>
    </Element>
  );
};

export default PujaServices;
