const express = require('express');
const router = express.Router();
const recipeCtrl = require('../controllers/recipe');
const authJWT = require('../middleware/AuthJWT');

router.post('/createrecipe', [authJWT.verifytoken], recipeCtrl.createRecipe);
router.get('/allrecipes', [authJWT.verifytoken], recipeCtrl.getAllRecipes);
router.get('/:id', [authJWT.verifytoken], recipeCtrl.getOneRecipe);
router.delete('/delete/:id', [authJWT.verifytoken], recipeCtrl.deleteRecipe);
router.patch('/updatelike/:id', [authJWT.verifytoken], recipeCtrl.updateLikeRecipe);


module.exports = router;