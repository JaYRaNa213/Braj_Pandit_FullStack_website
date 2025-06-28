// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// frontendNew/src/services/user/blogService.js

import axiosInstance from '../axios';

/**
 * Fetch all blogs (optional search keyword)
 * @param {string} search - Optional search keyword
 */

export const getAllBlogs = async ({
  search = "",
  category = "",
  page = 1,
  limit = 1000,
  sortBy = "latest",
}) => {
  const response = await axiosInstance.get("/user/blogs", {
    params: { search, category, page, limit, sortBy },
  });
  return response.data;
};

/**
 * Fetch a single blog by its ID
 * @param {string} id - Blog ID
 */
export const getBlogById = async (id) => {
  const response = await axiosInstance.get(`/user/blogs/${id}`);
  return response.data;
};
