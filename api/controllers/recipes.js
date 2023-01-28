import models from '../models/index.js';
import uploadFiles from '../utils/imageUpload.js';

export const index = async (req, res, next) => {
  const recipesModel = models.Recipe;
  const allRecipes = await recipesModel.findAll({limit: 25});
  console.log(allRecipes);
  res.send(allRecipes)
};

// https://blog.bitsrc.io/pagination-with-sequelize-explained-83054df6e041
export const getRecipes = async (req, res, next) => {
  const recipesModel = models.Recipe;
  let page = req.query.page;
  let limit = req.query.limit;
  let offset = req.query.offset;

  const allRecipes = await recipesModel.findAll({page: page, limit: limit, offset: offset});
  console.log(allRecipes);
  res.send(allRecipes)
};

// This needs to be improved - should be able to use just one create method to insert everything
export const createRecipe = async (req, res) => {
  // Parse request body
  let {
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
    , recipeNoteTitles
    , recipeNoteMessages
  } = req.body;

  // Parse directions, ingredients, and notes for bulk create
  let ingredients = JSON.parse(recipeIngredients);
  ingredients = ingredients.map(ingredient => {
    return {
      ingredient_name: ingredient.ingredientName,
    }
  });

  let instructions = JSON.parse(recipeInstructions);
  instructions = instructions.map((instruction, idx) => {
    return {
      instruction_order_number: idx + 1,
      instruction_text: instruction.instruction
    }
  });

  let noteTitles = JSON.parse(recipeNoteTitles);
  let noteMessages = JSON.parse(recipeNoteMessages);

  let notes = [];
  for (let idx = 0; idx < noteTitles.length; idx += 1) {
    console.log(noteTitles[idx]);
    console.log("Check: ", noteMessages[idx]);
    notes.push({
      title: noteTitles[idx]['noteTitle'],
      text: noteMessages[idx]['note']
    })
  };

  // recipeNoteMessages

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

  // console.log("newRecipe: ", newRecipe);
  // console.log("newRecipe id: ", newRecipe.dataValues.id);
  // console.log("newRecipe id2: ", newRecipe.id);

  await models.Instruction.bulkCreate(
    instructions.map(instruction => {
      return {
        instruction_order_number: instruction.instruction_order_number,
        instruction_text: instruction.instruction_text,
        recipeId: newRecipe.dataValues.id
      }
    })
  );

  await models.RecipeNote.bulkCreate(
    notes.map(note => {
      return {
        title: note.title,
        text: note.text,
        recipeId: newRecipe.dataValues.id,
      }
    })
  );

  // Upload image file
  // let s3Data = await uploadFile(req, res);
  console.log("req.files", req.files);
  let s3ImageData = await uploadFiles(req, res, newRecipe.dataValues.id);
  console.log("recipe.js: ", s3ImageData);

  await models.RecipeImage.bulkCreate(
    s3ImageData.map(image => {
      return {
        image_key: image.Key,
        recipeId: newRecipe.dataValues.id,
      }
    })
  );


  res.json({ message: "Recipe saved!" });
}



export default {
  getRecipes,
  createRecipe
}
