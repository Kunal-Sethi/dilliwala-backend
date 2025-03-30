import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";
import { getAllCategoriesService } from "../services/index.js";

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await getAllCategoriesService();

  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully."));
});

export { getAllCategories };
