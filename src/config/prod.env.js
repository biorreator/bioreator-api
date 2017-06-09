module.exports = {
  NODE_ENV: '"production"',
  WEBHOST: (process.env.WEBHOST || 'http:/frontend'),
  host: 'localhost',
  port: '3000',
  database: {
    host: (process.env.DOCKHERO_HOST || 'localhost'),
    port: '2801',
    db: 'test',
    password: (process.env.RETHINKDB_PASSWORD || 'app')
  },
  seed: '/seeds/prod-seed.js',
  secret: '6f6b32a97bfdc5ac3112d782b5a5d7bc7d198e08'
}
