var thinky = require('thinky')()
var { type, r } = thinky

function init () {
  return new Promise((resolve, reject) => {
    thinky.dbReady().then(() => {
      resolve(thinky)
    })
  })
}
export { init, thinky, type, r }
