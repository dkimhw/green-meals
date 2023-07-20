
import { body, validationResult } from 'express-validator';

export const recipeFormValidationRules = () => {
  console.log("recipeFormValidationRules here");
  return [
    // recipe name
    body('recipeName')
      .exists().withMessage('Recipe name is required.')
      .isString()
      .notEmpty(),

    // recipe description
    body('recipeDescription')
      .exists().withMessage('Recipe description is required.')
      .isString()
      .notEmpty(),

    // // cooking time
    // body('cookingTime')
    //   .isFloat({ min: 0 }),

    // // cooking time quantity
    // body('cookingTimeQty')
    //   .exists().withMessage('Cooking time quantity is required.')
    //   .isString().withMessage('Cooking time quantity must be a string')
    //   .isIn('minutes', 'hours', 'days').withMessage('Must choose a valid cooking time quantity.')
  ];
};

export const validate = (req, res, next) => {
  console.log("validate here");
  console.log(req.param);
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
