
import { body, validationResult } from 'express-validator';

export const recipeFormValidationRules = () => {
  return [
    // recipe name
    body('recipeName')
      .exists().withMessage('Recipe name is required.')
      .isString()
      .notEmpty()
      .isLength({ min: 2 }).withMessage('Recipe name is not long enough - must be at least two characters long.'),

    // recipe description
    body('recipeDescription')
      .exists().withMessage('Recipe description is required.')
      .isString()
      .notEmpty()
      .isLength({ min: 2 }).withMessage('Recipe description is not long enough - must be at least two characters long.'),

    // serving size
    body('servingSize')
      .exists().withMessage('Serving size is required.')
      .isFloat({ min: 1 }).withMessage('Must be a value greater than 0.'),

    // cooking time
    body('cookingTime')
      .exists().withMessage('Cooking time is required.')
      .isFloat({ min: 1 }).withMessage('Must be a value greater than 0.'),

    // cooking time quantity
    body('cookingTimeQty')
      .exists().withMessage('Cooking time quantity is required.')
      .isString().withMessage('Cooking time quantity must be a string')
      .isIn('minutes', 'hours', 'days').withMessage('Must choose a valid cooking time quantity.'),

    // prep time
    body('prepTime')
      .exists().withMessage('Prep time is required.')
      .isFloat({ min: 1 }).withMessage('Must be a value greater than 0.'),

    // prep time qty
    body('prepTimeQty')
      .exists().withMessage('Prep time quantity is required.')
      .isString().withMessage('Prep time quantity must be a string')
      .isIn('minutes', 'hours', 'days').withMessage('Must choose a valid prep time quantity.'),

    // recipe ingredients
    body('recipeIngredients')
      .isArray().withMessage('Ingredient must be an array'),
    body('recipeIngredients.*.ingredient_name')
      .isString().withMessage('Ingredient value must be a string.')
      .isLength({ min: 2 }).withMessage('Ingredient value is not long enough. Must be at least two characters long.'),

    // recipe instructions
    body('recipeInstructions')
      .isArray().withMessage('Instruction must be an array'),
    body('recipeInstructions.*.instruction_text')
      .isString().withMessage('Instruction value must be a string')
      .isLength({ min: 2 }).withMessage('Instruction value is not long enough. Must be at least two characters long.'),

    // recipe titles
    body('recipeNoteTitles')
      .isArray().withMessage('Note titles must be an array'),
    body('recipeNoteTitles.*.title')
      .isString().withMessage('Note title value must be a string')
      .isLength({ min: 2 }).withMessage('Note title value is not long enough. Must be at least two characters long.'),

    // recipe messages
    body('recipeNoteMessages')
      .isArray().withMessage('Note messages must be an array'),
    body('recipeNoteMessages.*.note')
      .isString().withMessage('Note message value must be a string')
      .isLength({ min: 2 }).withMessage('Note message value is not long enough. Must be at least two characters long.')
  ];
};

export const validate = (req, res, next) => {
  console.log("validate here");
  console.log(req.body['recipeIngredients']);
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  console.log(errors);
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
};
