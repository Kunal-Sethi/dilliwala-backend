import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.route("/add-to-cart").post(verifyJWT, addToCart);
router.route("/clear-cart").post(verifyJWT, clearCart);
router.route("/get-cart").get(verifyJWT, getCart);
router.route("/remove-from-cart").post(verifyJWT, removeFromCart);

export default router;
