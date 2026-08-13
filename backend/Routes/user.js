const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');

router.post('/', userController.register); 

module.exports = router;