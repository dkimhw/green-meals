import express from 'express';
import recipesController from '../controllers/recipes.js';

const router = express.Router();

router.route('/recipes').get(recipesController.index)
router.route('/create-recipes').post(recipesController.createRecipe)

export default router;
