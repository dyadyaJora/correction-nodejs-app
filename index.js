const app = require('./app');
const db = require('./db');
const config = require('./config');

db.open()
  .then((connection) => {
    app.listen(config.PORT, function () {
      console.log(`Example app listening on port ${config.PORT}!`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

