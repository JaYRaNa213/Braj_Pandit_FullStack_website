import React from "react";

const blogs = [
  {
    img: "/images/chaitra-navratri.jpg",
    alt: "Chaitra Navratri 2025",
    title: "Chaitra Navratri 2025: Celebrate Nine Days of Devotion",
    desc: "Spring is here, and for me, that means Chaitra Navratri is just around the corner!",
    views: 116,
  },
  {
    img: "/images/mahashivaratri.jpg",
    alt: "Maha Shivratri 2025",
    title: "Shivratri 2025: Puja, Importance, Benefits & More",
    desc: "Maha Shivratri is one of the most auspicious festivals dedicated to Lord Shiva.",
    views: 198,
  },
  {
    img: "/images/diwali.jpg",
    alt: "Diwali 2025",
    title: "Diwali 2025 and Pujas Performed During the Festival",
    desc: "Diwali, also known as the Festival of Lights, is widely celebrated across India.",
    views: 360,
  },
  {
    img: "/images/bihariG.jpg",
    alt: "Vrindavan yatra 2025",
    title: "Vrindavan yatra 2025 Insights & Rituals",
    desc: "Vrindavan Yatra is a sacred journey filled with devotion and joy.",
    views: 280,
  },
];

const BlogSection = () => {
  return (
    <section className="w-full max-w-6xl mb-16 px-4 mx-auto">
      <h2 className="text-4xl font-bold mb-10 text-center text-red-700">
        Our Blogs
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {blogs.map(({ img, alt, title, desc, views }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 max-w-sm w-full hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={img}
              alt={alt}
              className="rounded-lg w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold mt-4 mb-3 text-gray-900">
              {title}
            </h3>
            <p className="text-gray-700 mb-4">{desc}</p>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>{views} Views</span>
              <a
                href="#"
                className="text-red-600 font-semibold hover:underline"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <a
          href="#"
          className="text-red-600 font-bold text-lg hover:underline"
        >
          View All Blogs →
        </a>
      </div>
    </section>
  );
};

export default BlogSection;
