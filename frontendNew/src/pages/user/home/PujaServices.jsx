import React from "react";

const pujaServices = [
  {
    img: "bhagwat.jpg",
    title: "BHAGWAT KATHA",
    desc: "A sacred narration of Lord Krishna’s divine acts with spiritual depth.",
  },
  {
    img: "diwali.jpg",
    title: "DIWALI POOJA",
    desc: "Invite prosperity by performing Laxmi-Ganesh Puja during Diwali.",
  },
  {
    img: "marriage.jpg",
    title: "MARRIAGE CEREMONY",
    desc: "Ensure a divine bond with sacred Vedic wedding rituals.",
  },
  {
    img: "office.jpg",
    title: "OFFICE POOJA",
    desc: "Auspicious start for your new office with blessings and rituals.",
  },
];

const PujaServices = () => {
  return (
    <section className="w-full max-w-6xl mb-16 mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-red-600">
        Pooja Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {pujaServices.map((service, idx) => (
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
            <p className="mt-2 font-medium text-gray-700">Price: ₹ On Request</p>
            <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              BOOK PUJA
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PujaServices;
