
import express from 'express';
import dotenv from 'dotenv'
import models, { sequelize } from './models/index.js';
import recipesRoutes from './routes/recipes.js';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import credentials
dotenv.config({path: '.env'});

// Create express app
const app = express();

// Middlewares
// app.use(express.urlencoded({ extended: true })); // Tells Express to parse the post request body data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors()); // Allow cross-origin requests

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Recipes Routes
app.use('/api/recipes', recipesRoutes);

// Sync DB
// sequelize.sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

// force: true
const PORT = process.env.PORT;
sequelize.sync({ force: true }).then(() => {
  app.listen(5051, () => {
    console.log(`Listening on port ${PORT}!`);
  });
});
