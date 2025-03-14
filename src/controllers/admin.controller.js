import { Category } from "../models/category.model.js";
import { Order } from "../models/order.model.js";
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

  const deletedCategory = await Category.deleteOne({ _id: categoryId });

  if (!deletedCategory.deletedCount) {
    throw new ApiError(404, "Category not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Category deleted successfully."));
});

/**
 * Order functions for ADMINS
 */

const viewAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  if (!orders) {
    throw new ApiError(404, "No orders are placed");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, orders, "All orders are fetched successfully."));
});

const viewOrderDetails = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const orderDetails = await Order.findById(orderId);
  if (!orderDetails) {
    throw new ApiError(404, "Order does not exist.");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, orderDetails, "Order details fetched successfully.")
    );
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const { orderStatus } = req.body;
  if (!orderId) {
    throw new ApiError(404, "Order does not exist.");
  }
  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      $set: {
        orderStatus,
      },
    },
    {
      new: true,
    }
  );

  if (!order) {
    throw new ApiError(500, "Something went wrong, try again.");
  }

  // TODO : Send email notification for order status update.

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated."));
});

export {
  addProduct,
  editProduct,
  deleteProduct,
  addCategory,
  editCategory,
  deleteCategory,
  viewAllOrders,
  viewOrderDetails,
  updateOrderStatus,
};
