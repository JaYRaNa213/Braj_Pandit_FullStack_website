// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "../../services/admin/blogService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ManageBlogs = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await getBlogs();
      setBlogs(res.data || []);
    } catch (err) {
      toast.error("❌ Failed to fetch blogs");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      toast.success("✅ Blog deleted successfully");
      fetchBlogs();
    } catch (err) {
      toast.error("❌ Error deleting blog");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          📝 {t("admin.manage_blogs")}
        </h2>
        <Link
          to="/admin/add-blog"
          className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
        >
          + {t("admin.add_blog")}
        </Link>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow ring-1 ring-gray-200 dark:ring-gray-700">
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4">{t("admin.title")}</th>
              <th className="p-4">{t("admin.category")}</th>
              <th className="p-4">{t("admin.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-4 font-medium text-gray-900 dark:text-white">
                  {blog?.title?.en || "-"}
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {blog?.category?.en || "-"}
                </td>
                <td className="p-4 flex gap-3">
                  <Link
                    to={`/admin/edit-blog/${blog._id}`}
                    className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-200 text-sm font-medium"
                  >
                    ✏️ {t("admin.edit")}
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-100 text-red-600 px-3 py-1.5 rounded hover:bg-red-200 text-sm font-medium"
                  >
                    🗑️ {t("admin.delete")}
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500 dark:text-gray-400">
                  {t("admin.no_blogs")}
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
