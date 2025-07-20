const express = require('express');
const { registerUser } = require('/home/felipe-costa/Documents/Estudos/site/controllers/userController.js');
const router = express.Router();

router.post('/register', registerUser);

module.exports = router;