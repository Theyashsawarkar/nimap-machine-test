DROP DATABASE machine_test;
CREATE DATABASE machine_test;
USE machine_test;

CREATE TABLE categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

INSERT INTO categories (category_name) 
VALUES 
  ('Electronics'), 
  ('Books'), 
  ('Clothing'), 
  ('Furniture'), 
  ('Toys'), 
  ('Sports'), 
  ('Health'), 
  ('Grocery'), 
  ('Beauty'), 
  ('Organic');

INSERT INTO products (product_name, category_id) 
VALUES
  ('Smartphone', 1),
  ('Laptop', 1),
  ('Headphones', 1),
  ('Smartwatch', 1),
  ('Camera', 1),
  ('Tablet', 1),
  ('Charger', 1),
  ('Phone Case', 1),
  ('Laptop Bag', 1),
  ('Bluetooth Speaker', 1),
  ('Novel', 2),
  ('Magazine', 2),
  ('Comic Book', 2),
  ('Textbook', 2),
  ('Children\'s Book', 2),
  ('Cookbook', 2),
  ('Notebook', 2),
  ('Pen', 2),
  ('T-shirt', 3),
  ('Jeans', 3),
  ('Jacket', 3),
  ('Sweater', 3),
  ('Sneakers', 3),
  ('Hat', 3),
  ('Socks', 3),
  ('Scarf', 3),
  ('Furniture Set', 4),
  ('Chair', 4),
  ('Table', 4),
  ('Couch', 4),
  ('Sofa', 4),
  ('Bookshelf', 4),
  ('Cabinet', 4),
  ('Toys - Car', 5),
  ('Toys - Doll', 5),
  ('Toys - Blocks', 5),
  ('Toys - Stuffed Animal', 5),
  ('Football', 6),
  ('Basketball', 6),
  ('Baseball Bat', 6),
  ('Yoga Mat', 6),
  ('Protein Powder', 7),
  ('Vitamins', 7),
  ('Weight Loss Pills', 7),
  ('Juicer', 7),
  ('Chips', 8),
  ('Juice', 8),
  ('Cereal', 8),
  ('Snacks', 8),
  ('Shampoo', 9),
  ('Conditioner', 9),
  ('Toothpaste', 9),
  ('Vitamins - C', 9),
  ('Organic Apples', 10),
  ('Organic Bananas', 10);
  
  SELECT * FROM categories;
SELECT * FROM products;

