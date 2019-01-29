const { verifyToken } = require('../helpers')
const User = require('../models/User')
const Shop = require('../models/Shop')
const Item  = require('../models/Item')
const mongoose = require('mongoose')

module.exports = {
  authentication(req, res, next) {
    let token = req.headers.auth
    verifyToken(token, function(err, result){
      if (err) {
        res.status(400).json({
            message: "Need login access for this action"
        })
      } else {
        User.findOne({
          username: result.username
        })
          .then((result) => {
            if(!result) {
              throw new Error('User not found!')
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
        message: 'You are not authorized to access'
      })
    }
  },
  authorization(req, res, next) {
    const user = req._currentUser
    const shopId = req.params.shopId
    const itemId = req.params.itemId

    if (shopId) {
      User.findOne({
        _id: user._id,
        shopId: shopId
      })
        .then((result) => {
          if (result) {
            next()
          } else {
            throw new Error('You are not authorized to access')
          }
        }).catch((err) => {
          res.status(400).json({message: err.message})
        });
    } else {
      User.findOne({
        _id: user._id
      }).populate('shopId')
        .then((result) => {
          const listItem = result.shopId.itemList
          let itemFounded = false

          listItem.forEach(each => {
            if ((''+each) === (''+itemId)) {
              itemFounded = true
            }
          })
          if (itemFounded) {
            next()
          } else {
            throw new Error('You are not authorized to access')
            // res.status(400).json({
            //   message: 'You are not authorized to access',
            // })
          }
        }).catch((err) => {
          res.status(400).json({message: err.message})
        });
    }
    
   
  }
}