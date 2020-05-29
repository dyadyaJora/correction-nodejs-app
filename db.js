const mongoose = require('mongoose');
const config = require('./config');

function open() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', true);

    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(config.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  });
}

module.exports = {
  open
};