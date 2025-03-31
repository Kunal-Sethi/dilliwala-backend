import { Order } from "../../models/order.model.js";
import { ApiError } from "../../utils/ApiError.js";

const viewAllOrdersService = async () => {
  try {
    const orders = await Order.find();
    if (!orders) {
      throw new ApiError(404, "No orders found.");
    }
    return orders;
  } catch (error) {
    console.log("Error found in orderService file : ", error.message);
    throw new ApiError(501, "Something went wrong while fetching the orders");
  }
};

const viewOrderDetailsService = async (orderId) => {
  try {
    const orderDetails = await Order.findById(orderId);
    if (!orderDetails) {
      throw new ApiError(404, "Order not found");
    }
    return orderDetails;
  } catch (error) {
    console.log("Error found in orderService file : ", error.message);
    throw new ApiError(
      501,
      "Something went wrong while fetching the order details."
    );
  }
};

const updateOrderStatusService = async (orderId, updatedOrderStatus) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: updatedOrderStatus,
      },
      {
        new: true,
      }
    );

    if (!updatedOrder) {
      throw new ApiError(404, "Order not found.");
    }

    return updatedOrder;
  } catch (error) {
    console.log("Error found in the orderService file : ", error.message);
    throw new ApiError(501, "Something went wrong.");
  }
};

export {
  viewAllOrdersService,
  viewOrderDetailsService,
  updateOrderStatusService,
};
