const crypto = require('crypto');
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const app = express();
const User = require('./models/user');
const passportController = require('./passport');
const config = require('./config');

passportController(passport);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/auth', async (req, res) => {
  let flag = true;
  let token;

  do {
    token = generateRandomToken();

    let count = await User.countDocuments({ token: token });

    if (!count) {
      flag = false;
    }
  } while(flag);

  try {
    let usr = await User.create({
      token: token,
      meta: ''
    });

    const jwtToken = jwt.sign({
      user: {
        id: usr._id,
        token: usr.token
      }
    }, config.JWT_SECRET);

    res.send({
      jwtToken: jwtToken
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get('/test-auth', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('okay');
});

function generateRandomToken() {
  return  crypto.randomBytes(32).toString('hex');
}

module.exports = app;