import models from '../models/index.js';

export const index = async (req, res, next) => {
  const recipesModel = models.Recipe;
  const allRecipes = await recipesModel.findAll();
  console.log(allRecipes);
  res.send(allRecipes)
};

export const createRecipe = async (req, res) => {
  console.log("request body", req.query);
  const { recipeName, recipeDescription } = req.query;
  const recipe = {
    recipe_name: recipeName,
    recipe_description: recipeDescription,
  }
  const recipesModel = models.Recipe;
  const newRecipe = await recipesModel.create(recipe);
  res.send(newRecipe);
}

export default {
  index,
  createRecipe
}
