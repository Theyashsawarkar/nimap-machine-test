import db from "../db/connection.js";

// Get all products with pagination and render a view
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
      // Pass data to the view
      res.render("products", {
        products: results,
        page,
        pageSize
      });
    }
  });
};

// Get a single product by ID and render the details view
const fetchProductWithId = (req, res) => {
  const query = `
    SELECT p.product_id as ProductId, p.product_name as ProductName, 
           c.category_name as CategoryName, c.category_id as CategoryId
    FROM products p 
    JOIN categories c ON p.category_id = c.category_id
    WHERE p.product_id = ?;
  `;

  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching product");
    } else if (results.length === 0) {
      res.status(404).send("Product not found");
    } else {
      // Pass the product data to the EJS view
      res.render("product", { product: results[0] });
    }
  });
};

// Add a new product
const addNewProduct = (req, res) => {
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
      res.status(500).send("Error deleting product");
    } else if (results.affectedRows === 0) {
      res.status(404).send("Product not found");
    } else {
      res.send("Product deleted successfully");
    }
  });
};

export {
  addNewProduct,
  deleteProduct,
  fetchAllProducts,
  fetchProductWithId,
  updateProduct
};

