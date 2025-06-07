// src/constants/apiRoutes.js

const BASE_URL = "/api";

export const ADMIN = {
  BLOGS: {
    ADD: `${BASE_URL}/admin/blogs`,
    LIST: `${BASE_URL}/admin/blogs`,
    UPDATE: `${BASE_URL}/admin/blogs`, // PUT with /:id
    DELETE: `${BASE_URL}/admin/blogs`, // DELETE with /:id
  },
  PRODUCTS: {
    ADD: `${BASE_URL}/admin/products`,
    LIST: `${BASE_URL}/admin/products`,
    UPDATE: `${BASE_URL}/admin/products`, // PUT with /:id
    DELETE: `${BASE_URL}/admin/products`, // DELETE with /:id
  },
  // Add more admin-specific routes if needed
};

export const USER = {
  AUTH: {
    REGISTER: `${BASE_URL}/user/auth/register`,
    LOGIN: `${BASE_URL}/user/auth/login`,
    LOGOUT: `${BASE_URL}/user/auth/logout`,
  },
  BOOKING: {
    CREATE: `${BASE_URL}/user/booking`,
    LIST: `${BASE_URL}/user/booking`,
    UPDATE: `${BASE_URL}/user/booking`, // PUT with /:id
    DELETE: `${BASE_URL}/user/booking`, // DELETE with /:id
  },
  PRODUCTS: {
    LIST: `${BASE_URL}/user/products`,
    DETAILS: `${BASE_URL}/user/products`, // GET with /:id
  },
  CART: {
    GET: `${BASE_URL}/user/cart`,
    ADD: `${BASE_URL}/user/cart`,
    UPDATE: `${BASE_URL}/user/cart`, // PUT with /:id
    DELETE: `${BASE_URL}/user/cart`, // DELETE with /:id
  },
  PAYMENT: {
    CREATE: `${BASE_URL}/user/payment`,
  },
  // Add more user-specific routes if needed
};

export default {
  ADMIN,
  USER,
};