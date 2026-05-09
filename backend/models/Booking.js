import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true,
  },
  packageName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: [true, 'Please provide number of guests'],
    min: 1,
  },
  arrivalDate: {
    type: Date,
    required: [true, 'Please provide arrival date'],
  },
  departureDate: {
    type: Date,
    required: [true, 'Please provide departure date'],
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending',
  },
  specialRequests: {
    type: String,
    default: '',
  },
  contactPhone: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
