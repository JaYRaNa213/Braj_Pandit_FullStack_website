// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// frontendNew/src/services/admin/blogService.js
import axiosInstance from '../axios';

/**
 * Create a new blog post (with image).
 * @param {FormData} formData - Must include title, content, image
 */
export const createBlog = async (formData) => {
  const token = localStorage.getItem('accessToken'); // 🔥 Fix here
  const response = await axiosInstance.post('/admin/blogs', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

/**
 * Update blog by ID
 * @param {string} id - Blog ID
 * @param {FormData} formData - Must include updated fields (image optional)
 */
export const updateBlog = async (id, formData) => {
  const response = await axiosInstance.put(`/admin/blogs/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  return response.data;
};

/**
 * Delete a blog by ID
 * @param {string} id - Blog ID
 */
export const deleteBlog = async (id) => {
  const response = await axiosInstance.delete(`/admin/blogs/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Get all blogs (for admin panel listing)
 */
export const getBlogs = async () => {
  const response = await axiosInstance.get('/admin/blogs?limit=1000', {
    withCredentials: true,
  });
  return response.data;
};

/**
 * Get a single blog by ID (for editing)
 * @param {string} id - Blog ID
 */
export const getBlogById = async (id) => {
  const response = await axiosInstance.get(`/admin/blogs/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
