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
    })
      .then((result) => {
        return Shop.findOne({
          _id: result.shopId
        }).populate('itemList')
      })
      .then((result_shop) => {
        res.status(200).json(result_shop)
      })
      .catch((err) => {
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
    const itemId = req.params.itemId
    const { name, price } = req.body
    const data = {
      name,
      price: +price,
    }
    if (req.file) {
      data.picture = req.file.cloudStoragePublicUrl
    }


    Item.findOneAndUpdate({
      _id: itemId
    }, data, {
      new: true
    })
      .then((result) => {
        // console.log(result)
        res.status(200).json(result)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      })
  }

  static delete(req, res) {
    const itemId = req.params.itemId
    const shopId = req._currentUser.shopId

    Shop.findByIdAndUpdate({
      _id: shopId
    }, {
      $pull: {itemList: itemId}
    })
      .then((result) => {
        return Item.findByIdAndDelete({
          _id: itemId
        })
      })
      .then((result_item) => {
        res.status(200).json(result_item)
      })
      .catch((err) => {
        res.status(err.message)
      });
  }
}

module.exports = itemController