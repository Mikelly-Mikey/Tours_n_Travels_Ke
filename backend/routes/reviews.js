import express from 'express';
import { body, validationResult } from 'express-validator';
import Review from '../models/Review.js';
import Package from '../models/Package.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/reviews
// @desc    Get all reviews or reviews for a specific package
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { package: packageId, approved } = req.query;
    let query = {};

    if (packageId) {
      query.package = packageId;
    }
    if (approved !== undefined) {
      query.approved = approved === 'true';
    }

    const reviews = await Review.find(query)
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reviews/:id
// @desc    Get single review
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('user', 'name');
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/reviews
// @desc    Create a review
// @access  Private
router.post(
  '/',
  protect,
  [
    body('package').notEmpty().withMessage('Package ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').notEmpty().withMessage('Comment is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { package: packageId, rating, comment } = req.body;

    try {
      const packageItem = await Package.findById(packageId);
      if (!packageItem) {
        return res.status(404).json({ message: 'Package not found' });
      }

      const existingReview = await Review.findOne({
        user: req.user.id,
        package: packageId,
      });

      if (existingReview) {
        return res.status(400).json({ message: 'You have already reviewed this package' });
      }

      const review = await Review.create({
        user: req.user.id,
        userName: req.user.name,
        package: packageId,
        rating,
        comment,
      });

      res.status(201).json({ success: true, data: review });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PUT /api/reviews/:id
// @desc    Update a review
// @access  Private
router.put(
  '/:id',
  protect,
  [
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().notEmpty().withMessage('Comment cannot be empty'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let review = await Review.findById(req.params.id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
      }

      review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.json({ success: true, data: review });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PUT /api/reviews/:id/approve
// @desc    Approve a review
// @access  Private/Admin
router.put('/:id/approve', protect, authorize('admin'), async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await review.deleteOne();
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
