import mongoose, { Schema, Types } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: 1,
  },
  description: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
      // required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  salesCount: {
    type: Number,
    default: 0,
  },
  netWeight: {
    type: String,
  },
  brand: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: "Review",
  },
});

export const Product = mongoose.model("Product", productSchema);
