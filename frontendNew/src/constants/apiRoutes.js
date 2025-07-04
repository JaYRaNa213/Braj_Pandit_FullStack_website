// src/constants/apiRoutes.js

const BASE_URL = ""; // ✅ Leave this empty because baseURL already includes "/api"

export const ADMIN = {
  BLOGS: {
    ADD: `/admin/blogs`,
    LIST: `/admin/blogs`,
    UPDATE: `/admin/blogs`, // PUT with /:id
    DELETE: `/admin/blogs`, // DELETE with /:id
  },
  PRODUCTS: {
    ADD: `/admin/products`,
    LIST: `/admin/products`,
    UPDATE: `/admin/products`, // PUT with /:id
    DELETE: `/admin/products`, // DELETE with /:id
  },
};

export const USER = {
  AUTH: {
    REGISTER: `/user/auth/register`,
    LOGIN: `/user/auth/login`,
    LOGOUT: `/user/auth/logout`,
  },
  BOOKING: {
    CREATE: `/user/booking`,
    LIST: `/user/booking/my`,
    UPDATE: `/user/booking/my`, // PUT with /:id
    DELETE: `/user/booking/my`, // DELETE with /:id
  },
  PRODUCTS: {
    LIST: `/user/products`,
    DETAILS: `/user/products`, // GET with /:id
  },
  CART: {
    GET: `/user/cart`,
    ADD: `/user/cart`,
    UPDATE: `/user/cart`, // PUT with /:id
    DELETE: `/user/cart`, // DELETE with /:id
  },
  PAYMENT: {
    CREATE: `/user/payment`,
  },
  PROFILE: `/user/profile`,
  UPDATE_PROFILE: `/user/profile`,
  UPLOAD_IMAGE: `/user/upload-image`,
};

export default {
  ADMIN,
  USER,
};
