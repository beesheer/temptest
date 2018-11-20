const passport = require('passport');
const user = require('./models/user');

passport.use('token', new TokenStrategy(
  function(consumerKey, done) {
    return done(null, true);
    /*Consumer.findByKey({ key: consumerKey }, function (err, consumer) {
      if (err) { return done(err); }
      if (!consumer) { return done(null, false); }
      return done(null, consumer, consumer.secret);
    });*/
  },
  async function(accessToken, done) {
    const tokenRow = user.getToken(accessToken);
    if (tokenRow ===  false) {
      return done(null, false);
    }
    return done(null, tokenRow, token.secret);
  },
  function(timestamp, nonce, done) {
    // validate the timestamp and nonce as necessary
    done(null, true)
  }
));

exports.verifyAccessToken = passport.authenticate('token', {session: false});