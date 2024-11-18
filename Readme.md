# Product and Category Manager 🛍️📦

This is a backend Node.js Express application that returns server-rendered HTML files. The HTML files are dynamic in nature, providing a seamless experience for managing products and categories. It supports CRUD (Create, Read, Update, Delete) operations for both categories and products. You can also fetch all the products associated with a specific category, making it simple to manage product-category relationships.

## Features ⚙️

- **Category Management**:
  - Add new categories ✏️
  - Update existing categories 🔄
  - Delete categories 🗑️
  - Fetch all categories 📑
  
  [Watch Category Management Video](https://github.com/user-attachments/assets/8faf29ce-f93b-4c3d-a39f-6809dde92604)

- **Product Management**:
  - Add new products 🛒
  - Assign products to categories 📦
  - Update product details ✏️
  - Delete products 🗑️
  
  [Watch Product Management Video](https://github.com/user-attachments/assets/990b9ed2-c6f4-4367-ba20-ca15106f9d69)
    
- **Fetch all products for a specific category** 🔍
  
  [Watch Fetch Products by Category Video](https://github.com/user-attachments/assets/202c64c9-8e26-4bf9-abf3-bad69c3443fb)

- **Pagination**:
  - Navigate through categories and products with pagination 🔄

## Backend Routes and Functionality

### Products Routes

| **Route**           | **HTTP Method** | **Functionality**                  | **Parameters**                                                                                       | **Source**   |
| ------------------- | --------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------ |
| `/api/products`     | `GET`           | Fetch all products with pagination | **Query**: `page` (optional, number), `pageSize` (optional, number)                                  | Query Params |
| `/api/products/:id` | `GET`           | Fetch a specific product by its ID | **Path**: `id` (required, product ID)                                                                | Path Param   |
| `/api/products`     | `POST`          | Add a new product                  | **Body**: `product_name` (string), `category_id` (number)                                            | JSON Body    |
| `/api/products/:id` | `PUT`           | Update an existing product         | **Path**: `id` (required, product ID) <br> **Body**: `product_name` (string), `category_id` (number) | Path + JSON  |
| `/api/products/:id` | `DELETE`        | Delete a product by its ID         | **Path**: `id` (required, product ID)                                                                | Path Param   |

---

### Categories Routes

| **Route**                      | **HTTP Method** | **Functionality**                          | **Parameters**                                                                 | **Source**   |
| ------------------------------ | --------------- | ------------------------------------------ | ------------------------------------------------------------------------------ | ------------ |
| `/api/categories`              | `GET`           | Fetch all categories with pagination       | **Query**: `page` (optional, number), `pageSize` (optional, number)            | Query Params |
| `/api/categories/:id`          | `GET`           | Fetch a specific category by its ID        | **Path**: `id` (required, category ID)                                         | Path Param   |
| `/api/categories`              | `POST`          | Add a new category                         | **Body**: `category_name` (string)                                             | JSON Body    |
| `/api/categories/:id`          | `PUT`           | Update an existing category                | **Path**: `id` (required, category ID) <br> **Body**: `category_name` (string) | Path + JSON  |
| `/api/categories/:id`          | `DELETE`        | Delete a category by its ID                | **Path**: `id` (required, category ID)                                         | Path Param   |
| `/api/categories/category/:id` | `GET`           | Fetch all products for a specific category | **Path**: `id` (required, category ID)                                         | Path Param   |

---

## Notes

- **Pagination**: Both `products` and `categories` support pagination using optional `page` and `pageSize` query parameters.
- **Parameter Handling**:
  - **Path Parameters**: For resource identification, e.g., `:id`.
  - **Query Parameters**: For filtering or pagination, e.g., `page`, `pageSize`.
  - **JSON Body**: For creating or updating resources.

## Tech Stack 💻

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Database**: MySQL

