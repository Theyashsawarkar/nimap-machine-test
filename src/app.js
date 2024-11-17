import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import categoryRoutes from './routes/category.js'; // Import routes
import productRoutes from './routes/product.js'; // Import routes

const app = express();

// ES Module workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
  res.render('index', { title: 'My App', body: 'content' });
});


// API routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

export default app;
