import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ messege: "Name is require" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        messege: "Category Already Exist",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      messege: "New Category Created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messege: "Error in category",
      error,
    });
  }
};

//update category controller

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messege: "Category Updated Successfully.",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messege: "Error while updating category",
      error,
    });
  }
};

// get all category

export const allCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      messege: "All categories list",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messege: "Error while getting all categories.",
      error,
    });
  }
};

//single category

export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      messege: "Successfully get single category.",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messege: "Error while getting single category",
      error,
    });
  }
};

// delete category controller

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      messege: "Category Deleted Successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messege: "Error while deleting category.",
      error,
    });
  }
};
