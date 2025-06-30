import data from './pujaServices.json';

// Remove duplicates by title
const seen = new Set();
const uniqueServices = data.filter(service => {
  if (seen.has(service.title)) return false;
  seen.add(service.title);
  return true;
});

export const pujaServices = uniqueServices;
