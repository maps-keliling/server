const User = require('../models/User');

module.exports = function(done) {
  if(process.env.NODE_ENV === 'TEST') {
      User.deleteMany({})
      .then(() => {
          done();
      })
      .catch(err => {
          console.log(err);
      });
  }
}