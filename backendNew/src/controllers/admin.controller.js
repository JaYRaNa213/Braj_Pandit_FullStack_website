import Booking from '../models/booking.model.js';

// GET /api/admin/puja-bookings?search=abc&page=1&limit=10&sort=date
export const getPujaBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sort = 'date' } = req.query;

    const searchFilter = search
      ? {
          $or: [
            { userName: { $regex: search, $options: 'i' } },
            { pujaName: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const total = await Booking.countDocuments(searchFilter);

    const bookings = await Booking.find(searchFilter)
      .sort({ [sort]: 1 }) // Use -1 if descending is needed
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      data: bookings,
    });
  } catch (err) {
    console.error('Error fetching puja bookings:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
