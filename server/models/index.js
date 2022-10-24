import { Sequelize } from "sequelize";
import getRecipeModel from "./recipe";

// Connect to postgres
// https://www.robinwieruch.de/postgres-express-setup-tutorial/
const sequelize = new Sequelize('database', 'username', 'password', {
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  dialect: 'postgres'
});

const models = {
  Recipe: getRecipeModel(sequelize, Sequelize),
}

export { sequelize };
export default models;
