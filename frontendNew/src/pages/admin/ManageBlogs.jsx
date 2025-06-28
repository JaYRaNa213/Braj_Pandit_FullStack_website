// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

import React, { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "../../services/admin/blogService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await getBlogs();
      setBlogs(res.data);
    } catch (err) {
      toast.error("Failed to fetch blogs");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this blog?")) return;
    try {
      await deleteBlog(id);
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (err) {
      toast.error("Error deleting blog");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Blogs</h2>
      <Link to="/admin/add-blog" className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block">
        + Add Blog
      </Link>
      <table className="w-full text-left border-collapse bg-white shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="border-b">
              <td className="p-3">{blog.title}</td>
              <td className="p-3">{blog.category}</td>
              <td className="p-3">
                <Link
                  to={`/admin/edit-blog/${blog._id}`}
                  className="text-blue-600 hover:underline mr-4"
                >
                  Edit
                </Link>
                <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBlogs;
