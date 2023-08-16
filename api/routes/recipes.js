import express from 'express';
import recipesController from '../controllers/recipes.js';
import multer from 'multer';
import { recipeFormValidationRules, validate } from '../utils/validator.js';
import { parseJSONString } from '../middleware/parseJSONString.js';

const router = express.Router();

// Add storage for image upload
const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, '')
  }
});

// file.mimetype == "image/png"
// Defines filefilter for what image types are allowed to be uploaded
const imageFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      cb(null, true)
  } else {
      cb(null, false)
  }
};

// Defines the upload variable for the configuration of photo being uploaded
const upload = multer({ storage: storage, fileFilter: imageFilter });

router.route('/get').get(recipesController.getRecipes);
router.route('/get/:recipeID').get(recipesController.getRecipe);
router.put(
  '/edit/:recipeID',
  upload.array("images"),
  parseJSONString,
  recipeFormValidationRules(),
  validate,
  recipesController.updateRecipe
);
router.route('/delete/:recipeId').delete(recipesController.deleteRecipe)
router.route('/images').get(recipesController.getRecipeImages);
router.post(
  '/create',
  upload.array("images"),
  parseJSONString,
  recipeFormValidationRules(),
  validate,
  recipesController.createRecipe
);


export default router;
