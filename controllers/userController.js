const User = require('../models/User')
const Shop = require('../models/Shop')
const { checkPassword, generateToken } = require('../helpers')
const mongoose = require('mongoose')

class userController {
  static registerUser(req, res) {
    // res.json('ini dari login user')
    const { 
      role,
      name,
      phone,
      address,
      username,
      password  } = req.body
    
    if (role === 'buyer') {
      const data = {
        name,
        phone,
        address,
        username,
        password,
        role,
      }
      
      User.create(data)
        .then((result) => {
          res.status(201).json({
            info: 'Buyer User successfully created',
            data: result
          })
        }).catch((err) => {
          res.status(401).json(err.errors )
        });
    } else if (role === 'seller') {
      const newId = mongoose.Types.ObjectId();
      let result_user = {}
      const data = {
        name,
        phone,
        address,
        username,
        password,
        role,
        shopId: newId
      }

      User.create(data)
        .then((result) => {
          result_user = result
          return Shop.create({
            _id: newId,
            brand: req.body.brand
          })
        })
        .then(() => {
          res.status(200).json(result_user)
        })
        .catch((err) => {
          res.status(400).json(err.errors)
        });      
    }

  }

  static loginUser(req, res) {
    const { username, password} = req.body
   
    User.findOne({
      username: username
    })
      .then((result) => {
        if (result) {
          if (checkPassword(password, result.password)) {
            res.status(200).json({
              token: generateToken({
                id: result._id,
                name: result.name,
                username: result.username
              }),
              role: result.role
            })
          } else {
            res.status(400).json({
              message: 'Wrong input password'
            })
          }
        } else {
          res.status(400).json({
            message: 'Username not found'
          })
        }
      }).catch((err) => {
        res.status(400).json(err.errors)
      });
  }

  static addPhoto(req, res) {
    const { username } = req._currentUser
    let urlProfilePic = ''
    if (req.file) {
      urlProfilePic = req.file.cloudStoragePublicUrl
    }
    User.findOneAndUpdate({
      username: username
    }, {
      profilePic: urlProfilePic
    }, {
      new: true
    })
      .then((result) => {
        res.status(200).json({
          info: 'Profile picture has been update',
          data: result
        })
      }).catch((err) => {
        res.status(400).json(err.errors)
      });
  }
}

module.exports = userController