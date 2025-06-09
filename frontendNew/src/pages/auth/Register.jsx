import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios"; // ✅ this uses your axiosInstance

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form); // ✅ correct endpoint
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("Failed to register.");
      console.error("Register error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          value={form.name}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          value={form.email}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          value={form.password}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
