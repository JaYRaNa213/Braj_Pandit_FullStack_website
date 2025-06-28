// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../../services/admin/blogService";
import { toast } from "react-toastify";

const EditBlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    category: "Puja",
    author: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        setBlog(res);
        if (res.imageUrl) {
          setImagePreview(res.imageUrl);
        }
      } catch (err) {
        toast.error("Error loading blog");
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setBlog({ ...blog, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("content", blog.content);
    formData.append("author", blog.author);
    formData.append("category", blog.category);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      await updateBlog(id, formData);
      toast.success("Blog updated successfully");
      navigate("/admin/manage-blogs");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[#4A1C1C]">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={blog.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={blog.content}
          onChange={handleChange}
          rows={6}
          className="w-full border p-2 rounded"
          required
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
          name="category"
          value={blog.category}
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
