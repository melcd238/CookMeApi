const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/register', userCtrl.signUp);
router.post('/login', userCtrl.login);


module.exports = router;