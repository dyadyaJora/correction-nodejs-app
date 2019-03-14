const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const app = express();
const User = require('./models/user');
const SAN = require('./models/san');
const Lusher = require('./models/lusher');
const passportController = require('./passport');
const config = require('./config');
const psySan = require('./lib/psy_san');
const psyLusher = require('./lib/psy_lusher');

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

app.get('/check-auth', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send({ valid: true });
});

app.post('/san', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let payload = req.body.sanData;
  console.log(req.body)
  if (!payload) {
    res.send(404);
    return;
  }

  let val = psySan.calcResults(payload);
  let userId = req.user.id;

  try {
    await SAN.create({
      points: val.diff,
      payload: payload,
      user: userId
    });
  } catch (err) {
    res.sendStatus(500);
    return;
  }

  res.send({ message: 'ok' });
});

app.post('/lusher', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let oneArr = req.body.data.oneArr;
  let twoArr = req.body.data.twoArr;

  if (!oneArr || !oneArr.length || !twoArr || !twoArr.length) {
    res.sendStatus(400);
    return;
  }

  if (oneArr.length !== twoArr.length) {
    res.send(400, 'Wrong arrays length');
  }

  let anxObject = psyLusher.calcAnxiety(oneArr, twoArr);
  let confObject = psyLusher.calcConflict(oneArr, twoArr);
  let perfObject = psyLusher.calcPerformance(oneArr, twoArr);
  let fagObject = psyLusher.calcFatigue(oneArr, twoArr);

  let userId = req.user.id;

  try {
    await Lusher.create({
      points: {
        anxiety: anxObject,
        conflict: confObject,
        performance: perfObject,
        fatigue: fagObject
      },
      arrays: {
        one: oneArr,
        two: twoArr
      },
      user: userId
    });
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }

  res.send({ message: "ok" });
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
    res.sendStatus(500);
    return;
  }

  res.send({ message: 'ok' });
});

function generateRandomToken() {
  return  crypto.randomBytes(32).toString('hex');
}

module.exports = app;