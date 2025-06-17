const { client } = require("../db/db");

const reviewServices = {};

reviewServices.getReviewsByProduct = async (productId) => {
  try {
    const query = `SELECT * FROM reviews WHERE product_id = $1`;
    const result = await client.query(query, [productId]);

    return {
      status: "OK",
      message: "reviews fetched successfully",
      data: result.rows
    };
  } catch (err) {
    return {
      status: "err",
      message: "Error occurred in service",
      data: err.message
    };
  }
};

reviewServices.createReview = async ({ user_id, product_id, review, rating, image }) => {
  try {
    const exists = await client.query(
      `SELECT * FROM reviews WHERE user_id = $1 AND product_id = $2`,
      [user_id, product_id]
    );

    if (exists.rows.length > 0) {
      return {
        status: "fail",
        message: "User has already submitted a review for this product",
        data: null
      };
    }

    const insertQuery = `
      INSERT INTO reviews (user_id, product_id, review, rating, image)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const result = await client.query(insertQuery, [
      user_id= Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
      product_id,
      review,
      rating,
      image
    ]);

    return {
      status: "OK",
      message: "Review submitted successfully",
      data: result.rows[0]
    };
  } catch (err) {
    return {
      status: "err",
      message: "Error occurred in service",
      data: err.message
    };
  }
};

module.exports = reviewServices;
