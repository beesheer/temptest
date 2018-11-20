var express = require('express');
var router = express.Router();
const cassandra = require('cassandra-driver');
const config = require('../../config.json');
const client = new cassandra.Client({ contactPoints: [config.scylla.host + ':' + config.scylla.port], keyspace: 'am_artists_test'});

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let results = [];
  const query = 'SELECT * from threads';
  await client.eachRow(query, [], { autoPage: true, fetchSize: 1}, function (n, row) {
    console.log(n);
    console.log(row);
    results.push(row);
  }, (req, res, next) => res.json(results));

  /*const results = await client.execute(query).catch(
    (err) => {
      console.log(err);
      next(err);
    }
  );*/
});

module.exports = router;
