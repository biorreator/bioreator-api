import { Router } from 'express'
import Measure from '../models/measure'
import { densityToBrix, densityByPressureDiff } from '../helpers/transformations'

export default ({ config, db }) => {
  let router = Router({ mergeParams: true })

  router.param('measure', (req, resp, next, id) => {
    req.measure = Measure.get(id)
    next()
  })

  router.get('/', async ({ reaction, params }, res) => {
    try {
      res.json((await reaction.getJoin({measures: true})).measures || [])
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.post('/', async ({ reaction, body }, res) => {
    try {
      var measure = {}
      measure.temperature = body.temperature
      measure.time = new Date()
      const density = densityByPressureDiff(body.pressureA, body.pressureB)
      const brix = densityToBrix(density)
      measure.density = density
      measure.brix = brix
      await Measure.save(measure)
      res.json(await reaction.addRelation('measures', await measure))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.delete('/:measure', async ({ reaction, measure }, res) => {
    try {
      res.json(await reaction.removeRelation('measures', await measure))
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  return router
}
