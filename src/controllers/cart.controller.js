import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  if (!productId || !quantity) {
    throw new ApiError(400, "Invalid product or quantity.");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product does nnot exist.");
  }

  const cart = await Cart.findOne({ userId });

  if (cart) {
    const existingProduct = cart.products.find((item) => {
      return item.productId.toString() === productId;
    });
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    // TODO: Optimize cart pricing with this method
    // cart.totalPrice = cart.products.reduce((total, item) => {
    //   const productPrice = product.discountedPrice
    //     ? product.discountedPrice
    //     : product.price;
    //   let product = await Product.findById(item.productId);
    //   total = total + product.price * item.quantity;
    // }, 0);

    cart.totalPrice += product.price * quantity;
    cart.totalPrice = parseFloat(cart.totalPrice.toFixed(2));

    await cart.save();

    return res
      .status(200)
      .json(new ApiResponse(200, cart, "Item added to cart."));
  } else {
    const totalPrice =
      (product.discountedPrice ? product.discountedPrice : product.price) *
      quantity;
    const addedProduct = await Cart.create({
      userId,
      products: [{ productId, quantity }],
      totalPrice,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, addedProduct, "Item added to cart."));
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new ApiError(404, "Cart is empty.");
  }

  const existingProduct = cart.products.find((item) => {
    return item.productId.toString() === productId;
  });

  if (!existingProduct) {
    throw new ApiError(400, "Product doesnot exist.");
  }

  const product = await Product.findById(productId);

  if (existingProduct.quantity > 1) {
    existingProduct.quantity -= quantity;
    cart.totalPrice -=
      (product.discountedPrice ? product.discountedPrice : product.price) *
      quantity;
  } else {
    cart.products = cart.products.filter(
      (item) => item.productId === productId
    );
    cart.totalPrice -=
      (product.discountedPrice ? product.discountedPrice : product.price) *
      quantity;
  }

  await cart.save();

  return res.status(200).json(new ApiResponse(200, cart, "Cart updated."));
});

const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ userId }).populate(
    "products.productId",
    "_id stock price discountedPrice"
  );

  if (!cart) {
    throw new ApiError(404, "Cart is empty");
  }

  cart.products.map((product) => {
    if (product.quantity > product.productId.stock) {
      product.status = "Out of stock";
    }
  });

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart fetched successfully."));
});

const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const deletedCart = await Cart.findOneAndDelete({ userId });

  if (!deletedCart) {
    throw new ApiError(400, "Cart is empty.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedCart, "Cart cleared."));
});

export { addToCart, removeFromCart, getCart, clearCart };
