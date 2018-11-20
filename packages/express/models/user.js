const cassandra = require('cassandra-driver');
const config = require('../../config.json');
const client = new cassandra.Client({ contactPoints: [config.scylla.host + ':' + config.scylla.port], keyspace: 'am_tokens_test'});

exports.getToken = async (token) => {
  const query = 'SELECT * from session_tokens2 WHERE s_token = ?';
  try {
    const results = await client.execute(query, [token]);
    if (results.rowLength === 0) {
      return false;
    }

    return results.rows[0];
    
  } catch (err) {
    return false;
  }
}
