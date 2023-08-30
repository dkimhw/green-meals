import models from '../models/index.js';
import { CustomAPIError, createError } from '../errors/custom-api-error.js';

export const getAllReviews = (req, res) => {
  console.log("getAllReviews route");
  res.send('getAllReviews route');
};

const getReview = async (req, res) => {
  try {
    const { reviewId: reviewID } = req.params;
    const review = await models.Review.findOne({
      where: {
        id: reviewID
      }
    });

    if (!review) return res.status(404).json({ 'msg': 'No such review found.' });

    res.status(200).json({ review });
  } catch (err) {
    res.status(500).json({'msg': err});
  }
};

const createReview = async (req, res, next) => {
  try {
    const { recipeId: recipeID } = req.params;
    const { reviewTitle, reviewText, reviewRating } = req.body;
    const recipe = await models.Recipe.findOne({
      where: {
        id: recipeID
      }
    });

    if (!recipe) return next(createError(`No such recipe found`, 404));

    const newReview = await models.Review.create(
      {
        review_title: reviewTitle
        , review_text: reviewText
        , review_rating: reviewRating
        , recipeId: recipeID
      }
    );

    res.status(200).json({ newReview });
  } catch (err) {
    res.status(500).json({'msg': err});
  }
};

const updateReview = async (req, res) => {
  try {
    const { recipeId: recipeID, reviewId: reviewID  } = req.params;
    const { reviewTitle, reviewText, reviewRating } = req.body;

    const recipe = await models.Recipe.findOne({
      where: {
        id: recipeID
      }
    });
    if (!recipe) throw new CustomAPIError(`No such recipe found`, 404);

    const review = await models.Review.findOne({
      where: {
        id: reviewID
      }
    });
    if (!review) throw new CustomAPIError(`No such review found`, 404);

    const data = {};
    if (reviewTitle) data['review_title'] = reviewTitle;
    if (reviewText) data['review_text'] = reviewText;
    if (reviewRating) data['review_rating'] = reviewRating;

    // Update recipe
    review.set(data);
    await review.save();

    res.status(200).json({ review });
  } catch (err) {
    res.status(500).json({'msg': err});
  }






};

const deleteReview = (req, res) => {
  console.log("deleteReview route");
  res.send('deleteReview route');
};

export default {
  createReview,
  getReview,
  getAllReviews,
  updateReview,
  deleteReview,
}
