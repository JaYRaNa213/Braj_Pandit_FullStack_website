// frontendNew/src/services/user/blogService.js

import axiosInstance from '../axios';

/**
 * Fetch all blogs (optional search keyword)
 * @param {string} search - Optional search keyword
 */
export const getAllBlogs = async (search = '') => {
  const response = await axiosInstance.get('/user/blogs', {
    params: { search },
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
