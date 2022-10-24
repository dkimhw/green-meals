
import Sequelize from 'sequelize';
import express from 'express';
import dotenv from 'dotenv'

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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
