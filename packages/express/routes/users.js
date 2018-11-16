var express = require('express');
var router = express.Router();
var redis = require('redis')

const config = require('../../config.json');
var client = redis.createClient(config.redis);

const {promisify} = require('util');
const hgetallAsync = promisify(client.hgetall).bind(client);

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const id = Math.floor(Math.random() * 100);

  try {
    var user = await hgetallAsync(`user:${id}`);
  } catch (e) {
    next(e);
  }
  res.json(user);
});

module.exports = router;
