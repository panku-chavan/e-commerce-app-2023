import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;
    if (!name) {
      return res.send({ messege: "Name is requred" });
    }
    if (!description) {
      return res.send({ messege: "Desription is requred" });
    }
    if (!price) {
      return res.send({ messege: "Price is requred" });
    }
    if (!category) {
      return res.send({ messege: "Category is requred" });
    }
    if (!quantity) {
      return res.send({ messege: "Quantity is requred" });
    }
    if (!image && image.size > 1000000) {
      return res.send({
        messege: "Image is requred and size should be less than 1 MB",
      });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      messege: "Product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      messege: "Error while creating product",
      error,
    });
  }
};

// get product controller

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      total_count: products.length,
      messege: "All products get successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messege: "Error while getting products",
      error,
    });
  }
};

//get single product controller

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-image")
      .populate("category");
    res.status(200).send({
      success: true,
      messege: "Single product get successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messege: "Error while getting single product",
    });
  }
};

// get product image controller

export const productImageController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("image");
    if (product.image.data) {
      res.set("Content-type", product.image.contentType);
      res.status(200).send(product.image.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messege: "Error while getting product image",
      error,
    });
  }
};
