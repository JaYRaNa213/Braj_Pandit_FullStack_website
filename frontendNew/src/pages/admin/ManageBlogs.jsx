// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { getBlogs, deleteBlog ,updateBlog} from "../../services/admin/blogService";
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">📝 Manage Blogs</h2>
        <Link
          to="/admin/add-blog"
          className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
        >
          + Add Blog
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow ring-1 ring-gray-200">
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{blog.title}</td>
                <td className="p-4 text-gray-600">{blog.category}</td>
                <td className="p-4 flex gap-3">
                  <Link
                    to={`/admin/edit-blog/${blog._id}`}
                    className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-200 text-sm font-medium"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-100 text-red-600 px-3 py-1.5 rounded hover:bg-red-200 text-sm font-medium"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No blogs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBlogs;
