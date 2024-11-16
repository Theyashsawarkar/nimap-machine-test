import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// Get all categories with pagination
router.get("/", (req, res) => {
  // Get page and pageSize from query parameters, default to 1 and 10 respectively
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  // Query to fetch categories with pagination
  const query = "SELECT * FROM categories LIMIT ?, ?";

  db.query(query, [offset, pageSize], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching categories");
    } else {
      res.json(results);
    }
  });
});

// Get a single category by ID
router.get("/:id", (req, res) => {
  const query = "SELECT * FROM categories WHERE category_id = ?";

  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching category");
    } else if (results.length === 0) {
      res.status(404).send("Category not found");
    } else {
      res.json(results[0]);
    }
  });
});

// Add a new category
router.post("/", (req, res) => {
  const { category_name } = req.body;
  const query = "INSERT INTO categories (category_name) VALUES (?)";

  db.query(query, [category_name], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error adding category");
    } else {
      res.status(201).send("Category added successfully");
    }
  });
});

// Update a category by ID
router.put("/:id", (req, res) => {
  const { category_name } = req.body;
  const query = "UPDATE categories SET category_name = ? WHERE category_id = ?";

  db.query(query, [category_name, req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating category");
    } else if (results.affectedRows === 0) {
      res.status(404).send("Category not found");
    } else {
      res.send("Category updated successfully");
    }
  });
});

// Delete a category by ID
router.delete("/:id", (req, res) => {
  const query = "DELETE FROM categories WHERE category_id = ?";

  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting category");
    } else if (results.affectedRows === 0) {
      res.status(404).send("Category not found");
    } else {
      res.send("Category deleted successfully");
    }
  });
});

export default router;
