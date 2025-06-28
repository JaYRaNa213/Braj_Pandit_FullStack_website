// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/pages/PujaDetails.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function PujaDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const service = query.get("service");

  const [pujaData, setPujaData] = useState(null);

  const serviceDetails = {
    "DIWALI POOJA": {
      image: "/images/diwali.jpg",
      desc: "Diwali is the festival of Laxmi, the Goddess of prosperity and wealth. It is believed that Goddess Laxmi visits everyone during Diwali and blesses them with wealth. People perform special puja to invite Her into their homes. This Diwali, invite prosperity by booking a traditional Laxmi-Ganesh Puja with experienced pandits.",
    },
    "MARRIAGE CEREMONY": {
      image: "/images/marriage.jpg",
      desc: "Marriages, according to Hindu beliefs, are made in heaven. Once you are married, the bond is supposed to last for seven lifetimes. It is considered a turning point in an individual’s life as they enter the ‘Garhasthyaashram’. Every single ritual has deep philosophical and spiritual meaning. Ensure an auspicious start to your sacred bond by booking a Vedic marriage ceremony.",
    },
    "BHAGWAT KATHA": {
      image: "/images/bhagwat.jpg",
      desc: "Shrimad Bhagwat is the image of God and is worshiped in reverence. By its recitation and listening, one can attain peace, prosperity, and happiness. It is believed that listening to Bhagwat Katha purifies the mind and soul. Book a Bhagwat Katha with our experienced pandits to experience divine blessings.",
    },
    "SHIVA POOJA": {
      image: "/images/shiva.jpg",
      desc: "Shiva is the supreme deity of Hinduism. He is worshipped in many forms, including Shiva, Shakti, and Parvati. The Shiva pooja is a ritual that involves worshipping Shiva and his consort Parvati. It is believed that Shiva is the source of all creation and destruction. Book a Shiva pooja with our experienced pandits to experience divine blessings and spiritual upliftment.",
    },
    "OFFICE POOJA": {
      image: "/images/office.jpg",
      desc: "Office Opening Pooja is required before entering into a new office or working place to have a positive and fresh start. It is believed that performing this pooja brings prosperity, success, and peace to the workplace. Book an Office Opening Pooja with our experienced pandits to ensure a prosperous beginning for your business.",    
      },

    "GRAHA PRAVESH": {
      image: "https://res.cloudinary.com/djtq2eywl/image/upload/v1750917528/IMG20250619193402_cafibp.jpg",
      desc: "Griha Pravesh is a sacred Hindu ritual performed before entering a new home. It is believed to bring prosperity, happiness, and peace to the household. The pooja involves invoking deities and seeking their blessings for a harmonious living environment. Book a Griha Pravesh pooja with our experienced pandits to ensure a blessed start in your new home.", 
    },
    "SATYANARAYAN POOJA": { 
      image: "/images/satyanarayan.jpg",
      desc: "Satyanarayan Pooja is a sacred Hindu ritual dedicated to Lord  Vishnu. It is performed to seek blessings for prosperity, happiness, and success in life. The pooja involves reading the Satyanarayan Katha and offering prayers to Lord Vishnu. It is believed that performing this pooja brings peace and fulfillment of desires. Book a Satyanarayan Pooja with our experienced pandits to experience divine blessings.",
    },
    "MUNDAN SANSKAR": { 
      image: "/images/mundan.jpg",
      desc: "Mundan Sanskar, also known as Chudakarana, is a Hindu ritual performed to mark the first haircut of a child. It is believed to purify the child and bring good luck. The ritual involves chanting mantras and offering prayers to deities. Book a Mundan Sanskar with our experienced pandits to ensure a blessed and auspicious beginning for your child's life.",
    },
    "NAVGRAHA SHANTI": {
      image: "/images/navgraha.jpg",
      desc: "Navgraha Shanti is a Hindu ritual performed to appease the nine celestial bodies (Navagrahas) that influence human life. It is believed that performing this pooja brings peace, prosperity, and success. The ritual involves chanting mantras and offering prayers to the Navagrahas. Book a Navgraha Shanti pooja with our experienced pandits to ensure a harmonious and prosperous life.",   
    },
    "SHRADDHA KARMA": {  
      image: "/images/shraddha-karma.jpg",
      desc: "Shraddha Karma is a Hindu ritual performed to honor and pay respects to  deceased ancestors. It is believed that performing this pooja helps in the liberation of the souls of ancestors and brings peace to their spirits. The ritual involves offering food, water, and prayers to the ancestors. Book a Shraddha Karma with our experienced pandits to ensure blessings for your family and peace for the departed souls.", 
    },
    "RUDRABHISHEK": {
      image: "/images/rudrabhishek.jpg",
      desc: "Rudrabhishek is a sacred Hindu ritual performed to worship Lord Shiva. It involves bathing the Shiva Linga with holy substances like milk, honey, and ghee while chanting Vedic mantras. This pooja is believed to remove obstacles, bring prosperity, and bestow blessings of health and happiness. Book a Rudrabhishek with our experienced pandits to experience divine blessings and spiritual upliftment.",
    },
    "ANNAPRASHAN": {
      image: "/images/annaprasan.jpg",
      desc: "Annaprashan, also known as the first rice-eating ceremony, is a Hindu ritual performed to mark the first time a child eats solid food. It is believed to bless the child with good health and prosperity. The ritual involves offering prayers and performing a small pooja. Book an Annaprashan ceremony with our experienced pandits to ensure a blessed and auspicious beginning for your child's journey into solid food.",
    },  
  
    
  };

  useEffect(() => {
    const key = service?.toUpperCase();
    if (key && serviceDetails[key]) {
      setPujaData({ title: service, ...serviceDetails[key] });
    }
  }, [service]);

  if (!pujaData) return <div className="p-6 text-center text-red-600">Invalid Puja</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 bg-red-50 rounded-xl shadow-md overflow-hidden">
        {/* Left: Image & Contact */}
        <div className="md:w-1/2 relative">
          <img
            src={pujaData.image}
            alt={pujaData.title}
            className="w-full h-64 md:h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-red-700 text-white text-center py-3 flex flex-col gap-2 items-center">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:underline"
            >
              <FaWhatsapp /> WhatsApp Us
            </a>
            <a href="tel:+916395857663" className="flex items-center gap-2 hover:underline">
              <FaPhoneAlt /> Call Now On +91 6395857663
            </a>
          </div>
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-red-700 mb-4">{pujaData.title}</h2>
            <p className="text-gray-800 text-justify">{pujaData.desc}</p>
          </div>

          <div className="mt-6">
            <button
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              onClick={() =>
                navigate(
                  `/booking?service=${encodeURIComponent(service)}&pandit=Vrinda%20Pandit`
                )
              }
            >
              Book This Puja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
