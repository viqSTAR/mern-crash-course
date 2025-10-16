import express from 'express';
import dotenv from 'dotenv';
import path from 'path';


import { connectDB } from './config/db.js';

import productRoutes from './routes/product.route.js';


dotenv.config(); // load environment variables

const app = express(); // initialize Express app
const PORT = process.env.PORT || 5000; // define port

const __dirname = path.resolve(); // get current directory

app.use(express.json()); // middleware to parse JSON data

app.use("/api/products", productRoutes); // import product routes)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  // ✅ Use app.use instead of app.get('*')
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}


app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT); // log server start message
});

