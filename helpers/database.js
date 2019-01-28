function database(environment) {
  if(environment === 'TEST') {
    return "mongodb://localhost/inginJajanTest";
  } else {
    return process.env.MLAB;
  }
}

module.exports = database;