const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
  },

  checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
  },

  generateToken(input) {
    return jwt.sign(input, process.env.JWT_TOKEN);
  },

  verifyToken(token, cb) {
    jwt.verify(token, process.env.JWT_TOKEN, function(err, decoded) {
      // console.log(decoded.foo) // bar
      if (err) {
        cb(err)
      } else {
        cb(null, decoded)
      }
    });
  }

}