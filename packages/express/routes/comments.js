var express = require('express');
var router = express.Router();
const cassandra = require('cassandra-driver');
const config = require('../../config.json');
const client = new cassandra.Client({ contactPoints: [config.scylla.host + ':' + config.scylla.port], keyspace: 'am_artists_test'});

/* GET using eachRow */
router.get('/', async (req, res, next) => {
  let results = [];
  const query = 'SELECT * from threads';
  await client.eachRow(query, [], { autoPage: true, fetchSize: 1}, (n, row) => {
    console.log(n);
    console.log(row);
    results.push(row);
  }, () => res.json(results));
});

router.get('/promise', async (req, res, next) => {
  let rows = [];
  const query = 'SELECT * from threads';

  let pageState = null;

  while(true) {
    const results = await client.execute(query, [], { pageState: pageState, fetchSize: 1}).catch(
      (err) => {
        console.log(err);
        next(err);
      }
    );

    rows.concat(results.rows);

    console.log(results.pageState);

    if (results.pageState === null) {
      break;
    } else {
      pageState = results.pageState;
    }
  }
  
});

module.exports = router;
