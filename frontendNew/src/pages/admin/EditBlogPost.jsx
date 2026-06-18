// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../../services/admin/blogService";
import { toast } from "react-toastify";

const EditBlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title_en: "",
    title_hi: "",
    content_en: "",
    content_hi: "",
    category_en: "Puja",
    category_hi: "",
    author: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        const b = res?.data || {};
        setBlog({
          title_en: b?.title?.en || "",
          title_hi: b?.title?.hi || "",
          content_en: b?.content?.en || "",
          content_hi: b?.content?.hi || "",
          category_en: b?.category?.en || "Puja",
          category_hi: b?.category?.hi || "",
          author: b?.author || "",
        });
        if (b.imageUrl) {
          setImagePreview(b.imageUrl);
        }
      } catch (err) {
        toast.error("Error loading blog");
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setBlog({ ...blog, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title[en]", blog.title_en);
    formData.append("title[hi]", blog.title_hi);
    formData.append("content[en]", blog.content_en);
    formData.append("content[hi]", blog.content_hi);
    formData.append("category[en]", blog.category_en);
    formData.append("category[hi]", blog.category_hi);
    formData.append("author", blog.author);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      await updateBlog(id, formData);
      toast.success("✅ Blog updated successfully");
      navigate("/admin/manage-blogs");
    } catch (err) {
      toast.error("❌ Update failed");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[#4A1C1C]">✏️ Edit Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title_en"
          placeholder="Title (English)"
          value={blog.title_en}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="title_hi"
          placeholder="Title (Hindi)"
          value={blog.title_hi}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="content_en"
          placeholder="Content (English)"
          value={blog.content_en}
          onChange={handleChange}
          rows={5}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="content_hi"
          placeholder="Content (Hindi)"
          value={blog.content_hi}
          onChange={handleChange}
          rows={5}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={blog.author}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="category_en"
          value={blog.category_en}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="Puja">Puja</option>
          <option value="Festival">Festival</option>
          <option value="Aarti">Aarti</option>
          <option value="Religious Books">Religious Books</option>
          <option value="Places">Places</option>
          <option value="Mandir">Mandir</option>
          <option value="Other Religious Blogs">Other Religious Blogs</option>
        </select>

        <input
          type="text"
          name="category_hi"
          placeholder="Category (Hindi)"
          value={blog.category_hi}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

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
              className="w-full max-h-64 object-cover rounded shadow"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-[#4A1C1C] text-white px-4 py-2 rounded w-full hover:bg-[#3a1515]"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlogPost;
