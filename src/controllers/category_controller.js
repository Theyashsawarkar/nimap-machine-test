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
      // Query to get the total number of categories for pagination
      const countQuery = "SELECT COUNT(*) AS total FROM categories";
      
      db.query(countQuery, (err, countResult) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error fetching category count");
        } else {
          const totalCategories = countResult[0].total;
          const totalPages = Math.ceil(totalCategories / pageSize);

          // Render the categories view and pass categories, page, and pagination info
          res.render('categories', {
            categories: results,
            page: page,
            pageSize: pageSize,
            totalPages: totalPages,
            totalCategories: totalCategories
          });
        }
      });
    }
  });
};


// Get a single category by ID and render the category view
const fetchCategoryWithId = (req, res) => {
  const query = "SELECT * FROM categories WHERE category_id = ?";

  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching category");
    } else if (results.length === 0) {
      res.status(404).send("Category not found");
    } else {
      // Render the category.ejs view and pass the category data
      res.render('category', { category: results[0] });
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
      res.status(500).send("Error adding category");
    } else {
      res.status(201).send("Category added successfully");
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
      res.status(500).send("Error updating category");
    } else if (results.affectedRows === 0) {
      res.status(404).send("Category not found");
    } else {
      res.send("Category updated successfully");
    }
  });
};

// Delete a category by ID
const deleteCategory = (req, res) => {
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
};

// Get all products by category and render the view
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
      // Render the view with an empty products array and category name
      res.render('productsByCategory', { category_name: "Unknown Category", products: [] });
    } else {
      // Get the category name from the first result
      const categoryName = results[0].CategoryName;

      // Render the view with the category name and products
      res.render('productsByCategory', { category_name: categoryName, products: results });
    }
  });
};


export {
  addNewCategory,
  deleteCategory,
  fetchAllCategories,
  fetchCategoryWithId,
  fetchProductsByCategory,
  updateCategory
};

