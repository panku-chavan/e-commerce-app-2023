import express from "express";
import {
  allCategoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
// create category route
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category route
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get all category

router.get("/get-category", allCategoryController);

//get single category

router.get("/single-category/:slug", singleCategoryController);

//delete category

router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
