import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// Get all products
router.get("/", (req, res) => {
  const query = ` SELECT p.product_id as ProductId, p.product_name as ProductName, 
c.category_name as CategoryName, c.category_id as CategoryId
FROM products p 
JOIN categories c ON p.category_id = c.category_id ;`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching products");
    } else {
      res.json(results);
    }
  });
});

// Get a single product by ID
router.get("/:id", (req, res) => {
  const query = `SELECT p.product_id as ProductId, p.product_name as ProductName, 
c.category_name as CategoryName, c.category_id as CategoryId
FROM products p 
JOIN categories c ON p.category_id = c.category_id where p.product_id = ? ;`;

  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching product");
    } else if (results.length === 0) {
      res.status(404).send("Product not found");
    } else {
      res.json(results[0]);
    }
  });
});

// Add a new product
router.post("/", (req, res) => {
  const { product_name, category_id } = req.body;
  const query =
    "INSERT INTO products (product_name, category_id) VALUES (?, ?)";

  db.query(query, [product_name, category_id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error adding product");
    } else {
      res.status(201).send("Product added successfully");
    }
  });
});

// Update a product by ID
router.put("/:id", (req, res) => {
  const { product_name, category_id } = req.body;
  const query =
    "UPDATE products SET product_name = ?, category_id = ? WHERE product_id = ?";

  db.query(
    query,
    [product_name, category_id, req.params.id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating product");
      } else if (results.affectedRows === 0) {
        res.status(404).send("Product not found");
      } else {
        res.send("Product updated successfully");
      }
    }
  );
});

// Delete a product by ID
router.delete("/:id", (req, res) => {
  const query = "DELETE FROM products WHERE product_id = ?";

  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting product");
    } else if (results.affectedRows === 0) {
      res.status(404).send("Product not found");
    } else {
      res.send("Product deleted successfully");
    }
  });
});

export default router;
