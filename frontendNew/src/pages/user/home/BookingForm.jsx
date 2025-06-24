import React, { useState } from "react";
import axiosInstance from "../../../services/axios"; // ✅ Make sure this path matches your project
import { toast } from "react-toastify";

const BookingForm = () => {
  const [selectedService, setSelectedService] = useState("");
  const [customService, setCustomService] = useState("");

  const handleServiceChange = (e) => {
    const value = e.target.value;
    setSelectedService(value);
    if (value !== "Other") setCustomService("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      service: selectedService === "Other" ? customService : selectedService,
      message: e.target.message.value,
    };

    try {
      await axiosInstance.post("/user/callBookings", formData);
      toast.success("📨 Booking sent successfully. We'll contact you shortly.");
      e.target.reset();
      setSelectedService("");
      setCustomService("");
    } catch (error) {
      toast.error("❌ Failed to send booking. Try again later.");
    }
  };

  return (
    <section className="w-full max-w-4xl mb-16 mx-auto bg-[#4A1C1C] text-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Other  Travel Food & Stay Services</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
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
            Type of Service<span className="text-red-400">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={selectedService}
            onChange={handleServiceChange}
            required
            className="w-full px-4 py-2 rounded bg-white text-black"
          >
            <option value="">--Please choose an option--</option>
            <option value="Room/Hotel Booking Help">Room/Hotel Booking Help</option>
            <option value="VIP Banke Bihari Ji Darshan">VIP Banke Bihari Ji Darshan</option>
            <option value="Need a Vehicle">Need a Vehicle</option>
            <option value="Vrindavan Tour Guide">Vrindavan Tour Guide</option>
            <option value="Food Seva">Food Seva</option>
            <option value="Hotel Seva">Hotel Seva</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {selectedService === "Other" && (
          <div>
            <label htmlFor="customService" className="block mb-1 font-medium">
              Please Specify Your Service<span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="customService"
              name="customService"
              value={customService}
              onChange={(e) => setCustomService(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-white text-black"
              placeholder="Describe your requirement"
            />
          </div>
        )}

        <div>
          <label htmlFor="message" className="block mb-1 font-medium">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full px-4 py-2 rounded bg-white text-black"
            placeholder="Additional details or instructions..."
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
