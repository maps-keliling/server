const express = require('express')
const route = express.Router()
const shopController = require('../controllers/shopController')
const { authentication, sellerAccess, authorization } = require('../middlewares/index')

route.post('/', authentication, sellerAccess, shopController.create)
route.get('/:shopId', shopController.findOne)
route.get('/', shopController.find)
route.put('/:shopId', authentication, sellerAccess, authorization, shopController.update)

module.exports = route