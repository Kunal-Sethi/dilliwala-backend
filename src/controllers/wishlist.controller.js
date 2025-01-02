import { Product } from "../models/product.model.js";
import { Wishlist } from "../models/wishlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product does not exist.");
  }

  const wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    const wishlist = await Wishlist.create({
      userId,
      products: [{ productId }],
    });

    return res
      .status(200)
      .json(new ApiResponse(200, wishlist, "Product added in wishlist."));
  } else {
    const existingProduct = wishlist.products.find(
      (item) => item.productId.toString() === productId
    );
    if (existingProduct) {
      wishlist.products = wishlist.products.filter(
        (item) => item.productId === productId
      );
      await wishlist.save();
    } else {
      wishlist.products.push({ productId });
      await wishlist.save();
    }

    return res
      .status(200)
      .json(new ApiResponse(200, wishlist, "Product added in wishlist."));
  }
});

const getWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    throw new ApiError(404, "Wishlist is empty");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, wishlist, "Wishlist fetched successfully."));
});

export { toggleWishlist, getWishlist };
