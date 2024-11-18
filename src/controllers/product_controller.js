import db from "../db/connection.js";

// Get all products with pagination
const fetchAllProducts = (req, res) => {
  // Get page and pageSize from query parameters, default to 1 and 10 respectively
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  // Query to fetch products with pagination
  const query = `
    SELECT p.product_id as ProductId, p.product_name as ProductName, 
           c.category_name as CategoryName, c.category_id as CategoryId
    FROM products p 
    JOIN categories c ON p.category_id = c.category_id
    LIMIT ?, ?
  `;

  db.query(query, [offset, pageSize], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching products");
    } else {
      res.json(results);
    }
  });
};

// Get a single product by ID
const fetchProductWithId = (req, res) => {
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
};

// Add a new product
const addNewProduct = (req, res) => {
  const { product_name, category_id } = req.body;
  console.log(req.body); // Log the incoming request body for debugging
  const query = "INSERT INTO products (product_name, category_id) VALUES (?, ?)";

  db.query(query, [product_name, category_id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error adding product" });
    } else {
      res.status(201).json({ message: "Product added successfully" });
    }
  });
};

// Update a product by ID
const updateProduct = (req, res) => {
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
};

// Delete a product by ID
const deleteProduct = (req, res) => {
  const query = "DELETE FROM products WHERE product_id = ?";

  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error deleting product" }); // Send JSON response with error
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "Product not found" }); // Send JSON response with message
    } else {
      res.status(200).json({ message: "Product deleted successfully" }); // Send JSON response with success message
    }
  });
};

export {
  addNewProduct,
  deleteProduct,
  fetchAllProducts,
  fetchProductWithId,
  updateProduct,
};
