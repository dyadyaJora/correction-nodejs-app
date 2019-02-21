let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');
const config = require('./config');

module.exports = (passport) => {
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
  }, (payload, done) => {
    User.findById(payload.user.id)
      .then((usr) => {
        if (usr) {
          done(null, usr);
        } else {
          done(null, false);
        }
      })
      .catch((err) => {
        done(err, false);
      })
  }));
};