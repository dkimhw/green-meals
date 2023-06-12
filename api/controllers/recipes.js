import models from '../models/index.js';
import uploadFiles from '../utils/imageUpload.js';
import getImage from '../utils/getImage.js';
import {
  removeDeletedItems,
  updateItems,
  getAllItems,
  cleanIngredientsData,
  cleanInstructionsData,
  cleanRecipeNotesData,
  saveImages,
} from '../utils/recipeControllerHelpers.js'

export const index = async (req, res, next) => {
  const recipesModel = models.Recipe;
  const allRecipes = await recipesModel.findAll({limit: 25});
  res.send(allRecipes)
};

// https://blog.bitsrc.io/pagination-with-sequelize-explained-83054df6e041
export const getRecipes = async (req, res, next) => {
  const recipesModel = models.Recipe;
  let page = req.query.page ? req.query.page : 1;
  let limit = req.query.limit ? req.query.limit : 15;
  let offset = req.query.offset ? req.query.offset : 0;

  const allRecipes = await recipesModel.findAndCountAll({page: page, offset: offset, limit: limit});
  res.send(allRecipes)
};

export const getRecipe = async (req, res, next) => {
  let { recipeID } = req.params;
  const recipesModel = models.Recipe;
  const recipe = await recipesModel.findAll({
    include: [{
      model: models.Ingredient,
      required: false
     }, {
      model: models.Instruction,
      required: false
     }, {
      model: models.RecipeNote,
      required: false
     }],
    where: {
      id: recipeID
    }
  });

  res.send(recipe);
}

export const getRecipeImages = async (req, res, next) => {
  const recipeId = req.query.recipeId
  const recipesModel = models.RecipeImage;
  const images = await recipesModel.findAll({
    where: {
      recipeId: recipeId
    }
  });

  for (let image of images) {
    image.dataValues['s3ImageUrl'] = await getImage(image?.image_key);
  }

  res.send(images);
}

export const updateRecipe = async (req, res) => {
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

  // Look for recipe
  const { recipeID } = req.params;
  const recipe = await models.Recipe.findOne({
    where: {
      id: recipeID
    },
  });

  if (!recipe) throw new Error('Cannot find recipe');

  // Update recipe
  recipe.set({
    recipe_name: recipeName
    , recipe_description: recipeDescription
    , cooking_time: cookingTime
    , cooking_time_qty: cookingTimeQty
    , prep_time: prepTime
    , prep_time_qty: prepTimeQty
    , servings: servingSize
    , recipe_privacy_status: recipePrivacyStatus
  });

  // Update ingredients
  const ingredients = await cleanIngredientsData(recipeIngredients, recipeID);
  const currIngredients = await getAllItems(models.Ingredient, recipeID);
  await removeDeletedItems(ingredients, currIngredients, models.Ingredient);
  await updateItems(models.Ingredient, ingredients, ["ingredient_name", "recipeId"]);

  // Update instructions
  const instructions = await cleanInstructionsData(recipeInstructions, recipeID);
  const currInstructions = await getAllItems(models.Instruction, recipeID);
  await removeDeletedItems(instructions, currInstructions, models.Instruction);
  await updateItems(models.Instruction, instructions, ['instruction_order_number', 'instruction_text', 'recipeId']);

  // Update notes
  const notes = await cleanRecipeNotesData(recipeNoteMessages, recipeNoteTitles, recipeID);
  const currNotes = await getAllItems(models.RecipeNote, recipeID);
  await removeDeletedItems(notes, currNotes, models.RecipeNote);
  await updateItems(models.RecipeNote, notes, ['title', 'text', 'recipeId']);

  // Update images
  // 1. User can delete one of the images
  // 2. User can choose to upload one or more new images
  // 3. User can choose to remove all images
  // The easiest option would be to remove all images we have and upload the new image
  // 1. Add new images to db
  // 2. Remove from s3 unnecessary images; Remove from db
  console.log("check files in req: ", req.files);
  let s3ImageData = await uploadFiles(req, res, recipeID);
  console.log("check s3ImageDate: ", s3ImageData);
  if (!s3ImageData) throw new Error('Could not save the images');
  saveImages(s3ImageData, recipeID);

  // Save recipe
  await recipe.save();

  // Take recipe id
  res.json({ data: recipe });
}

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
  console.log(ingredients);
  ingredients = ingredients.map(ingredient => {
    return {
      ingredient_name: ingredient.ingredient_name,
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
      title: noteTitles[idx]['note_title'],
      text: noteMessages[idx]['note']
    })
  };

  const newRecipe = await models.Recipe.create(
    {
      recipe_name: recipeName
      , recipe_description: recipeDescription
      , cooking_time: cookingTime
      , cooking_time_qty: cookingTimeQty
      , prep_time: prepTime
      , prep_time_qty: prepTimeQty
      , servings: servingSize
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
  createRecipe,
  getRecipeImages,
  updateRecipe,
  getRecipe
}
