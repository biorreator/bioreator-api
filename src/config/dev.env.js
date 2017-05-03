module.exports = {
  NODE_ENV: '"development"',
  WEBHOST: (process.env.WEBHOST || 'http://localhost:8080'),
  host: 'localhost',
  port: '3000',
  database: {
    host: 'localhost',
    port: '27017',
    name: 'bioreator-db'
  },
  secret: 'bora ver de qual eh essa treta'
}
