import { viewOrderDetails } from "../controllers/admin.controller.js";
import { getPastOrders, placeOrder } from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.route("/place-order").post(verifyJWT, placeOrder);
router.route("/past-orders").get(verifyJWT, getPastOrders);
router.route("/view-order-details/:id").post(verifyJWT, viewOrderDetails); // Added from admin controller to reuse code.

export default router;
