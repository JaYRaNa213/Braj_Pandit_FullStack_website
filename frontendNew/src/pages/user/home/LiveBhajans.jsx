import React from "react";

const LiveBhajanSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white via-red-50 to-white" style={{ backgroundImage: "url('/images/bg-bhajan.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-12">Live Bhajan & Kirtan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              img: "/images/live/Premanand-Ji-Maharaj.jpg",
              title: "Shree Krishna Radha Bhajan",
              desc: "Immerse in soulful melodies dedicated to Lord Krishna – celebrating love, leela, and devotion from Vrindavan.",
            },
            {
              img: "/images/live/radha-raman-ji-murthi.jpeg",
              title: "Shree Radha Raman Kirtan",
              desc: "Devotional kirtan glorifying Lord Ram’s righteousness, strength, and dharma. Chant with divine energy and calm.",
            },
            {
              img: "/images/live/anirudh.jpg",
              title: "Bhagwat Katha BY Anirudha Charya Jee",
              desc: "Powerful bhajans praising Maa Durga’s strength and grace – invoking protection, shakti, and inner peace.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              <img src={item.img} alt={item.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full">
                  🔴 Live Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveBhajanSection;
