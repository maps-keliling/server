const { verifyToken } = require('../helpers')
const User = require('../models/User')

module.exports = {
  authentication(req, res, next) {
    let token = req.headers.auth
    verifyToken(token, function(err, result){
      if (err) {
        res.status(400).json({
            message: err.message
        })
      } else {
        User.findOne({
          username: result.username
        })
          .then((result) => {
            if(!result) {
              res.status(400).json({
                message: 'User not found!'
              })
            } else {
              req._currentUser = result
              next()
            }
          }).catch((err) => {
            res.status(400).json({
                message: err.message,
            })
          });
      }
    })
  },
  sellerAccess(req, res, next) {
    const user = req._currentUser

    if (user.role === 'seller') {
      next()
    } else {
      res.status(400).json({
        message: 'you are not authorized to access'
      })
    }
  },
  authorization(req, res, next) {
    const user = req._currentUser
    const itemId = req.params.itemId
    // if () 
  }
}