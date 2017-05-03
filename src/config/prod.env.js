module.exports = {
  NODE_ENV: '"production"',
  WEBHOST: (process.env.WEBHOST || 'http:/frontend'),
  host: 'localhost',
  port: '3000',
  database: {
    host: 'localhost',
    port: '27017',
    name: 'bioreator-prod-db'
  },
  seed: '/seeds/prod-seed.js',
  secret: '6f6b32a97bfdc5ac3112d782b5a5d7bc7d198e08'
}
