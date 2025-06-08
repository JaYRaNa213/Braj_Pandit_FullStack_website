

import React, { useEffect, useState } from "react";

const blogs = [
  {
    img: "/images/chaitra-navratri.jpg",
    alt: "Chaitra Navratri 2025",
    title: "Chaitra Navratri 2025: Celebrate Nine Days of Devotion with Panditjeeonline",
    desc: "Spring is here, and for me, that means Chaitra Navratri is just around the corner! This nine-day festival is all...",
    views: 116,
  },
  {
    img: "/images/mahashivaratri.jpg",
    alt: "Maha Shivratri 2025",
    title: "Shivratri 2025: Puja, Importance, Benefits & How to Book a Pandit for Worship",
    desc: "Maha Shivratri is one of the most auspicious festivals dedicated to Lord Shiva, celebrated with great devotion...",
    views: 198,
  },
  {
    img: "/images/diwali.jpg",
    alt: "Diwali 2025",
    title: "Diwali 2025 and Pujas Performed During the Festival of Lights",
    desc: "Diwali, also known as the Festival of Lights, is one of the most significant and celebrated festivals in India...",
    views: 360,
  },
  {
    img: "/images/bihariG.jpg",
    alt: "Vrindavan yatra 2025",
    title: "Vrindavan yatra 2025 and Pujas Performed During the Festival of Lights",
    desc: "Vrindavan Yatra, is also a world famous yatra , it it happened every year in month of june",
    views: 360,
  },
];

