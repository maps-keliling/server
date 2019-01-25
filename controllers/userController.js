const User = require('../models/User')
const { checkPassword, generateToken } = require('../helpers')

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

    const data = {
      name,
      phone,
      address,
      username,
      password,
      role
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
    
  }
}

module.exports = userController