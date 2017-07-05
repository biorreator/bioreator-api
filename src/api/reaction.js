import { Router } from 'express'
import Reaction from '../models/reaction'
import { r } from '../db'
import { densityToBrix } from '../helpers/transformations'
import { sendPush } from '../helpers/pushnotification'
import PythonShell from 'python-shell'
import { createNewJob } from '../helpers/measureRoutine'

export default ({ config, db }) => {
  let router = Router()

  router.param('reaction', (req, resp, next, id) => {
    req.reaction = Reaction.get(id)
    next()
  })

  router.get('/', async ({ body }, res) => {
    try {
      var reactions = await Reaction.getJoin({
        measures: {
          _apply (sequence) {
            return sequence.orderBy(r.asc('time'))
          }
        }
      }).run()
      res.json(reactions)
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.get('/get-current-measures', async ({ body }, res) => {
    try {
      var options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: '/home/pi/Desktop/pi2/biorreator-sensors-communication',
        // scriptPath: '/Users/matheusgodinho/Desktop/bioretor-pi',
        args: [17]
      }
      PythonShell.run('sensors_static_data.py', options, function (err, results) {
        if (err) {
          res.status(404).json({Error: err.message})
          throw new Error(err)
        } else {
          const measure = {
            temperature: results[0],
            ph: results[1],
            density: results[2]
          }
          res.json(measure)
        }
      })
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.get('/:reaction/start', async ({ reaction }, res) => {
    try {
      let doc = await reaction
      const now = new Date()
      await doc.merge({started: true, startTime: now}).save()
      createNewJob(now.getMinutes(), doc.id)

      // var options1 = {
      //   mode: 'text',
      //   pythonOptions: ['-u'],
      //   scriptPath: '/home/pi/Desktop/pi2/bioreator-api/scripts',
      //   args: [17]
      // }
      // var options2 = {
      //   mode: 'text',
      //   pythonOptions: ['-u'],
      //   scriptPath: '/home/pi/Desktop/pi2/bioreator-api/scripts',
      //   args: [22]
      // }
      // await PythonShell.run('turn_on.py', options1)
      // await PythonShell.run('turn_off.py', options2)
      res.json('Reação iniciada')
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.get('/:reaction/stop', async ({ reaction }, res) => {
    try {
      let doc = await reaction
      const now = new Date()
      await doc.merge({started: false, status: false, endTime: now}).save()
      // var options1 = {
      //   mode: 'text',
      //   pythonOptions: ['-u'],
      //   scriptPath: '/home/pi/Desktop/pi2/bioreator-api/scripts',
      //   args: [17]
      // }
      // var options2 = {
      //   mode: 'text',
      //   pythonOptions: ['-u'],
      //   scriptPath: '/home/pi/Desktop/pi2/bioreator-api/scripts',
      //   args: [22]
      // }
      // await PythonShell.run('turn_on.py', options2)
      // await PythonShell.run('turn_off.py', options1)
      res.json('Reação finalizada')
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.post('/', async ({ body }, res) => {
    try {
      var reaction = body.reaction
      reaction.status = true
      if (reaction.volume < 15 || reaction.volume > 20) {
        res.status(404).json({ error: 'Volume inválido' })
      } else {
        res.json(await Reaction.save(reaction))
      }
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.put('/:reaction', async ({ reaction, body }, res) => {
    try {
      let doc = await reaction
      res.json(await doc.merge(body.reaction).save())
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.delete('/:reaction', async ({ reaction, body }, res) => {
    try {
      res.json(await reaction.delete())
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.post('/transform/', async ({ body }, res) => {
    try {
      var brix = densityToBrix(body.density)
      console.log(body.density, brix)
      res.json(brix)
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.get('/addSugar/', async (res) => {
    try {
      sendPush('Por favor, adicione mais açúcar ao reservatório')
      res.json('Push enviado com sucesso')
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })
  return router
}
