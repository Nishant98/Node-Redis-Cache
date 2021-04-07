const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

// Set response
function setResponse(pokemon, weight) {
  return `<h2>Weight of the ${pokemon} is ${weight}</h2>`;
}

// Make request to Poke API for weight of pokemon
async function getWeight(req, res, next) {
  try {
    console.log('Fetching Data...');
    const { pokemon } = req.params;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();
    const weight = data.weight;
    // Set data to Redis
    client.setex(pokemon, 3600, weight);
    res.send(setResponse(pokemon, weight));
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

// Cache middleware
function cache(req, res, next) {
  const { pokemon } = req.params;
  client.get(pokemon, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(setResponse(pokemon, data));
    } else {
      next();
    }
  });
}

app.get('/getWeight/:pokemon', cache, getWeight);

app.listen(5000, () => {
  console.log(`App listening on port ${PORT}`);
});