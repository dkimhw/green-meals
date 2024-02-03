import { Sequelize } from "sequelize";
import getRecipeModel from "./recipe.js";
import getIngredientModel from "./ingredient.js";
import getInstructionModel from "./instruction.js";
import getRecipeNoteModel from "./note.js";
import getRecipeImageModel from "./image.js"
import getReviewModel from "./review.js";
import dotenv from 'dotenv'


dotenv.config();
// Connect to postgres
// https://www.robinwieruch.de/postgres-express-setup-tutorial/
// https://stackoverflow.com/questions/58470439/sequelize-how-to-design-one-to-one-association
const sequelize = new Sequelize(process.env.DB, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres',
  database: process.env.DB,
  schema: process.env.SCHEMA,
  port: process.env.PORT,
  dialectOptions: {
    ssl: {
        rejectUnauthorized: false
    }
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const models = {
  Recipe: getRecipeModel(sequelize, Sequelize),
  Ingredient: getIngredientModel(sequelize, Sequelize),
  Instruction: getInstructionModel(sequelize, Sequelize),
  RecipeNote: getRecipeNoteModel(sequelize, Sequelize),
  RecipeImage: getRecipeImageModel(sequelize, Sequelize),
  Review: getReviewModel(sequelize, Sequelize),
}

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;
