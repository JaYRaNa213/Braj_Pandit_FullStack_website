import React, { useEffect, useState, useRef } from "react";
import { getAllBlogs } from "../../../services/user/blogService";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("latest");
  const [category, setCategory] = useState("");
  

  const blogsPerPage = 4;
  const sectionRef = useRef(null);

  useEffect(() => {
    fetchBlogs(1, true); // Reset blogs on sort/filter change
  }, [sortBy, category]);

  const fetchBlogs = async (pageNum, reset = false) => {
    try {
      setLoading(true);
      const res = await getAllBlogs({
        page: pageNum,
        limit: blogsPerPage,
        sortBy,
        category,
      });

      const blogList = res?.data || [];
      if (reset) {
        setBlogs(blogList);
      } else {
        setBlogs((prev) => [...prev, ...blogList]);
      }

      setTotalPages(Math.ceil((res?.total || 0) / blogsPerPage));
      setPage(pageNum);

      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.error("Error fetching blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (num) => {
    fetchBlogs(num, true); // Replace blogs
  };

  const handleViewMore = () => {
    fetchBlogs(page + 1); // Append next blogs
  };

  const isLatest = (date) => {
    const daysDiff = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
    return daysDiff < 10;
  };

  return (
    <section className="w-full max-w-6xl mb-16 px-4 mx-auto" ref={sectionRef}>
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="text-4xl font-bold text-red-700">Our Blogs</h2>
        <div className="flex gap-3 items-center">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded text-sm"
          >
            <option value="">All Categories</option>
            <option value="Festivals">Festivals</option>
            <option value="Spirituality">Spirituality</option>
            <option value="Culture">Culture</option>
            <option value="Devotion">Devotion</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded text-sm"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading && blogs.length === 0
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 animate-pulse rounded-xl p-6 h-80"
              >
                <div className="w-full h-40 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-300 mb-2 w-2/4"></div>
                <div className="h-3 bg-gray-300 w-1/3"></div>
              </div>
            ))
          : blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="rounded-lg w-full h-40 object-cover"
                />
                <div className="flex items-center justify-between mt-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {blog.title}
                  </h3>
                  {isLatest(blog.createdAt) && (
                    <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                      Latest
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  By {blog.author || "Admin"} •{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
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

      {/* Pagination Numbers */}
      {!loading && totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2 flex-wrap">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-1 rounded ${
                page === idx + 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* View More */}
      <Link
  to="/blogs"
  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 text-lg font-semibold inline-block"
>
  View More →
</Link>


      {/* No Blogs */}
      {!loading && blogs.length === 0 && (
        <div className="mt-10 text-center text-gray-500">No blogs found.</div>
      )}
    </section>
  );
};

export default BlogSection;
