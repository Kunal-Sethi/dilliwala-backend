import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { validateFields } from "../../utils/validateFields.js";
import { Category } from "../../models/category.model.js";
import { addCategoryService } from "../../services/index.js";

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

export { addCategory };
