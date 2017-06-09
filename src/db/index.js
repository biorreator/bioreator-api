var thinky = require('thinky')({
  host: (process.env.DOCKHERO_HOST || 'localhost'),
  port: '2801',
  db: 'test',
  password: (process.env.RETHINKDB_PASSWORD || 'app')
})
var { type, r } = thinky

function init () {
  return new Promise((resolve, reject) => {
    thinky.dbReady().then(() => {
      resolve(thinky)
    })
  })
}
export { init, thinky, type, r }
