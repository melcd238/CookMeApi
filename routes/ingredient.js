const express = require('express');
const router = express.Router();
const ingredientCtrl = require('../controllers/ingredient');
const authJWT = require('../middleware/AuthJWT');

router.post('/createingredient', [authJWT.verifytoken], ingredientCtrl.createIngredient);
router.get('/getallingredients', [authJWT.verifytoken], ingredientCtrl.getAllIngredients);


module.exports = router;