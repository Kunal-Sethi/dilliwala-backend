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

export { addCategoryService, getAllCategoriesService };
