import { Router } from "express";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  deleteCategory,
  editCategory,
  updateOrderStatus,
  viewAllOrders,
  viewOrderDetails,
} from "../controllers/admin.controller.js";
import {
  addProduct,
  editProduct,
  deleteProduct,
} from "../controllers/admin/product.controller.js";
import { addCategory } from "../controllers/admin/category.controller.js";

const router = Router();

// Admin product routes
router.route("/add-product").post(verifyAdmin, addProduct);
router.route("/edit-product/:id").put(verifyAdmin, editProduct);
router.route("/delete-product/:id").delete(verifyAdmin, deleteProduct);

// Admin Category routes
router.route("/add-category").post(verifyAdmin, addCategory);
router.route("/edit-category/:id").put(verifyAdmin, editCategory);
router.route("/delete-category/:id").delete(verifyAdmin, deleteCategory);

// Admin Order routes
router.route("/view-orders").get(verifyAdmin, viewAllOrders);
router.route("/view-order-details/:id").post(verifyAdmin, viewOrderDetails);
router.route("/update-order-status/:id").put(verifyAdmin, updateOrderStatus);
export default router;
