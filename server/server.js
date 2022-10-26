
import express from 'express';
import dotenv from 'dotenv'
import models, { sequelize } from './models';

// Import credentials
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({path: '.env'});
}

// Create express app
const app = express();

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = 5050;
// Connect to database
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
  });
});
