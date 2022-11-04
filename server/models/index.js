import { Sequelize } from "sequelize";
import getRecipeModel from "./recipe.js";
import dotenv from 'dotenv'


dotenv.config();

// Connect to postgres
// https://www.robinwieruch.de/postgres-express-setup-tutorial/
console.log(process.env.HOST);
const sequelize = new Sequelize(process.env.DB, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres',
  database: process.env.DB,
  schema: process.env.SCHEMA,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const models = {
  Recipe: getRecipeModel(sequelize, Sequelize),
}

export { sequelize };
export default models;
