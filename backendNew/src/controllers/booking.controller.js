import Booking from '../models/booking.model.js';

// ✅ User: Create Booking
export const createBooking = async (req, res) => {
  try {
    const { service, date, time, additionalInfo } = req.body;
    if (!service || !date || !time) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      service,
      date,
      time,
      additionalInfo,
    });

    res.status(201).json({ success: true, message: 'Booking created', booking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ✅ Admin: Get All Bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email');
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ✅ User: Get own bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ✅ Admin: Get booking by ID
export const getSingleBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user', 'name email');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ✅ Admin: Update Booking
export const updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, message: 'Booking updated', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ✅ Admin: Delete Booking
export const deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, message: 'Booking deleted', data: deleted });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
