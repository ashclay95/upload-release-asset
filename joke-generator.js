/**
 * Random Joke Generator
 * Fetches random jokes from the JokeAPI (https://jokeapi.dev)
 */

const https = require('https');

/**
 * Fetch a random joke from the JokeAPI
 * @param {string} category - Optional category: 'general', 'programming', 'knock-knock'
 * @returns {Promise<string>} A random joke
 */
function getRandomJoke(category = 'general') {
  return new Promise((resolve, reject) => {
    const url = `https://v2.jokeapi.dev/joke/${category}?format=txt`;

    https.get(url, (res) => {
      let data = '';

      // Collect data chunks
      res.on('data', (chunk) => {
        data += chunk;
      });

      // Process complete response
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`API returned status ${res.statusCode}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Fetch a joke and print it
 */
async function displayJoke() {
  try {
    const categories = ['general', 'programming', 'knock-knock'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    console.log(`\n📝 Fetching a ${randomCategory} joke...\n`);
    const joke = await getRandomJoke(randomCategory);
    console.log(joke);
  } catch (error) {
    console.error('Error fetching joke:', error.message);
  }
}

// Run if executed directly
if (require.main === module) {
  displayJoke();
}

module.exports = { getRandomJoke };
