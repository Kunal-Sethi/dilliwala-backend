import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllCategories } from "../controllers/category.controller.js";

const router = Router();

router.route("/get-all-categories").get(verifyJWT, getAllCategories);

export default router;
