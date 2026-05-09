import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true,
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, 'Please provide a review comment'],
  },
  approved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Update package rating when review is saved
reviewSchema.post('save', async function () {
  const Package = mongoose.model('Package');
  const packageId = this.package;
  
  const reviews = await mongoose.model('Review').find({ package: packageId, approved: true });
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  await Package.findByIdAndUpdate(packageId, {
    rating: averageRating.toFixed(1),
    reviewCount: reviews.length,
  });
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
