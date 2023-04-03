import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFiltersController,
  productImageController,
  productListController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
//create product
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

//get image route

router.get("/product-image/:pid", productImageController);

//delete product

router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//filter product

router.post("/product-filter", productFiltersController);

//pagination
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

// search product router
router.get("/search-product/:keyword", searchProductController);

export default router;
