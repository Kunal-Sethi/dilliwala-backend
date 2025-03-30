import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { validateFields } from "../../utils/validateFields.js";
import { Category } from "../../models/category.model.js";
import {
  addCategoryService,
  deleteCategoryService,
  editCategoryService,
} from "../../services/index.js";

const addCategory = asyncHandler(async (req, res) => {
  const requiredFields = ["name"];

  const checkValidation = validateFields(req.body, requiredFields);

  if (checkValidation) {
    throw new ApiError(404, checkValidation);
  }

  const category = await addCategoryService(req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category created successfully."));
});

const editCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const requiredFields = ["name"];
  const checkValidation = validateFields(req.body, requiredFields);
  if (checkValidation) {
    throw new ApiError(404, checkValidation);
  }
  const updatedCategory = await editCategoryService(categoryId, req.body);

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedCategory, "Category updated successfully.")
    );
});

const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const deletedCategory = await deleteCategoryService(categoryId);

  return res
    .status(200)
    .json(
      new ApiResponse(200, deletedCategory, "Category deleted successfully.")
    );
});

export { addCategory, editCategory, deleteCategory };
