import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide package name'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Please provide location'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
  },
  originalPrice: {
    type: Number,
    default: 0,
  },
  duration: {
    type: String,
    required: [true, 'Please provide duration'],
  },
  image: {
    type: String,
    default: '',
  },
  images: [{
    type: String,
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  available: {
    type: Boolean,
    default: true,
  },
  maxGuests: {
    type: Number,
    default: 10,
  },
  amenities: [{
    type: String,
  }],
  itinerary: [{
    day: Number,
    description: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Package = mongoose.model('Package', packageSchema);

export default Package;
