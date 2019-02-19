const mongoose = require('mongoose')

mongoose.Promise = global.Promise

function openDatabase(dbUrl) {
  return mongoose.connect(dbUrl, { useNewUrlParser: true })
}

function closeDatabase() {
  mongoose.connection.close()
}

module.exports.openDatabase = openDatabase
module.exports.closeDatabase = closeDatabase
