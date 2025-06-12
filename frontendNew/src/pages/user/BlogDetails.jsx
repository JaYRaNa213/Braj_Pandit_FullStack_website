
//src/pages/user/BlogDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "@/services/user/blogService";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to load blog");
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <img src={blog.imageUrl} alt={blog.title} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-4xl font-bold mb-2">{blog.title}</h2>
      <p className="text-sm text-gray-500 mb-4">By {blog.author} • {new Date(blog.publishedAt).toDateString()}</p>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
    </div>
  );
};

export default BlogDetails;
