import express from 'express';
import { body, validationResult } from 'express-validator';
import Package from '../models/Package.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/packages
// @desc    Get all packages with search
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { featured, available, location, search } = req.query;
    let query = {};

    if (featured === 'true') {
      query.featured = true;
    }
    if (available === 'true') {
      query.available = true;
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const packages = await Package.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: packages.length, data: packages });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/packages/:id
// @desc    Get single package
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const packageItem = await Package.findById(req.params.id);
    if (!packageItem) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json({ success: true, data: packageItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/packages
// @desc    Create a package
// @access  Private/Admin
router.post(
  '/',
  protect,
  authorize('admin'),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('duration').notEmpty().withMessage('Duration is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const packageItem = await Package.create(req.body);
      res.status(201).json({ success: true, data: packageItem });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PUT /api/packages/:id
// @desc    Update a package
// @access  Private/Admin
router.put(
  '/:id',
  protect,
  authorize('admin'),
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('location').optional().notEmpty().withMessage('Location cannot be empty'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const packageItem = await Package.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!packageItem) {
        return res.status(404).json({ message: 'Package not found' });
      }
      res.json({ success: true, data: packageItem });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   DELETE /api/packages/:id
// @desc    Delete a package
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const packageItem = await Package.findByIdAndDelete(req.params.id);
    if (!packageItem) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
