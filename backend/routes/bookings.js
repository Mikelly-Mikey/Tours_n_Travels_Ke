import express from 'express';
import { body, validationResult } from 'express-validator';
import Booking from '../models/Booking.js';
import Package from '../models/Package.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/bookings
// @desc    Get all bookings (admin) or user bookings
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let query;
    if (req.user.role === 'admin') {
      query = {};
    } else {
      query = { user: req.user.id };
    }
    const bookings = await Booking.find(query)
      .populate('package', 'name location price image')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('package');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/bookings
// @desc    Create a booking
// @access  Private
router.post(
  '/',
  protect,
  [
    body('package').notEmpty().withMessage('Package ID is required'),
    body('numberOfGuests').isInt({ min: 1 }).withMessage('Number of guests must be at least 1'),
    body('arrivalDate').isISO8601().withMessage('Invalid arrival date'),
    body('departureDate').isISO8601().withMessage('Invalid departure date'),
    body('contactPhone').notEmpty().withMessage('Contact phone is required'),
    body('contactEmail').isEmail().withMessage('Invalid contact email'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { package: packageId, numberOfGuests, arrivalDate, departureDate, contactPhone, contactEmail, specialRequests } = req.body;

    try {
      const packageItem = await Package.findById(packageId);
      if (!packageItem) {
        return res.status(404).json({ message: 'Package not found' });
      }

      if (!packageItem.available) {
        return res.status(400).json({ message: 'Package is not available' });
      }

      if (numberOfGuests > packageItem.maxGuests) {
        return res.status(400).json({ message: `Maximum ${packageItem.maxGuests} guests allowed` });
      }

      const totalPrice = packageItem.price * numberOfGuests;

      const booking = await Booking.create({
        user: req.user.id,
        package: packageId,
        packageName: packageItem.name,
        location: packageItem.location,
        numberOfGuests,
        arrivalDate: new Date(arrivalDate),
        departureDate: new Date(departureDate),
        totalPrice,
        contactPhone,
        contactEmail,
        specialRequests,
      });

      res.status(201).json({ success: true, data: booking });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PUT /api/bookings/:id
// @desc    Update booking status
// @access  Private/Admin
router.put(
  '/:id',
  protect,
  authorize('admin'),
  [
    body('status').optional().isIn(['pending', 'confirmed', 'cancelled', 'completed']),
    body('paymentStatus').optional().isIn(['pending', 'paid', 'refunded']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json({ success: true, data: booking });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   DELETE /api/bookings/:id
// @desc    Cancel/delete a booking
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = 'cancelled';
    await booking.save();
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
