import models from '../models/index.js';
import { CustomAPIError, createError } from '../errors/custom-api-error.js';
import { StatusCodes } from 'http-status-codes'

export const getAllReviews = async (req, res) => {
  try {
    const reviewsModel = models.Review;
    const { recipeId: recipeID } = req.params;

    let page = req.query.page ? req.query.page : 1;
    let limit = req.query.limit ? req.query.limit : 15;
    let offset = req.query.offset ? req.query.offset : 0;

    const allReviews = await reviewsModel.findAndCountAll({
      page: page,
      offset: offset,
      limit: limit,
      where: {
        recipeId: recipeID
      },
      order: [
        ['id', 'ASC']
      ]});
    if (!allReviews) throw new CustomAPIError(`No recipes found`, 404);

    res.status(StatusCodes.OK).json({ allReviews });

  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ 'msg': err });
  }
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
    res.status(StatusCodes.BAD_REQUEST).json({'msg': err});
  }
};

const createReview = async (req, res, next) => {
  try {
    const { recipeId: recipeID } = req.params;
    const { reviewText, reviewRating } = req.body;
    const recipe = await models.Recipe.findOne({
      where: {
        id: recipeID
      }
    });

    if (!recipe) return next(createError(`No such recipe found`, 404));

    const newReview = await models.Review.create(
      {
        review_text: reviewText
        , review_rating: reviewRating
        , recipeId: recipeID
      }
    );

    res.status(StatusCodes.CREATED).json({ newReview });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({'msg': err});
  }
};

const updateReview = async (req, res) => {
  try {
    const { recipeId: recipeID, reviewId: reviewID  } = req.params;
    const { reviewText, reviewRating } = req.body;

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
    if (reviewText) data['review_text'] = reviewText;
    if (reviewRating) data['review_rating'] = reviewRating;

    // Update recipe
    review.set(data);
    await review.save();

    res.status(StatusCodes.OK).json({ review });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({'msg': err});
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId: reviewID } = req.params;
    const review = await models.Review.findOne({
      where: {
        id: reviewID
      }
    });
    if (!review) throw new CustomAPIError(`No such review found`, 404);
    const response = await review.destroy();

    res.status(StatusCodes.OK).json({ response });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({'msg': err});
  }
};

export default {
  createReview,
  getReview,
  getAllReviews,
  updateReview,
  deleteReview,
}
