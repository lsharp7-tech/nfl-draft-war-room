const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const id = event.queryStringParameters && event.queryStringParameters.id;
  if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'Missing id' }) };

  try {
    const store = getStore('boards');
    const data = await store.get(id);
    if (!data) return { statusCode: 404, body: JSON.stringify({ error: 'Board not found' }) };
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: data,
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
