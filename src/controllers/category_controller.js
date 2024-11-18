import db from "../db/connection.js";

// Get all categories with pagination
const fetchAllCategories = (req, res) => {
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
};

// Get a single category by ID
const fetchCategoryWithId = (req, res) => {
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
};

// Add a new category
const addNewCategory = (req, res) => {
  const { category_name } = req.body;
  const query = "INSERT INTO categories (category_name) VALUES (?)";

  db.query(query, [category_name], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error adding category" }); // Send JSON on error
    } else {
      res.status(201).json({ message: "Category added successfully" }); // Send JSON on success
    }
  });
};

// Update a category by ID
const updateCategory = (req, res) => {
  const { category_name } = req.body;
  const query = "UPDATE categories SET category_name = ? WHERE category_id = ?";

  db.query(query, [category_name, req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error updating category" }); // Send error as JSON
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Category not found" }); // Handle not found case
    } else {
      res.status(200).json({ message: "Category updated successfully" }); // Send success as JSON
    }
  });
};

// Delete a category by ID
const deleteCategory = (req, res) => {
  const query = "DELETE FROM categories WHERE category_id = ?";

  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error deleting category" }); // Send error as JSON
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Category not found" }); // Handle not found case
    } else {
      res.status(200).json({ message: "Category deleted successfully" }); // Send success as JSON
    }
  });
};

// Get all products by category
const fetchProductsByCategory = (req, res) => {
  const { categoryId } = req.params;

  const query = `
    SELECT p.product_id as ProductId, p.product_name as ProductName, 
           c.category_name as CategoryName, c.category_id as CategoryId
    FROM products p
    JOIN categories c ON p.category_id = c.category_id
    WHERE p.category_id = ?
  `;

  db.query(query, [categoryId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching products for the category");
    } else if (results.length === 0) {
      res.status(404).send("No products found for this category");
    } else {
      res.json(results);
    }
  });
};

export {
  addNewCategory,
  deleteCategory,
  fetchAllCategories,
  fetchCategoryWithId,
  fetchProductsByCategory,
  updateCategory,
};
