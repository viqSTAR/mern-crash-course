import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router(); // Importing the Router from Express module

router.get("/", getProducts); // get all products endpoint

router.post("/", createProduct);

router.put("/:id", updateProduct); // implement update product endpoint

router.delete("/:id", deleteProduct); // implement delete product endpoint

export default router; // Exporting the router
