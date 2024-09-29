import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.model("Review", reviewSchema);
