import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

const placeOrder = asyncHandler(async (req, res) => {
  const { products } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(401, "Unauthorized user.");
  }
  var totalPrice = 0;
  var totalProducts = [];

  await Promise.all(
    products.map(async (product) => {
      const currentProduct = await Product.findById(product.productId);
      if (!currentProduct) {
        throw new ApiError(
          404,
          `${currentProduct.name} Product does not exist.`
        );
      }
      if (currentProduct.stock >= product.quantity) {
        currentProduct.stock -= product.quantity;

        await currentProduct.save();

        totalProducts.push(product);
        totalPrice +=
          (currentProduct.discountedPrice
            ? currentProduct.discountedPrice
            : currentProduct.price) * product.quantity;
      } else {
        throw new ApiError(404, "Some products are out of stock");
      }
    })
  );

  //   Todo: Add address later
  const order = await Order.create({
    userId,
    products: totalProducts,
    orderTotal: totalPrice,
    orderStatus: "Pending",
    paymentStatus: "Paid",
  });
  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order placed successfully."));
});

const getPastOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized user.");
  }

  const orders = await Order.find({ userId });

  if (!orders) {
    throw new ApiError(404, "No past orders");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Past orders fetched successfully."));
});

export { placeOrder, getPastOrders };
