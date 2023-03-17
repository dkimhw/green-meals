import express from 'express';
import recipesController from '../controllers/recipes.js';
import multer from 'multer';


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

router.route('/:recipeID').get(recipesController.getRecipe);
router.route('/get').get(recipesController.getRecipes);
router.route('/images').get(recipesController.getRecipeImages);
router.route('/create').post(
  upload.array("images"),
  recipesController.createRecipe
);

export default router;
