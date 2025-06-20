// // src/components/common/Footer.jsx
// import React from "react";
// import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="bg-[#4A1C1C] text-white py-10 px-6 mt-16 shadow-inner">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
//         {/* Contact Info */}
//         <div>
//           <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
//           <p className="font-medium">Bati</p>
//           <address className="not-italic leading-relaxed text-sm">
//             Vrindvan Mathura <br />
//             Near Chhatikara Cross Road,<br />
//             Mathura - 281004,<br />
//             Uttar Pradesh, India
//           </address>
//           <p className="mt-2">
//             Email:{" "}
//             <a href="mailto:info@merovrindavan.in" className="text-blue-400 hover:underline">
//               info@merovrindavan.in
//             </a>
//           </p>
//           <p>
//             Phone:{" "}
//             <a href="tel:+918979923233" className="text-blue-400 hover:underline">
//               +91 8979923233
//             </a>
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
//           <ul className="space-y-1 text-sm">
//             <li>
//               <a href="#" className="hover:underline">
//                 About Us
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 Marriage Ceremony
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 Gallery
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 Videos
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 Blogs
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 Contact Us
//               </a>
//             </li>
//             <li>
//               <a href="#" className="hover:underline">
//                 Be a Pandit
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Social Media */}
//         <div>
//           <h2 className="text-lg font-semibold mb-4">Stay In Touch With Us</h2>
//           <div className="flex space-x-3">
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noreferrer"
//               className="bg-blue-600 text-white p-2 rounded-full hover:scale-110 transition"
//             >
//               <FaFacebookF size={18} />
//             </a>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noreferrer"
//               className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white p-2 rounded-full hover:scale-110 transition"
//             >
//               <FaInstagram size={18} />
//             </a>
//             <a
//               href="https://pinterest.com"
//               target="_blank"
//               rel="noreferrer"
//               className="bg-red-600 text-white p-2 rounded-full hover:scale-110 transition"
//             >
//               <FaPinterestP size={18} />
//             </a>
//             <a
//               href="https://youtube.com"
//               target="_blank"
//               rel="noreferrer"
//               className="bg-red-700 text-white p-2 rounded-full hover:scale-110 transition"
//             >
//               <FaYoutube size={18} />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Footer Bottom */}
//       <div className="mt-10 text-center text-sm text-gray-300 border-t border-gray-700 pt-4">
//         © {new Date().getFullYear()} merovrindavan. All rights reserved.
//       </div>
//     </footer>
//   );
// }

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#4A1C1C] text-white py-10 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-3">About BrajPandit</h3>
          <p className="text-sm text-gray-300">
            We are your trusted spiritual partner offering professional pandits for pooja services, live bhajan, religious products, and blog knowledge — all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/products" className="hover:underline">Products</a></li>
            <li><a href="/blogs" className="hover:underline">Blogs</a></li>
            <li><a href="/booking" className="hover:underline">Puja Booking</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-3">Contact</h3>
          <p className="text-sm text-gray-300">📞 +91 6395857663</p>
          <p className="text-sm text-gray-300">📞 +91 6398152781</p>
          <p className="text-sm text-gray-300">📧 support@brajpandit.in</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-yellow-300">Facebook</a>
            <a href="#" className="hover:text-yellow-300">Instagram</a>
            <a href="#" className="hover:text-yellow-300">YouTube</a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-8">
        © {new Date().getFullYear()} BrajPandit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

