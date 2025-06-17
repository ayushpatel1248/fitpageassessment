const reviewService = require("../services/reviewService");

const reviewController = {};

reviewController.getReviews = async (req, res) => {
  try {
    const { product_id } = req.body;
    const result = await reviewService.getReviewsByProduct(product_id);
    res.send(result);
  } catch (err) {
    res.send({
      status: "err",
      message: "Error occurred in controller",
      data: err.message
    });
  }
};

reviewController.createReview = async (req, res) => {
  try {
    const { user_id, product_id, review, rating, image } = req.body;
    const result = await reviewService.createReview({ user_id, product_id, review, rating, image });
    res.send(result);
  } catch (err) {
    res.send({
      status: "err",
      message: "Error occurred in controller",
      data: err.message
    });
  }
};

module.exports = reviewController;
