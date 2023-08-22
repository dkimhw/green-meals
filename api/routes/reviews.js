import express from 'express';
import reviewsController from '../controllers/reviews.js';

const router = express.Router();

// Create routes
router.get('/:recipeId', reviewsController.getAllReviews);
router.get('/:recipeId/:reviewId', reviewsController.getReview);
router.post('/:recipeId/create', reviewsController.createReview);
router.patch('/:recipeId/:reviewId', reviewsController.updateReview);
router.delete('/:recipeId/:reviewId', reviewsController.deleteReview);

export default router;
