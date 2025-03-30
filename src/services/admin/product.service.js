import { Product } from "../../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";

const addProductService = async (productData) => {
  try {
    const product = await Product.create(productData);

    if (!product) {
      throw new ApiError(501, "Problem occured in creating product.");
    }

    return product;
  } catch (error) {
    console.error("Error in addProductService : ", error.message);
    throw new ApiError(501, "Error occured while creating the product.");
  }
};

const editProductService = async (productId, updatedProductData) => {
  try {
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

    return updatedProduct;
  } catch (error) {
    console.error("Error in editProductService : ", error.message);
    throw new ApiError(501, "Error occured while updating the product.");
  }
};

const deleteProductService = async (productId) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      throw new ApiError(501, "Something went wrong while deleting product.");
    }
    return deletedProduct;
  } catch (error) {
    console.log("Error in productService : ", error.message);
    throw new ApiError(501, "Something went wrong.");
  }
};

export { addProductService, editProductService, deleteProductService };
