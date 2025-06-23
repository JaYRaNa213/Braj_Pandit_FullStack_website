// src/pages/user/home/BlogSection.jsx

import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../../services/user/blogService";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");
  const blogsPerPage = 4;

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    paginateAndSort();
  }, [blogs, page, sortBy]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getAllBlogs();
      const blogList = res?.data || [];
      setBlogs(blogList);
    } catch (err) {
      console.error("Error fetching blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const paginateAndSort = () => {
    let sorted = [...blogs];

    if (sortBy === "latest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    const paginated = sorted.slice(0, page * blogsPerPage);
    setVisibleBlogs(paginated);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const isLatest = (date) => {
    const daysDiff = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
    return daysDiff < 10;
  };

  return (
    <section className="w-full max-w-6xl mb-16 px-4 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-red-700">Our Blogs</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded-md text-sm"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 animate-pulse rounded-xl p-6 max-w-sm w-full h-80"
              >
                <div className="w-full h-40 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-300 mb-2 w-2/4"></div>
                <div className="h-3 bg-gray-300 w-1/3"></div>
              </div>
            ))
          : visibleBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-md p-6 max-w-sm w-full hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="rounded-lg w-full h-48 object-cover"
                />
                <div className="flex items-center justify-between mt-3">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                    {blog.title}
                  </h3>
                  {isLatest(blog.createdAt) && (
                    <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                      Latest
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mt-2 mb-4 line-clamp-3">
                  {blog.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{blog.views || 0} Views</span>
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
      </div>

      {!loading && (
        <div className="mt-10 text-center">
          {visibleBlogs.length < blogs.length ? (
            <button
              onClick={handleLoadMore}
              className="text-red-600 font-bold text-lg hover:underline"
            >
              Load More →
            </button>
          ) : (
            <Link
              to="/blogs"
              className="text-red-600 font-bold text-lg hover:underline"
            >
              View All Blogs →
            </Link>
          )}
        </div>
      )}
    </section>
  );
};

export default BlogSection;
