import express from "express";
import {
  addNewProduct,
  deleteProduct,
  fetchAllProducts,
  fetchProductWithId,
  updateProduct,
} from "../controllers/product_controller.js";

const router = express.Router();

// Get all products with pagination
router.get("/", fetchAllProducts);

// Get a single product by ID
router.get("/:id", fetchProductWithId);

// Add a new product
router.post("/", addNewProduct);

// Update a product by ID
router.put("/:id", updateProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

export default router;
