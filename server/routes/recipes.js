import express from 'express';
import recipesController from '../controllers/recipes.js';

const router = express.Router();

router.route('/getAll').get(recipesController.index)
router.route('/create').post(recipesController.createRecipe)

export default router;
