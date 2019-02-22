const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const app = express();
const User = require('./models/user');
const SAN = require('./models/san');
const passportController = require('./passport');
const config = require('./config');
const psySan = require('./lib/psy_san');

passportController(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.post('/san', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let payload = req.body.sanData;

  if (!payload) {
    res.send(404);
    return;
  }

  let val = psySan.calcResults(payload);
  let userId = req.user.id;

  try {
    await SAN.create({
      points: val,
      payload: payload,
      user: userId
    });
  } catch (err) {
    res.send(500);
    return;
  }

  res.send({ message: 'ok' });
});

app.post('/meta', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let userId = req.user.id;
  let meta = req.body.meta;
  meta.timestamp = (new Date()).toISOString();

  try {
    await User.findByIdAndUpdate(userId, {
      $push: {
        meta: meta
      }
    });
  } catch (err) {
    console.log(err);
    res.send(500);
    return;
  }

  res.send({ message: 'ok' });
});

function generateRandomToken() {
  return  crypto.randomBytes(32).toString('hex');
}

module.exports = app;