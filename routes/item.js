const express = require('express')
const router = express.Router()

const images = require('../middlewares/images')
const upload = images.multer.single('file')
const { authentication, sellerAccess, authorization } = require('../middlewares/index')
const itemController = require('../controllers/itemController')

router.post('/', authentication, sellerAccess, function(req, res, next) {
  upload(req, res, function (err) {
      if (err) {
          res.status(400).json({
              message: err.message
          })
      } else {
          next()
      }
      // Everything went fine.
    })
}, images.sendUploadToGCS, itemController.create)

router.get('/', authentication, sellerAccess, itemController.find)
router.get('/:itemId', authentication, sellerAccess, itemController.findOne)
router.delete('/:itemId', authentication, sellerAccess, authorization,  itemController.delete)
router.put('/:itemId', authentication, sellerAccess, authorization, function(req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            res.status(400).json({
                message: err.message
            })
        } else {
            next()
        }
        // Everything went fine.
      })
  }, images.sendUploadToGCS, itemController.update)

module.exports = router