import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productImageController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get product route

router.get("/get-product", getProductController);

//get single product
router.get("/get-single-product/:slug", getSingleProductController);
export default router;

//get image route

router.get("/product-image/:pid", productImageController);

//delete product

router.delete("/delete-product/:pid", deleteProductController);
