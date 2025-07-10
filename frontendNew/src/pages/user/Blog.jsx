import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../services/user/blogService";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogs({ search, lang: i18n.language });
      setBlogs(res?.data || []);
    } catch (err) {
      console.error("Error fetching blogs", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search, i18n.language]);

  // ✅ Helper to safely get localized strings
  const getLocalized = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[i18n.language] || field.en || "";
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 dark:bg-gray-950 dark:text-white min-h-screen transition-colors duration-300">
      <h2 className="text-3xl text-center font-bold mb-6 text-red-700 dark:text-yellow-400">
        📰 {t("blogs_page.heading")}
      </h2>

      <input
        type="text"
        placeholder={t("blogs_page.search_placeholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full border border-gray-300 dark:border-gray-700 p-3 rounded shadow-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
      />

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
          {t("blogs_page.loading")}
        </p>
      ) : blogs.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blogs/${blog._id}`}
              className="flex flex-col h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="relative w-full pb-[56.25%] overflow-hidden rounded-t-xl">
                <img
                  src={blog.imageUrl}
                  alt={getLocalized(blog.title)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x250?text=No+Image";
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex flex-col gap-1 flex-1">
                <h3 className="font-bold text-lg text-red-700 dark:text-yellow-400 line-clamp-1">
                  {getLocalized(blog.title)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {getLocalized(blog.category) || t("blogs_page.general")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          {t("blogs_page.no_blogs", { search })}
        </p>
      )}
    </div>
  );
};

export default Blog;
