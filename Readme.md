# Product and Category Manager 🛍️📦

This project allows you to manage categories and products with ease. It supports **CRUD** (Create, Read, Update, Delete) operations for both categories and products. You can also fetch all the products associated with a specific category, making it simple to manage product-category relationships.

## Features ⚙️

- **Category Management**:
  - Add new categories ✏️
  - Update existing categories 🔄
  - Delete categories 🗑️
  - Fetch all categories 📑
  
- **Product Management**:
  - Add new products 🛒
  - Assign products to categories 📦
  - Update product details ✏️
  - Delete products 🗑️
  - Fetch all products for a specific category 🔍

- **Pagination**:
  - Navigate through categories and products with pagination 🔄

## Tech Stack 💻

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Database**: MySQL
## API Endpoints 📡

- **Categories**:
  - `GET /api/categories` - Fetch all categories
  - `POST /api/categories` - Create a new category
  - `PUT /api/categories/:id` - Update a category
  - `DELETE /api/categories/:id` - Delete a category

- **Products**:
  - `GET /api/products` - Fetch all products
  - `POST /api/products` - Create a new product
  - `PUT /api/products/:id` - Update a product
  - `DELETE /api/products/:id` - Delete a product
  - `GET /api/products/category/:categoryId` - Fetch all products for a specific category




