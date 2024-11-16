import express from "express";
import {
  addNewCategory,
  deleteCategory,
  fetchAllCategories,
  fetchCategoryWithId,
  fetchProductsByCategory,
  updateCategory,
} from "../controllers/category_controller.js";

const router = express.Router();

// Get all categories with pagination
router.get("/", fetchAllCategories);

// Get a single category by ID
router.get("/:id", fetchCategoryWithId);

// Add a new category
router.post("/", addNewCategory);

// Update a category by ID
router.put("/:id", updateCategory);

// Delete a category by ID
router.delete("/:id", deleteCategory);

// Get all products by category
router.get("/category/:categoryId", fetchProductsByCategory);

export default router;
