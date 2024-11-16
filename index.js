import app from './src/app.js';  // Import the app from src/app.js

const PORT = 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
