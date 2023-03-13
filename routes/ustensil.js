const express = require('express');
const router = express.Router();
const ustensilCtrl = require('../controllers/ustensil');
const authJWT = require('../middleware/AuthJWT');

router.post('/createustensil', [authJWT.verifytoken], ustensilCtrl.createUstensil);
router.get('/getallustensils', [authJWT.verifytoken], ustensilCtrl.getAllUstensils);

module.exports = router;