

export const getAllReviews = (req, res) => {
  console.log("getAllReviews route");
  res.send('getAllReviews route');
};

const getReview = (req, res) => {
  console.log("getReview route");
  res.send('getReview route');
};

const createReview = (req, res) => {
  console.log("createReview route");
  res.send('createReview route');
};

const updateReview = (req, res) => {
  console.log("updateReview route");
  res.send('updateReview route');
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
