const express = require('express');
const crypto = require('crypto');
const app = express();
const User = require('./models/user');

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

    res.send({
      token: usr.token
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

function generateRandomToken() {
  return  crypto.randomBytes(32).toString('hex');
}

module.exports = app;