import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status) {
      query.status = status;
    }

    const messages = await Contact.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact message
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/contact
// @desc    Create a contact message
// @access  Public
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, subject, message } = req.body;

    try {
      const contactMessage = await Contact.create({
        name,
        email,
        phone,
        subject,
        message,
      });

      res.status(201).json({
        success: true,
        data: contactMessage,
        message: 'Message sent successfully',
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PUT /api/contact/:id
// @desc    Update contact message status
// @access  Private/Admin
router.put(
  '/:id',
  protect,
  authorize('admin'),
  [
    body('status').optional().isIn(['pending', 'read', 'responded']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const message = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
      res.json({ success: true, data: message });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   DELETE /api/contact/:id
// @desc    Delete a contact message
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
