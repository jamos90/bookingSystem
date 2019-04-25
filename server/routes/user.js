const express = require('express');
const userController = require('../controllers/user.controller')
const router = express.Router();
const rental = require('../models/rental');

router.post('/auth', userController.auth());

router.post('/register', userController.register());

module.exports = router;