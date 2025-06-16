// File: frontendNew/src/pages/admin/AddBlogPost.jsx

import React, { useState } from 'react';
import axios from '../../services/axios'; // Custom axios instance

const AddBlogPost = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    content: '',
    category: 'Puja', // ✅ Initialize with the default dropdown value
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      if (file) {
        setForm((prevForm) => ({ ...prevForm, image: file }));
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      // Append all form fields, including the category
      data.append(key, form[key]);
    });

    const token = localStorage.getItem('token');

    console.log("➡️ Axios request headers", {
      Authorization: `Bearer ${token}`,
    });

    // Log the form state *before* sending
    console.log("📤 Submitting blog with data:", form);
    console.log("📦 Token from localStorage:", token);

    try {
      const response = await axios.post('/admin/blogs', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      alert('✅ Blog posted successfully!');
      console.log('Blog Response:', response.data);

      // Reset form to initial state (matching default dropdown)
      setForm({
        title: '',
        author: '',
        content: '',
        category: 'Puja', // ✅ Reset to the default dropdown value
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong';

      console.error('❌ Blog post error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: errorMessage,
      });

      alert(`❌ Blog Error: ${errorMessage}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#4A1C1C]">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          rows="4"
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="category"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          value={form.category} // This will now correctly start as 'Puja'
        >
          <option value="Puja">Puja</option>
          <option value="Festival">Festival</option>
          <option value="Aarti">Aarti</option>
          <option value="Religious Books">Religious Books</option>
        </select>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {imagePreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-h-60 object-cover rounded shadow"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-[#4A1C1C] text-white py-2 px-4 rounded w-full hover:bg-[#3a1515]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlogPost;
