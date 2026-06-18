// 🔐 Code redesigned by Jay Rana & ChatGPT © 2025. Razorpay-style Puja Booking Form

import React, { useState } from "react";

const BookingForm = () => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! (Implement logic)");
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="p-6 sm:p-10 space-y-4 border-r border-gray-200 dark:border-gray-700">
          <img
            src="https://s3.ap-south-1.amazonaws.com/rzp-prod-merchant-assets/payment-link/description/qajracehodehzq.jpeg"
            alt="Puja"
            className="rounded-xl object-cover w-full aspect-video"
          />

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Rudrabhishek Group Puja Online
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            Participate in a spiritually enriching{" "}
            <strong>Rudrabhishek Puja</strong> conducted online by certified
            Pandits through brajpandit. This group puja is performed to invoke
            Lord Shiva's blessings for health, prosperity, and spiritual growth.
          </p>

          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>
              <strong>Mode:</strong> Online (Live via Zoom/Google Meet)
            </li>
            <li>
              <strong>Benefits:</strong> Peace, protection, prosperity, and
              spiritual cleansing.
            </li>
          </ul>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            Please proceed with the payment to confirm your participation in the
            Rudrabhishek Group Puja.
          </p>

          <a
            href="https://brajpandit/rudrabhishek-puja-samagri"
            className="text-blue-600 hover:underline text-sm"
          >
            For the list of Puja Samagri, please visit our website
          </a>

          <div className="text-sm mt-4 space-y-2 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Contact Us:</strong>
            </p>
            <p>📧 brajpandit123@gmail.com</p>
            <p>📞 8595009640</p>
            <p>
              <strong>Terms & Conditions:</strong>
              <br />
              <a
                href="https://brajpandit/terms-and-conditions/"
                className="text-blue-600 hover:underline"
              >
                https://brajpandit/terms-and-conditions/
              </a>
            </p>
            <p>
              You agree to share information entered on this page with
              brajPandit (owner of this page) and Razorpay, adhering to
              applicable laws.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-5">
          <div className="flex justify-between items-center mb-4">
            <img
              src="https://res.cloudinary.com/djtq2eywl/image/upload/v1751620820/logo_yre5xd.png"
              alt="Logo"
              className="h-40"
            />
            <h2 className="text-xl font-bold text-gray-800 dark:text-yellow-300">
              Payment Details
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm">
  {/* Amount - Fixed, No Checkbox */}
  <label className="font-medium">Amount (₹201.00)</label>
  <input
    name="amount"
    value="₹201.00"
    readOnly
    className="input bg-gray-100 cursor-not-allowed"
  />

  {/* Kit 43 Items */}
  <label className="font-medium">Rudrabhishek Kit 43 Items (₹799.00)</label>
  <div className="flex items-center justify-between border rounded px-3 py-2">
    <input
      name="kit43"
      placeholder="₹799.00"
      className="flex-1 outline-none"
      readOnly
    />
    <input
      type="checkbox"
      name="kit43Selected"
      onChange={handleChange}
      className="ml-2"
    />
  </div>

  {/* Kit 32 Items */}
  <label className="font-medium">Rudrabhishek Kit 32 Items (₹599.00)</label>
  <div className="flex items-center justify-between border rounded px-3 py-2">
    <input
      name="kit32"
      placeholder="₹599.00"
      className="flex-1 outline-none"
      readOnly
    />
    <input
      type="checkbox"
      name="kit32Selected"
      onChange={handleChange}
      className="ml-2"
    />
  </div>

  {/* Gotra Input */}
  <label className="font-medium">Gotra</label>
  <input
    name="gotraName"
    placeholder="Name and Gotra"
    onChange={handleChange}
    className="input"
  />

  {/* Bilva Patra */}
  <label className="font-medium">Bilva Patra</label>
  <div className="flex items-center justify-between border rounded px-3 py-2">
    <input
      name="bilva"
      placeholder="₹51.00"
      className="flex-1 outline-none"
      readOnly
    />
    <input
      type="checkbox"
      name="bilvaSelected"
      onChange={handleChange}
      className="ml-2"
    />
  </div>

  {/* Narmadeshwar Shivling */}
  <label className="font-medium">Narmadeshwar Shivling</label>
  <div className="flex items-center justify-between border rounded px-3 py-2">
    <input
      name="shivling"
      placeholder="₹501.00"
      className="flex-1 outline-none"
      readOnly
    />
    <input
      type="checkbox"
      name="shivlingSelected"
      onChange={handleChange}
      className="ml-2"
    />
  </div>


            <select name="pujaDate" onChange={handleChange} className="input">
              <option value="">-- Select Puja Date --</option>
              <option value="2025-07-15">15 July 2025</option>
              <option value="2025-07-20">20 July 2025</option>
            </select>

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="input"
            />
            <input
              name="whatsapp"
              placeholder="WhatsApp Number"
              onChange={handleChange}
              className="input"
            />
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="input"
            />
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="input"
            />
            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="input"
            />
            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="input"
            />
            <input
              name="state"
              placeholder="State"
              onChange={handleChange}
              className="input"
            />
            <input
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              className="input"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold text-lg py-3 rounded-lg hover:bg-red-700 shadow-lg mt-4"
          >
            Pay ₹201.00
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;

// Tailwind utility: .input {
//   @apply w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none