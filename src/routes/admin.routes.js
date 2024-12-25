import { Router } from "express";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  addCategory,
  addProduct,
  deleteCategory,
  deleteProduct,
  editCategory,
  editProduct,
} from "../controllers/admin.controller.js";

const router = Router();

// Admin product routes
router.route("/add-product").post(verifyAdmin, addProduct);
router.route("/edit-product/:id").put(verifyAdmin, editProduct);
router.route("/delete-product/:id").delete(verifyAdmin, deleteProduct);

// Admin Category routes
router.route("/add-category").post(verifyAdmin, addCategory);
router.route("/edit-category/:id").put(verifyAdmin, editCategory);
router.route("/delete-category/:id").delete(verifyAdmin, deleteCategory);
export default router;
