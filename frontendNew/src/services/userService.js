import api from './api';

export const getUserDetails = async () => {
  return await api.get('/user');
};

// Add more user-related services as necessary
