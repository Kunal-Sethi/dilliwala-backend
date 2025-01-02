import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import {
  getWishlist,
  toggleWishlist,
} from "../controllers/wishlist.controller.js";

const router = Router();

router.route("/toggle-wishlist").post(verifyJWT, toggleWishlist);
router.route("/get-wishlist").get(verifyJWT, getWishlist);

export default router;
