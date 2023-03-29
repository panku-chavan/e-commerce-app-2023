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
