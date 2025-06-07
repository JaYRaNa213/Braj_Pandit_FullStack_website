import React from "react";
import Layout from "../../components/user/Layout";

const Home = () => {
  return (
    <Layout>
      {/* Existing Home content here */}
      <div className="min-h-screen flex flex-col items-center p-6 bg-white">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Welcome to BrajPandit</h1>
          <h2 className="text-2xl mb-4">Your Trusted Platform for Sacred Hindu Ceremonies</h2>
          <p className="max-w-xl mx-auto mb-6">
            Experience the Power of Vedic Rituals, Anytime, Anywhere. Book Expert Pandits for Your Sacred Ceremonies!
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Book Your Pandit Ji
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              See All Pooja Services
            </button>
          </div>
        </header>

        <section className="premium-services w-full max-w-5xl mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">Our Premium Services</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <img src="/images/rudraksha.png" alt="Rudraksha" className="h-20 w-20 object-contain" />
            <img src="/images/tantra.png" alt="Tantra" className="h-20 w-20 object-contain" />
            <img src="/images/zodiac.png" alt="Zodiac" className="h-20 w-20 object-contain" />
            <img src="/images/study.png" alt="Study" className="h-20 w-20 object-contain" />
            <img src="/images/wealth.png" alt="Wealth" className="h-20 w-20 object-contain" />
            <img src="/images/money.png" alt="Money" className="h-20 w-20 object-contain" />
            <img src="/images/business.png" alt="Business" className="h-20 w-20 object-contain" />
          </div>
        </section>

        <section className="articles w-full max-w-5xl mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">Our Latest Articles</h2>
          <div className="flex justify-center gap-6">
            <div className="card border rounded-md p-6 shadow-md w-48 text-center">Katha/Bhagwats</div>
            <div className="card border rounded-md p-6 shadow-md w-48 text-center">Katha/Bhagwats</div>
            <div className="card border rounded-md p-6 shadow-md w-48 text-center">Katha/Bhagwats</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
