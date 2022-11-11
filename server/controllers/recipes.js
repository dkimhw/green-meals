import models from '../models/index.js';

export const index = async (req, res, next) => {
  const recipesModel = models.Recipe;
  const allRecipes = await recipesModel.findAll();
  console.log(allRecipes);
  res.send(allRecipes)
};

export const createRecipe = async (req, res) => {
  console.log("request body", req.body);
  const { recipeName, recipeDescription, recipeIngredients } = req.body;
  const recipe = {
    recipe_name: recipeName,
    recipe_description: recipeDescription,
  }

  // Save recipe data
  const ingredients = recipeIngredients.map(ingredient => {
    return {
      ingredient_name: ingredient.ingredient_name,
    }
  });

  console.log("Ingredients: ", ingredients);

  await models.Recipe.create(
    {
      recipe_name: recipeName
      , recipe_description: recipeDescription
      , ingredients: ingredients
    },
    {
      include: [models.Ingredient]
    }
  )

  res.json({ message: "Recipe saved!" });
}



export default {
  index,
  createRecipe
}
