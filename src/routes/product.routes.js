import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  getProduct,
  getAllProducts,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/get-product/:id").get(verifyJWT, getProduct);
router.route("/get-all-products").get(verifyJWT, getAllProducts);

export default router;
