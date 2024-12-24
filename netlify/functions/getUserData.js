const faunadb = require('faunadb'),
      q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });

exports.handler = async function(event) {
  const userNumber = event.queryStringParameters.number;

  try {
    const result = await client.query(
      q.Get(q.Match(q.Index("users-by-number"), userNumber))
    );
    return {
      statusCode: 200,
      body: JSON.stringify(result.data)
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ msg: error.message }) };
  }
};
