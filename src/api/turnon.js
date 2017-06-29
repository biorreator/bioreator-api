import { Router } from 'express'
var PythonShell = require('python-shell')

export default ({ config, db }) => {
  let router = Router()

  router.post('/', async ({ body }, res) => {
    try {
      var port = body.port
      var mode = body.mode
      var brix = body.brix
      var rotation = 50
      var total = brix * 211
      var rotations = total / rotation

      var options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: '/home/pi/Desktop/pi2/bioreator-api/scripts',
        args: [port]
      }
      for (var index = 0; index < rotations; index++) {
        PythonShell.run('turn_' + mode + '.py', options, function (err, results) {
          if (err) throw err
          // results is an array consisting of messages collected during execution
          console.log('results: %j', results)
        })
      }
      res.json({teste: 'Açucar adicionado com sucesso.'})
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  return router
}
