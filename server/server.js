
import express from 'express';
import dotenv from 'dotenv'
import models, { sequelize } from './models/index.js';
import recipesRoutes from './routes/recipes.js';

// Import credentials
dotenv.config({path: '.env'});


// Create express app
const app = express();

// Parse body
app.use(express.urlencoded({ extended: true })); // Tells Express to parse the post request body data


// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Recipes Routes
app.use('/', recipesRoutes);

// Sync DB
sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const PORT = process.env.PORT;
app.listen(5051, () => {
  console.log(`Listening on port ${5051}!`);
});
// Connect to database
// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}!`);
//   });
// });
