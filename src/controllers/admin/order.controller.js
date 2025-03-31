import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import {
  updateOrderStatusService,
  viewAllOrdersService,
  viewOrderDetailsService,
} from "../../services/index.js";
import { validateFields } from "../../utils/validateFields.js";
import { ApiError } from "../../utils/ApiError.js";

const viewAllOrders = asyncHandler(async (req, res) => {
  const orders = await viewAllOrdersService();

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully."));
});

const viewOrderDetails = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const orderDetails = await viewOrderDetailsService(orderId);

  return res
    .status(200)
    .json(
      new ApiResponse(200, orderDetails, "Order details fetched successfully.")
    );
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const updatedOrderStatus = req.body;

  const requiredFields = ["orderStatus"];
  const checkValidation = validateFields(req.body, requiredFields);
  if (checkValidation) {
    throw new ApiError(404, checkValidation);
  }

  const updatedOrder = await updateOrderStatusService(
    orderId,
    updatedOrderStatus
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedOrder, "Order status changed successfully.")
    );
});

export { viewAllOrders, viewOrderDetails, updateOrderStatus };
