import React from "react";

const pandits = [
  {
    name: "Acharya Virendra Sharma",
    expertise: "Vedic Astrology",
    experience: "35+ years",
    location: "Vrindavan",
    img: "/images/pandits/pandit2.jpg",
  },
  {
    name: "Acharya Pawan Sharma",
    expertise: "Vedic Astrology",
    experience: "35+ years",
    location: "Vrindavan",
    img: "/images/pandits/pandit3.jpg",
  },
  {
    name: "Acharya Lalit Sharma",
    expertise: "Vedic Astrology",
    experience: "35+ years",
    location: "Vrindavan",
    img: "/images/pandits/pandit4.jpg",
  },
  {
    name: "Jay Thakur",
    expertise: "Pooja Vidhi",
    experience: "30+ years",
    location: "Mathura",
    img: "/images/pandits/pandit1.jpg",
  },
  {
    name: "Swami Pawan Das",
    expertise: "Bhagwat Katha",
    experience: "40+ years",
    location: "Varanasi",
    img: "/images/pandits/pandit2.jpg",
  },
  {
    name: "Pt. Mohan Nath",
    expertise: "Pitra Dosh Nivaran",
    experience: "28+ years",
    location: "Haridwar",
    img: "/images/pandits/pandit1.jpg",
  },
  {
    name: "Pt. Nandlal Tripathi",
    expertise: "Mahamrityunjay Pooja",
    experience: "32+ years",
    location: "Prayagraj",
    img: "/images/pandits/pandit3.jpg",
  },
  {
    name: "Pt. Hariram Joshi",
    expertise: "Navgrah Shanti",
    experience: "36+ years",
    location: "Ayodhya",
    img: "/images/pandits/pandit4.jpg",
  },
];

const VerifiedPanditJis = () => {
  return (
    <section className="bg-white px-4 md:px-16 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-[#4A1C1C]">
            Our <span className="text-red-600">Verified</span> PanditJi
          </h2>
          <p className="text-gray-700 text-lg">
            Book highly knowledgeable Vedic Pandits and Purohits, well-versed
            in Sanskrit mantras, Hindu scriptures, and astrology. Ensuring a
            spiritually enriching and traditionally accurate ritual experience.
          </p>
          <button className="mt-4 bg-transparent border-2 border-[#4A1C1C] text-[#4A1C1C] font-semibold px-6 py-2 rounded-full hover:bg-[#4A1C1C] hover:text-white transition">
            See All PanditJis
          </button>
        </div>

        {/* Right Grid Section */}
        <div className="md:w-1/2 grid grid-cols-4 gap-2">
          {pandits.map((pandit, index) => (
            <div
              key={index}
              className="bg-[#F9F3F1] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition w-[140px]"
            >
              <img
                src={pandit.img}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerifiedPanditJis;
