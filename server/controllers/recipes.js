import models from '../models/index.js';

export const index = async (req, res, next) => {
  const recipesModel = models.Recipe;
  const allRecipes = await recipesModel.findAll();
  console.log(allRecipes);
  res.send(allRecipes)
};

export const createRecipe = async (req, res) => {
  console.log("request body", req.body);
  const { recipeName, recipeDescription, recipeIngredients, recipeInstructions } = req.body;

  const ingredients = recipeIngredients.map(ingredient => {
    return {
      ingredient_name: ingredient.ingredient_name,
    }
  });

  const instructions = recipeInstructions.map(instruction => {
    return {
      instruction_order_number: instruction.order,
      instruction_text: instruction.instruction
    }
  });

  const newRecipe = await models.Recipe.create(
    {
      recipe_name: recipeName
      , recipe_description: recipeDescription
      , ingredients: ingredients
    }, {
      include: [models.Ingredient]
    }
  );

  await models.Instruction.bulkCreate(
    instructions.map(instruction => {
      return {
        instruction_order_number: instruction.instruction_order_number,
        instruction_text: instruction.instruction_text,
        recipe_id: newRecipe.id
      }
    })
  );

  res.json({ message: "Recipe saved!" });
}



export default {
  index,
  createRecipe
}
