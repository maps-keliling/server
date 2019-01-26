const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const images = require('../middlewares/images')
const upload = images.multer.single('file')
const { authentication } = require('../middlewares/index')

router.post('/addPhoto',authentication, function(req, res, next) {
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
},images.sendUploadToGCS, userController.addPhoto)
router.get('/test', (req, res) => res.json('testing router'))

module.exports = router