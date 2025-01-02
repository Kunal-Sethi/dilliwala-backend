import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched succesfully."));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  if (!products) {
    throw new ApiError(400, "No existing products.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products list fetched."));
});

export { getProduct, getAllProducts };
