var redis = require('redis')
const config = require('../../config.json');
var client = redis.createClient(config.redis);

const {promisify} = require('util');
const hgetallAsync = promisify(client.hgetall).bind(client);

/* GET users listing. */
const user = async function(req, res, next) {
  const id = Math.floor(Math.random() * 100);

  try {
    var user = await hgetallAsync(`user:${id}`);
  } catch (e) {
    return next(e);
  }
  
  return user;
}

module.exports = user;
