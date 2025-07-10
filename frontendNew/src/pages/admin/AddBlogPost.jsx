import React, { useState } from 'react';
import axios from '../../services/axios'; // Custom axios instance

const AddBlogPost = () => {
  const [form, setForm] = useState({
    title_en: '',
    title_hi: '',
    content_en: '',
    content_hi: '',
    author: '',
    category: 'Puja',
    image: null,
    imageUrl: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageType, setImageType] = useState('file'); // 'file' or 'url'

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      if (file) {
        setForm((prev) => ({ ...prev, image: file, imageUrl: '' }));
        setImagePreview(URL.createObjectURL(file));
      }
    } else if (name === 'imageUrl') {
      setForm((prev) => ({ ...prev, imageUrl: value, image: null }));
      setImagePreview(value);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('title.en', form.title_en);
    data.append('title.hi', form.title_hi);
    data.append('content.en', form.content_en);
    data.append('content.hi', form.content_hi);
    data.append('author', form.author);
    data.append('category.en', form.category);
    data.append('category.hi', '');

    // Attach image based on type
    if (imageType === 'file' && form.image) {
      data.append('image', form.image);
    } else if (imageType === 'url' && form.imageUrl) {
      data.append('imageUrl', form.imageUrl); // your backend should handle this field
    }

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('/admin/blogs', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      alert('✅ Blog posted successfully!');
      console.log('📦 Blog created:', response.data);

      // Reset form
      setForm({
        title_en: '',
        title_hi: '',
        content_en: '',
        content_hi: '',
        author: '',
        category: 'Puja',
        image: null,
        imageUrl: '',
      });
      setImagePreview(null);
    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || 'Something went wrong';
      alert(`❌ Blog Error: ${msg}`);
      console.error('❌ Blog post error:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#4A1C1C]">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title + Content (EN/HI) */}
        <input type="text" name="title_en" placeholder="Title (English)" value={form.title_en} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="text" name="title_hi" placeholder="Title (Hindi)" value={form.title_hi} onChange={handleChange} className="w-full border p-2 rounded" />

        <textarea name="content_en" placeholder="Content (English)" value={form.content_en} onChange={handleChange} rows="4" className="w-full border p-2 rounded" required />
        <textarea name="content_hi" placeholder="Content (Hindi)" value={form.content_hi} onChange={handleChange} rows="4" className="w-full border p-2 rounded" />

        <input type="text" name="author" placeholder="Author" value={form.author} onChange={handleChange} className="w-full border p-2 rounded" required />

        {/* Category */}
        <select name="category" onChange={handleChange} className="w-full border p-2 rounded" value={form.category}>
          <option value="Puja">Puja</option>
          <option value="Festival">Festival</option>
          <option value="Aarti">Aarti</option>
          <option value="Religious Books">Religious Books</option>
          <option value="Places">Places</option>
          <option value="Mandir">Mandir</option>
          <option value="Other Religious Blogs">Other Religious Blogs</option>
        </select>

        {/* Radio toggle for image type */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" name="imageType" value="file" checked={imageType === 'file'} onChange={() => setImageType('file')} />
            Upload File
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="imageType" value="url" checked={imageType === 'url'} onChange={() => setImageType('url')} />
            Use Image URL
          </label>
        </div>

        {/* Conditional Image Field */}
        {imageType === 'file' ? (
          <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full border p-2 rounded" />
        ) : (
          <input type="text" name="imageUrl" placeholder="Paste image URL" value={form.imageUrl} onChange={handleChange} className="w-full border p-2 rounded" />
        )}

        {/* Preview */}
        {imagePreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Image Preview:</p>
            <img src={imagePreview} alt="Preview" className="w-full max-h-60 object-cover rounded shadow" />
          </div>
        )}

        <button type="submit" className="bg-[#4A1C1C] text-white py-2 px-4 rounded w-full hover:bg-[#3a1515]">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlogPost;
