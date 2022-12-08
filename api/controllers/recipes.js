import models from '../models/index.js';
import uploadFile from '../utils/imageUpload.js';

export const index = async (req, res, next) => {
  const recipesModel = models.Recipe;
  const allRecipes = await recipesModel.findAll();
  console.log(allRecipes);
  res.send(allRecipes)
};

export const createRecipe = async (req, res) => {
  // console.log("request body", req.body);
  // Parse request body
  const {
    recipeName
    , recipeDescription
    , cookingTime
    , cookingTimeQty
    , prepTime
    , prepTimeQty
    , servingSize
    , recipePrivacyStatus
    , recipeIngredients
    , recipeInstructions
    , recipeNotes
  } = req.body;

  // Parse directions, ingredients, and notes for bulk create
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

  const notes = recipeNotes.map(note => {
    return {
      title: note.noteTitle,
      text: note.note
    }
  });

  const newRecipe = await models.Recipe.create(
    {
      recipe_name: recipeName
      , recipe_description: recipeDescription
      , cooking_time: cookingTime
      , cooking_time_qty: cookingTimeQty
      , prep_time: prepTime
      , prep_time_qty: prepTimeQty
      , serving_size: servingSize
      , recipe_privacy_status: recipePrivacyStatus
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

  await models.RecipeNote.bulkCreate(
    notes.map(note => {
      return {
        title: note.title,
        text: note.text,
      }
    })
  );

  // Upload image file
  // let s3Data = await uploadFile(req, res);
  // console.log("Request data: ", req.file);
  // let imageKey = s3Data.Key;
  // console.log(imageKey);

  res.json({ message: "Recipe saved!" });
}



export default {
  index,
  createRecipe
}
