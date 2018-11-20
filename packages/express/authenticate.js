const passport = require('passport');
const TokenStrategy = require('passport-http-oauth').TokenStrategy;
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
    const tokenRow = await user.getToken(accessToken);
    if (tokenRow ===  false) {
      return done(null, false);
    }
    console.log(tokenRow);

    return done(null, tokenRow, tokenRow.secret, { scope: '*' });
  },
  function(timestamp, nonce, done) {
    // validate the timestamp and nonce as necessary
    done(null, true)
  }
));

exports.verifyAccessToken = passport.authenticate('token', {session: false});