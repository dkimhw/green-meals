
import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import morgan from 'morgan';
import models, { sequelize } from './models/index.js';
import errorHandler from './middleware/error-handler.js';
import recipesRoutes from './routes/recipes.js';
import reviewsRoutes from './routes/reviews.js'
import bodyParser from 'body-parser';
import cors from 'cors';

// Import credentials
dotenv.config({path: '.env'});

// Create express app
const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors()); // Allow cross-origin requests

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/recipes', recipesRoutes);
app.use('/api/reviews', reviewsRoutes);

// Sync DB
// sequelize.sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

// Error handling
app.use(errorHandler);

// sequelize.sync({ force: true }).
const PORT = 5051;
sequelize.sync().then(() => {
  app.listen(5051, () => {
    console.log(`Listening on port ${PORT}!`);
  });
});
