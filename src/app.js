import express from 'express';
import categoryRoutes from './routes/category.js'; // Import routes
import productRoutes from './routes/product.js'; // Import routes

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(express.static('src/views')); // Serves static files

// API routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

export default app;
