import {
  addProductReview,
  deleteProductReview,
  getProductReviews,
} from "../controllers/review.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.route("/add-review/:id").post(verifyJWT, addProductReview);
router.route("/delete-review").post(verifyJWT, deleteProductReview);
router.route("/get-reviews/:id").get(verifyJWT, getProductReviews);

export default router;
