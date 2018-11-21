const passport = require('passport');
const TokenStrategy = require('passport-http-oauth').TokenStrategy;
const user = require('./models/user');

passport.use('token', new TokenStrategy(
  {
    host: 'audiomack.test'
  },
  async function(consumerKey, done) {
    const consumer = await user.getConsumer(consumerKey);
    if (consumer === null) {
      return done(null, false);
    }

    return done(null, consumer, consumer.secret);
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
    console.log('here');
    // validate the timestamp and nonce as necessary
    done(null, true)
  }
));

exports.verifyAccessToken = passport.authenticate('token', {session: false});