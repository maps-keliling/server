const Shop = require('../models/Shop')
const User = require('../models/User')
const mongoose = require('mongoose')

class shopController {
  static create(req, res) {
    const id = mongoose.Types.ObjectId();
    const user = req._currentUser

    Shop.create({
      _id: id,
      brand: req.body.brand
    })
      .then((result) => {
        return User.findOneAndUpdate({
          _id: user._id
        }, {
          shopId: id
        }, {
          new: true
        }).populate('shopId')
      })
      .then((result_user) => {
        res.status(200).json(result_user)
      })
      .catch((err) => {
        res.status(400).json(err.errors)
      });
  }

  static findOne(req, res) {
    Shop.findOne({
      _id: req.params.shopId
    }).populate('itemList')
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(400).json(err.errors)
      });
  }
  
  static find(req, res) {
    Shop.find().populate('itemList')
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(400).json(err.errors)
      });
  }

  static update(req, res) {
    Shop.findOneAndUpdate({
      _id: req.params.shopId
    }, {
      brand: req.body.brand
    }, {
      new: true
    }).populate('itemList')
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(400).json(err.errors)
      });
  }
}


module.exports = shopController