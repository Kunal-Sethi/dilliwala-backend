import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * Product functions for ADMINS
 */
const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    stock,
    // images,
    price,
    discountedPrice,
    category,
    netWeight,
    brand,
    expiryDate,
  } = req.body;

  if (
    !name ||
    !description ||
    !stock ||
    // images ||
    !price ||
    !discountedPrice ||
    !category ||
    !netWeight ||
    !brand ||
    !expiryDate
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  const product = await Product.create({
    name,
    description,
    stock,
    // images,
    price,
    discountedPrice,
    category,
    netWeight,
    brand,
    expiryDate,
  });

  if (!product) {
    throw new ApiError(501, "Something went wrong, Please try again.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product created successfully."));
});

const editProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $set: updatedProductData,
    },
    {
      new: true,
    }
  );

  if (!updatedProduct) {
    throw new ApiError(500, "Something went wrong.");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated."));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const deletedProduct = await Product.findByIdAndDelete(productId);

  if (!deletedProduct) {
    throw new ApiError(404, "Product not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully."));
});

/**
 * Category functions for ADMINS
 */

const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(404, "Name of the category is required.");
  }

  const category = await Category.create({
    name,
  });

  if (!category) {
    throw new ApiError(500, "Something went wrong.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category added successfully."));
});

const editCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const updatedCategoryData = req.body;

  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    {
      $set: updatedCategoryData,
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  if (!updatedCategory) {
    throw new ApiError(404, "Category not found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedCategory, "Category updated successfully.")
    );
});

const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  const deletedCategory = await Category.findByIdAndDelete(categoryId);

  if (!deleteCategory) {
    throw new ApiError(404, "Category not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Category deleted successfully."));
});

export {
  addProduct,
  editProduct,
  deleteProduct,
  addCategory,
  editCategory,
  deleteCategory,
};
