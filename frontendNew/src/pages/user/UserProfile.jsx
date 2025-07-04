// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Camera,
  ShoppingCart,
  Calendar,
  History,
  Package,
} from "lucide-react";
import { uploadProfileImage, updateProfile, getProfile } from "../../services/user/userService";
import { useAuth } from "../../context/AuthContext";

const ActivityCard = ({ icon, label, count, link }) => (
  <Link to={link}>
    <div className="bg-white dark:bg-zinc-800 shadow-md p-5 rounded-xl border-l-4 border-[#C0402B] flex items-center space-x-4 hover:shadow-lg transition-all hover:scale-[1.02] duration-200">
      <div className="bg-[#C0402B] text-white p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{label}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{count} items</p>
      </div>
    </div>
  </Link>
);

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [activity, setActivity] = useState({ bookings: 0, orders: 0, cart: 0 });

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleUpload = async () => {
    if (!image) return alert("Please select an image.");
    const formData = new FormData();
    formData.append("file", image);

    try {
      const result = await uploadProfileImage(formData);
      if (result.success) {
        setUploadedUrl(result.data);
        alert("✅ Image uploaded!");
      } else {
        alert("❌ Upload failed: " + result.message);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("❌ Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userProfileData = { name, email, profileImage: uploadedUrl };

    try {
      const data = await updateProfile(userProfileData);
      if (data.success) {
        alert("✅ Profile updated successfully!");
        setUser((prev) => {
          const updated = { ...prev, name, profileImage: uploadedUrl };
          localStorage.setItem("user", JSON.stringify(updated));
          return updated;
        });
        fetchProfile();
      } else {
        alert("❌ Failed to update profile: " + data.message);
      }
    } catch (err) {
      console.error("Error submitting profile:", err);
    }
  };

  const fetchProfile = async () => {
    try {
      const result = await getProfile();
      if (result.success) {
        const { user, bookings, orders, cart } = result.data;
        setName(user.name || "");
        setEmail(user.email || "");
        setUploadedUrl(user.profileImage || "");
        setActivity({
          bookings: bookings?.length || 0,
          orders: orders?.length || 0,
          cart: cart?.length || 0,
        });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <p className="text-lg font-semibold text-[#C0402B] dark:text-red-400">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 dark:from-zinc-900 dark:to-zinc-800 p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-zinc-900 shadow-2xl rounded-xl p-8">
        <h1 className="text-4xl font-bold text-[#C0402B] dark:text-red-400 mb-6 text-center sm:text-left">
          👤 My Profile
        </h1>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          <div className="relative w-40 h-40">
            <img
              src={uploadedUrl || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-[#C0402B] shadow-lg"
            />
            <label className="absolute bottom-2 right-2 bg-white dark:bg-zinc-700 p-2 rounded-full shadow cursor-pointer">
              <Camera className="w-5 h-5 text-[#C0402B]" />
              <input type="file" onChange={handleImageChange} hidden />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 space-y-4 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border border-gray-300 dark:border-zinc-600 rounded-md px-3 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <input
                type="email"
                value={email}
                readOnly
                className="mt-1 w-full bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-zinc-600 rounded-md px-3 py-2 shadow-sm"
              />
            </div>
            <div className="flex gap-4 mt-3">
              <button
                type="button"
                onClick={handleUpload}
                className="bg-[#4A1C1C] text-white px-4 py-2 rounded-md hover:bg-[#5e2a2a]"
              >
                Upload Image
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ActivityCard icon={<Calendar />} label="My Bookings" count={activity.bookings} link="/booking/my" />

          <ActivityCard icon={<ShoppingCart />} label="My Cart" count={activity.cart} link="/cart" />
          <ActivityCard icon={<Package />} label="My Orders" count={activity.orders} link="/orders" />
          <ActivityCard icon={<History />} label="Booking History" count={activity.bookings} link="/booking/history" />

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
