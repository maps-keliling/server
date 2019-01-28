function database(environment) {
  if(environment === 'DEV') {
    return 'mongodb://admin:admin123@ds211865.mlab.com:11865/final-project';
  } else {
    return "mongodb://localhost/inginJajanTest";
  }
}

module.exports = database;