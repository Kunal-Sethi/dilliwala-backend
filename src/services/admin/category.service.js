import { Category } from "../../models/category.model.js";
import { ApiError } from "../../utils/ApiError.js";

const addCategoryService = async (categoryData) => {
  try {
    const category = await Category.create(categoryData);
    if (!category) {
      throw new ApiError(501, "Something went wrong while creating category.");
    }
    return category;
  } catch (error) {
    console.log("Error in categoryService file : ", error.message);
    throw new ApiError(501, "Something went wrong.");
  }
};

// This service is not for admin only, but all users can access this.
const getAllCategoriesService = async () => {
  try {
    const categories = await Category.find();

    if (!categories) {
      throw new ApiError(500, "Category not found");
    }
    return categories;
  } catch (error) {
    console.log("Error coming from categoryServce file : ", error.message);
    throw new ApiError(501, "Something went wrong.");
  }
};

const editCategoryService = async (categoryId, updatedCategoryData) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: updatedCategoryData,
      },
      {
        new: true,
      }
    );
    if (!updatedCategory) {
      throw new ApiError(404, "Category not found.");
    }
    return updatedCategory;
  } catch (error) {
    console.log("Error found in categroyService file : ", error.message);
    throw new ApiError(501, "Something went wrong.");
  }
};

const deleteCategoryService = async (categoryId) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      throw new ApiError(404, "Category not found.");
    }
    return deletedCategory;
  } catch (error) {
    console.log("Error found in categroyService file : ", error.message);
    throw new ApiError(501, "Something went wrong while deleting category.");
  }
};

export {
  addCategoryService,
  getAllCategoriesService,
  editCategoryService,
  deleteCategoryService,
};
