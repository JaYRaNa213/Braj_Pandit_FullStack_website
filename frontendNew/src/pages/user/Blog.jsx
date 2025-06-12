// src/pages/user/Blog.jsx
// src/pages/user/Blog.jsx


import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../services/user/blogService";

import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    try {
      const res = await getAllBlogs(search);
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Latest Blog Posts</h2>
      <input
        type="text"
        placeholder="Search blog by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full border p-2 rounded"
      />
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/blogs/${blog._id}`}
            className="bg-white border rounded shadow hover:shadow-lg transition duration-300"
          >
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover rounded-t" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{blog.title}</h3>
              <p className="text-sm text-gray-600">{blog.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
