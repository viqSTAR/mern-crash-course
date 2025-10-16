import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // get all products from the database
    res.status(200).json({ success: true, data: products }); // return success and all products if retrieval operation is successful
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" }); // return error if server error occurs during retrieval operation
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // get product data from request body

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" }); // return error if any required fields are missing
  }

  const newProduct = new Product(product); // create new product instance with provided data

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct }); // return success and new product if save operation is successful
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" }); // return error if server error occurs during save operation
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params; // get product id from request parameters

  const product = req.body; // get updated product data from request body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" }); // return error if product id is invalid
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    }); // update product with provided data
    res.status(200).json({ success: true, data: updatedProduct }); // return success and updated product if update operation is successful
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" }); // return error if server error occurs during update operation
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params; // get product id from request parameters

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" }); // return error if product id is invalid
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" }); // return success message if product is deleted successfully
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" }); // return error if server error occurs during deletion operation
  }
};
