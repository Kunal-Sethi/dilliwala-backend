import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Review } from "../models/review.model.js";

const addProductReview = asyncHandler(async (req, res) => {
  const { rating, review } = req.body;
  const productId = req.params.id;
  const userId = req.user._id;

  if (rating < 0 || rating > 5) {
    throw new ApiError(404, "Rating should be between 1 to 5.");
  }

  const newReview = await Review.create({
    productId,
    userId,
    rating,
    review,
  });

  if (!newReview) {
    throw new ApiError(500, "Something went wrong.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newReview, "Review submitted succesfully."));
});

const deleteProductReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.body;
  const userId = req.user._id;

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new ApiError(404, "Review not found.");
  }

  if (!review.userId.equals(userId)) {
    throw new ApiError(401, "Not authorized to delete this review.");
  }

  await review.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Review deleted successfully."));
});

const getProductReviews = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const reviews = await Review.find({ productId });

  if (!reviews) {
    throw new ApiError(404, "No reviews for the product.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, reviews, "Reviews fetched successfully."));
});

export { addProductReview, deleteProductReview, getProductReviews };
