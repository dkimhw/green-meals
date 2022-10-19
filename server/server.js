
import Sequelize from 'sequelize';
import express from 'express';
import dotenv from 'dotenv'

// Import credentials
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({path: '.env'});
}

// Create express app
const app = express();

// Connect to postgres
const sequelize = new Sequelize('database', 'username', 'password', {
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  dialect: 'postgrres'
});
