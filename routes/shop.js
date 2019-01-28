const express = require('express')
const route = express.Router()
const shopController = require('../controllers/shopController')
const { authentication, sellerAccess } = require('../middlewares/index')

route.post('/', authentication, sellerAccess, shopController.create)

module.exports = route