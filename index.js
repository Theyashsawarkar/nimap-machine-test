import dotenv from "dotenv";
import app from './src/app.js'; // Import the app from src/app.js

dotenv.config() ;

const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
