// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React from "react";
import { useNavigate } from "react-router-dom";

export const pujaServices = [
  {
    title: "Diwali Pooja",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Diwali is the festival of Laxmi, the Goddess of prosperity and wealth. People perform special puja to invite Her into their homes. Invite prosperity by booking a traditional Laxmi-Ganesh Puja.",
    category: "Festivals",
    rating: 5,
  },
  {
    title: "Navgraha Shanti",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Navgraha Shanti is performed to appease nine celestial bodies (Navagrahas). It brings peace, prosperity, and harmony by reducing planetary doshas.",
    category: "Festivals",
    rating: 4,
  },
  {
    title: "Griha Pravesh",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Griha Pravesh is a sacred ritual performed before entering a new home. It brings happiness, prosperity, and blessings into your household.",
    category: "Household Rituals",
    rating: 5,
  },
  {
    title: "Office Pooja",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1751097306/office_kmeelt.webp",
    description:
      "Office Opening Pooja ensures a positive and fresh start in your new office or workplace. It invites success and prosperity in your business venture.",
    category: "Household Rituals",
    rating: 4,
  },
  {
    title: "Marriage Ceremony",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1751097306/marriage_mr0p6b.jpg",
    description:
      "Marriages are sacred Vedic rituals symbolizing the union of two souls. Book a traditional ceremony for lifelong harmony and blessings.",
    category: "Life Events",
    rating: 5,
  },
  {
    title: "Mundan Sanskar",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1751097306/office_kmeelt.webp",
    description:
      "Mundan Sanskar is the first haircut ceremony of a child, believed to promote mental and spiritual development while removing negative energies.",
    category: "Life Events",
    rating: 4,
  },
  {
    title: "Annaprashan",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Annaprashan marks the child’s first solid food intake. It is performed with prayers for the child’s health, growth, and well-being.",
    category: "Life Events",
    rating: 4,
  },
  {
    title: "Bhagwat Katha",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1751094584/bwoccwvzgg9k0wsuam0p.jpg",
    description:
      "Shrimad Bhagwat Katha narrates Lord Krishna’s divine pastimes. Listening to it purifies the soul and brings spiritual upliftment.",
    category: "Spiritual Discourses",
    rating: 5,
  },
  {
    title: "Satyanarayan Pooja",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1751094584/bwoccwvzgg9k0wsuam0p.jpg",
    description:
      "Satyanarayan Pooja is a ritual to seek blessings for prosperity and fulfillment of wishes. It involves reading the Katha and offering prayers.",
    category: "Spiritual Discourses",
    rating: 4,
  },
  {
    title: "Shraddha Karma",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Shraddha Karma is performed to honor ancestors. It brings peace to departed souls and ensures blessings for the living family.",
    category: "Ancestral & Remedial",
    rating: 4,
  },
  {
    title: "Rudrabhishek",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Rudrabhishek is a powerful ritual to worship Lord Shiva. It removes negativity and grants health, prosperity, and spiritual growth.",
    category: "Ancestral & Remedial",
    rating: 5,
  },
  {
    title: "Rudrabhishek",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Rudrabhishek is a powerful ritual to worship Lord Shiva. It removes negativity and grants health, prosperity, and spiritual growth.",
    category: "Ancestral & Remedial",
    rating: 5,
  },
  {
    title: "Rudrabhishek",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Rudrabhishek is a powerful ritual to worship Lord Shiva. It removes negativity and grants health, prosperity, and spiritual growth.",
    category: "Ancestral & Remedial",
    rating: 5,
  },
  {
    title: "Rudrabhishek",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Rudrabhishek is a powerful ritual to worship Lord Shiva. It removes negativity and grants health, prosperity, and spiritual growth.",
    category: "Ancestral & Remedial",
    rating: 5,
  },
  {
    title: "Rudrabhishek",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Rudrabhishek is a powerful ritual to worship Lord Shiva. It removes negativity and grants health, prosperity, and spiritual growth.",
    category: "Ancestral & Remedial",
    rating: 5,
  },
  {
    title: "Rudrabhishek",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Rudrabhishek is a powerful ritual to worship Lord Shiva. It removes negativity and grants health, prosperity, and spiritual growth.",
    category: "Ancestral & Remedial",
    rating: 5,
  },
  {
    title: "Rudrabhishek",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Rudrabhishek is a powerful ritual to worship Lord Shiva. It removes negativity and grants health, prosperity, and spiritual growth.",
    category: "Ancestral & Remedial",
    rating: 5,
  },
  {
    title: "Rudrabhishek",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Rudrabhishek is a powerful ritual to worship Lord Shiva. It removes negativity and grants health, prosperity, and spiritual growth.",
    category: "Ancestral & Remedial",
    rating: 5,
  },
  {
    title: "Rudrabhishek",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Rudrabhishek is a powerful ritual to worship Lord Shiva. It removes negativity and grants health, prosperity, and spiritual growth.",
    category: "Ancestral & Remedial",
    rating: 5,
  },
  {
    title: "Rudrabhishek",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Rudrabhishek is a powerful ritual to worship Lord Shiva. It removes negativity and grants health, prosperity, and spiritual growth.",
    category: "Ancestral & Remedial",
    rating: 5,
  },
  {
    title: "Rudrabhishek",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Rudrabhishek is a powerful ritual to worship Lord Shiva. It removes negativity and grants health, prosperity, and spiritual growth.",
    category: "Ancestral & Remedial",
    rating: 5,
  },
  {
    title: "Rudrabhishek",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Rudrabhishek is a powerful ritual to worship Lord Shiva. It removes negativity and grants health, prosperity, and spiritual growth.",
    category: "Ancestral & Remedial",
    rating: 5,
  },
  {
    title: "Rudrabhishek",
    img: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
    description:
      "Rudrabhishek is a powerful ritual to worship Lord Shiva. It removes negativity and grants health, prosperity, and spiritual growth.",
    category: "Ancestral & Remedial",
    rating: 5,
  },
];

const AllPujaServices = () => {
  const navigate = useNavigate();

  const handleBooking = (serviceTitle) => {
    navigate(`/puja-details?service=${encodeURIComponent(serviceTitle)}`);
  };

  const grouped = pujaServices.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-[#4A1C1C] mb-10">
        🕊️ All Puja Services
      </h1>

      {Object.entries(grouped).map(([category, services]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-32 object-cover rounded"
                />
                <h3 className="mt-3 font-bold text-lg text-[#4A1C1C]">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {service.description || "Sacred puja by experienced pandits."}
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