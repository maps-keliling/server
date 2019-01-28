const Item = require('../models/Item')
const User = require('../models/User')
const mongoose = require('mongoose');
const Shop = require('../models/Shop')

class itemController {
  static create(req, res) {
    const { name, price } = req.body
    const user = req._currentUser
    const id = mongoose.Types.ObjectId();
    const shopId = user.shopId


    let urlProfilePic = ''
    if (req.file) {
      urlProfilePic = req.file.cloudStoragePublicUrl
    }

    const data = {
      _id: id,
      name,
      price: +price,
      picture: urlProfilePic
    }

    Item.create(data)
      .then((result_item) => {
        // res.json(result_item)
        return Shop.findOneAndUpdate({
          _id: shopId
        }, {
          $push: {itemList: id}
        }, {
          new: true
        }).populate('itemList')
      })
      .then((result_shop) => {
        res.status(201).json(result_shop)
      })
      .catch((err) => {
        // console.log('sini')
        res.status(401).json(err)
      });

    // res.json(shopId)
  }

  static find(req, res) {
    const user = req._currentUser

    User.findOne({
      _id: user._id
    }).populate('itemList')
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      })
  }

  static findOne(req, res) {
    const itemId = req.params.itemId
    Item.findOne({
      _id: itemId
    })
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      })
  }

  static update(req, res) {

  }

  static delete(req, res) {
    const itemId = req.params.itemId
    Item.findOneAndDelete({
      _id: itemId
    })
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      })
  }
}

module.exports = itemController