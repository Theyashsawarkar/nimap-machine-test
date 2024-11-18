import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import categoryRoutes from './routes/category.js';  // Import routes
import productRoutes from './routes/product.js';    // Import routes

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('src/views'));

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Backend!');
});

// API routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

export default app;
