import Booking from '../models/booking.model.js';

export const getPujaBookings = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      sort = 'date',
      order = 'asc',
    } = req.query;

    const currentPage = Math.max(Number(page), 1);
    const perPage = Math.max(Number(limit), 1);
    const sortOrder = order === 'desc' ? -1 : 1;

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
      .sort({ [sort]: sortOrder }) // asc/desc handled
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      success: true,
      message: 'Puja bookings fetched successfully',
      total,
      totalPages: Math.ceil(total / perPage),
      page: currentPage,
      limit: perPage,
      data: bookings,
    });
  } catch (err) {
    console.error('Error fetching puja bookings:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
