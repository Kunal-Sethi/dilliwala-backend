import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  updateUserDetails,
  updatePassword,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/signin").post(loginUser);

// Protected route
router.route("/signout").post(verifyJWT, logoutUser);
router.route("/update-details").post(verifyJWT, updateUserDetails);
router.route("/update-password").post(verifyJWT, updatePassword);

export default router;
