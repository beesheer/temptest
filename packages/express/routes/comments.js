var express = require('express');
var router = express.Router();
const cassandra = require('cassandra-driver');
const config = require('../../config.json');
const client = new cassandra.Client({ contactPoints: [config.scylla.host + ':' + config.scylla.port], keyspace: 'am_artists_test'});

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const query = 'SELECT * from threads';
  const results = await client.execute(query).catch(
    (err) => {
      console.log(err);
      next(err);
    }
  );

  res.json(results);
});

module.exports = router;
