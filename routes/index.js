const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('testing route express')
});

router.post('/login', userController.loginUser)
router.post('/register', userController.registerUser)

module.exports = router;
