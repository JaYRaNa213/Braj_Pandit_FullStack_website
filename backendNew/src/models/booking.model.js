// Import mongoose to define the schema and model
import mongoose from 'mongoose';

// Define the Booking schema
const bookingSchema = new mongoose.Schema({
  // Reference to the user who made the booking
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  // Service booked (e.g., Puja, Havan, etc.)
  service: {
    type: String,
    // required: true,
  },
  // Date of the booking
  date: {
    type: Date,
    // required: true,
  },
  // Time of the booking
  time: {
    type: String,
    // required: true,
  },
  // Pandit selected for the booking
  pandit: {
    type: String,
    // required: true,
  },
  // Status of the booking (default is 'pending')
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  // Additional information or notes
  additionalInfo: {
    type: String,
  },
}, {
  timestamps: true, // Optional: adds createdAt and updatedAt
});

// Create and export the Booking model
const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