const heroImages = [
  "/images/shiv2.jpg",
  "/images/Premanand-Ji-Maharaj.jpg",
  "/images/premMandir.jpg",
  "/images/bihariG.jpg",
  "/images/yamuna.jpg",
  
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">





      {/* Hero Section */}


      <section className="relative h-[90vh] overflow-hidden bg-black">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-[center_top_15%] transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
        ))}

        <div className="relative z-30 text-center text-white flex items-center justify-center h-full px-4">
          <div className="max-w-3xl">
            <h5 className="text-white-700">Welcome to BrajPandit</h5>
            <h1 className="text-5xl font-bold mb-4">
              Your <span className="text-red-600">Trusted</span> Platform for Sacred <span className="text-yellow-400">Hindu Ceremonies</span>
            </h1>
            <p className="mb-6 text-lg">
              We provide highly qualified and experienced Panditjee for all communities like Gujarati,
              Rajasthani, Marathi, Sindhi, Bihari, Bengali, and Panjabi.
            </p>
            <a href="#" className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-700 text-lg">
              BOOK PANDIT
            </a>
            <a href="#" className="bg-blue-500 text-white py-2 px-10 rounded-full hover:bg-blue-700 text-lg ml-12">
              See All Pooja Services
            </a>
          </div>
        </div>
      </section>



      {/* Learn More & Contact */}



      <header className="text-center my-12">
        <div className="space-x-4 mb-4">
          <button className="px-6 py-2 border-2 border-red-600 rounded-full text-red-600 hover:bg-red-50 transition">
            Learn More
          </button>
        </div>
        <p className="text-sm mt-2">
          Call us:{" "}
          <span className="text-blue-600 font-semibold">+91 6395857663</span>,{" "}
          <span className="text-blue-600 font-semibold">+91 6398152781</span>
        </p>
      </header>

      {/* Product section */}

      <section className="py-16 bg-gradient-to-b from-red-50 via-yellow-50 to-white">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center text-red-600 mb-12">
      Featured Religious <span className="text-yellow-600">Books</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Product Card 1 */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden">
        <img src="/images/products/gita.jpg" alt="Bhagavad Gita" className="w-full h-56 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">Shrimad Bhagavad Gita</h3>
          <p className="text-gray-600 mb-2">Sacred dialogue between Lord Krishna and Arjuna.</p>
          <p className="text-lg font-bold text-red-500 mb-4">₹199</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
              Add to Cart
            </button>
            <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg">
              Compare
            </button>
          </div>
        </div>
      </div>



      {/* Product Card 2 */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden">
        <img src="/images/products/gita.jpg" alt="Satlok Gyan" className="w-full h-56 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">Satlok Gyan</h3>
          <p className="text-gray-600 mb-2">Available in 20+ languages, exploring divine knowledge.</p>
          <p className="text-lg font-bold text-red-500 mb-4">₹149</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
              Add to Cart
            </button>
            <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg">
              Compare
            </button>
          </div>
        </div>
      </div>

      {/* Product Card 3 */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden">
        <img src="/images/products/ved.jpg" alt="Ved Gyan" className="w-full h-56 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">Ved Gyan</h3>
          <p className="text-gray-600 mb-2">Ancient Vedic knowledge and spiritual teachings.</p>
          <p className="text-lg font-bold text-red-500 mb-4">₹249</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
              Add to Cart
            </button>
            <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg">
              Compare
            </button>
          </div>
        </div>
      </div>

      {/* Product Card 4 */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden">
        <img src="/images/products/ramayan.jpg" alt="Ramayan" className="w-full h-56 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">Ramayan</h3>
          <p className="text-gray-600 mb-2">Sacred epic describing Lord Ram’s journey and values.</p>
          <p className="text-lg font-bold text-red-500 mb-4">₹299</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
              Add to Cart
            </button>
            <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg">
              Compare
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>






      {/* Service Logos */}


      <section className="w-full max-w-5xl mb-16 mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {["rudraksha.jpg", "tantra.png", "zodiac.png", "study.jpg", "wealth.png", "money.jpg", "bussiness.jpg"].map((img, idx) => (
            <img key={idx} src={`/images/${img}`} alt={`service-${idx}`} className="h-20 w-20 object-contain" />
          ))}
        </div>
      </section>

      {/* Pooja Services */}
      <section className="w-full max-w-6xl mb-16 mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center text-red-600">Pooja Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
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
          ].map((service, idx) => (
            <div key={idx} className="border rounded-lg p-4 shadow-md text-center hover:shadow-lg transition">
              <img src={`/images/${service.img}`} alt={service.title} className="w-full h-32 object-cover rounded" />
              <h5 className="text-lg font-bold mt-3 text-gray-800">{service.title}</h5>
              <p className="text-sm text-gray-600 mt-1">{service.desc}</p>
              <p className="mt-2 font-medium text-gray-700">Price: ₹ On Request</p>
              <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                BOOK NOW
              </button>
            </div>
          ))}
        </div>
      </section>




      {/* Booking Form */}




      <section className="w-full max-w-4xl mb-16 mx-auto bg-[#4A1C1C] text-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">BOOK NOW - ONLINE PANDIT</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Your Name<span className="text-red-400">*</span>
            </label>
            <input type="text" id="name" name="name" required className="w-full px-4 py-2 rounded bg-white text-black" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email Address<span className="text-red-400">*</span>
            </label>
            <input type="email" id="email" name="email" required className="w-full px-4 py-2 rounded bg-white text-black" />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 font-medium">
              Phone Number<span className="text-red-400">*</span>
            </label>
            <input type="tel" id="phone" name="phone" required className="w-full px-4 py-2 rounded bg-white text-black" />
          </div>
          <div>
            <label htmlFor="service" className="block mb-1 font-medium">
              Other Service
            </label>
            <select id="service" name="service" className="w-full px-4 py-2 rounded bg-white text-black">
              <option value="">--Please choose an option--</option>
              <option value="Service1">Service 1</option>
              <option value="Service2">Service 2</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 font-medium">
              Your Message
            </label>
            <textarea id="message" name="message" rows="4" className="w-full px-4 py-2 rounded bg-white text-black" />
          </div>
          <button type="submit" className="w-full py-3 bg-red-600 text-white rounded hover:bg-red-700 font-semibold tracking-wide">
            SUBMIT NOW
          </button>
        </form>
      </section>




      {/* Merged "Our Latest Articles" Section */}





      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Latest <span className="text-red-500">Articles</span>
        </h2>
        <div className="flex justify-between mb-6">
          <button className="text-gray-600 hover:text-gray-800 transition">←</button>
          <button className="text-gray-600 hover:text-gray-800 transition">→</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((num) => (
            <div key={num} className="border rounded-lg overflow-hidden shadow-lg">
              <img src={`/images/articals/${num}.jpg`} alt={`Article Image ${num}`} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Katha/Bhagwats</h3>
                <p className="text-gray-700">
                  Always be engaged & devoted in listening to Shrimed Bhagwat Katha also known as Lord's Bhagwat Katha...
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* Blog Section */}



      <section className="w-full max-w-6xl mb-16 px-4 mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-red-700">Our Blogs</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {blogs.map(({ img, alt, title, desc, views }, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 max-w-sm w-full hover:shadow-lg transition cursor-pointer">
              <img src={img} alt={alt} className="rounded-lg w-full h-48 object-cover" />
              <h3 className="text-xl font-semibold mt-4 mb-3 text-gray-900">{title}</h3>
              <p className="text-gray-700 mb-4">{desc}</p>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>{views} Views</span>
                <a href="#" className="text-red-600 font-semibold hover:underline">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="#" className="text-red-600 font-bold text-lg hover:underline">
            View All Blogs →
          </a>
        </div>
      </section>

      {/* Live Bhajan Section */}
      <section className="py-16 bg-gradient-to-b from-white via-red-50 to-white" style={{ backgroundImage: "url('/images/bg-bhajan.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold text-red-600 mb-12">Live Bhajan & Kirtan</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Card 1 */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
        <img src="/images/live/Premanand-Ji-Maharaj.jpg" alt="Krishna Bhajan" className="w-full h-56 object-cover" />
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2">Shree Krishna Radha Bhajan</h3>
          <p className="text-gray-600 mb-4">
            Immerse in soulful melodies dedicated to Lord Krishna – celebrating love, leela, and devotion from Vrindavan.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full">
            🔴 Live Now
          </button>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
        <img src="/images/live/radha-raman-ji-murthi.jpeg" alt="Ram Bhajan" className="w-full h-56 object-cover" />
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2">Shree Radha Raman Kirtan</h3>
          <p className="text-gray-600 mb-4">
            Devotional kirtan glorifying Lord Ram’s righteousness, strength, and dharma. Chant with divine energy and calm.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full">
            🔴 Live Now
          </button>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
        <img src="/images/live/anirudh.jpg" alt="Durga Bhajan" className="w-full h-56 object-cover" />
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2">Bhagwat Katha BY Anirudha Charya Jee</h3>
          <p className="text-gray-600 mb-4">
            Powerful bhajans praising Maa Durga’s strength and grace – invoking protection, shakti, and inner peace.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full">
            🔴 Live Now
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;
