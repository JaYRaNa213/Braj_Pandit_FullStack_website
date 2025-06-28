// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../services/user/blogService";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    try {
      const res = await getAllBlogs({ search }); // ✅ FIXED HERE
      setBlogs(res?.data || []);
    } catch (err) {
      console.error("Error fetching blogs", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-red-700">Latest Blog Posts</h2>
      
      <input
        type="text"
        placeholder="Search blog by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full border p-2 rounded shadow-sm"
      />

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blogs/${blog._id}`}
              className="bg-white border rounded-xl shadow hover:shadow-md transition"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg line-clamp-1">{blog.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{blog.category}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
