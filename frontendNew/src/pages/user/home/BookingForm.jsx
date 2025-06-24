//src/pages/user/home/BookingForm.jsx

import React from "react";

const BookingForm = () => {
  return (
    <section className="w-full max-w-4xl mb-16 mx-auto bg-[#4A1C1C] text-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">BOOK NOW - ONLINE PANDIT</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Your Name<span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 rounded bg-white text-black"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email Address<span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 rounded bg-white text-black"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1 font-medium">
            Phone Number<span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-2 rounded bg-white text-black"
          />
        </div>
        <div>
          <label htmlFor="service" className="block mb-1 font-medium">
            Other Service
          </label>
          <select
            id="service"
            name="service"
            className="w-full px-4 py-2 rounded bg-white text-black"
          >
            <option value="">--Please choose an option--</option>
            <option value="Service1">Service 1</option>
            <option value="Service2">Service 2</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block mb-1 font-medium">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full px-4 py-2 rounded bg-white text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-red-600 text-white rounded hover:bg-red-700 font-semibold tracking-wide"
        >
          SUBMIT NOW
        </button>
      </form>
    </section>
  );
};

export default BookingForm;
