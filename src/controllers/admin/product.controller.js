import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import {
  addProductService,
  deleteProductService,
  editProductService,
} from "../../services/index.js";
import { ApiError } from "../../utils/ApiError.js";
import { validateFields } from "../../utils/validateFields.js";
import { Product } from "../../models/product.model.js";

const addProduct = asyncHandler(async (req, res) => {
  const requiredFields = [
    "name",
    "description",
    "stock",
    "images",
    "price",
    "discountedPrice",
    "category",
    "netWeight",
    "brand",
    "expiryDate",
  ];

  const checkValidation = validateFields(req.body, requiredFields);
  if (checkValidation) {
    throw new ApiError(400, checkValidation);
  }

  const product = await addProductService(req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product is created successfully."));
});

const editProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;

  if (!productId) {
    throw new ApiError(404, "Not a valid product.");
  }

  if (Object.keys(updatedProductData).length === 0) {
    throw new ApiError(404, "Nothing is there to be updated.");
  }

  const updatedProduct = await editProductService(
    productId,
    updatedProductData
  );

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

  const deletedProduct = await deleteProductService(productId);

  return res
    .status(200)
    .json(
      new ApiResponse(200, deletedProduct, "Product deleted successfully.")
    );
});

export { addProduct, editProduct, deleteProduct };
