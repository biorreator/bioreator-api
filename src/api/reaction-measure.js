import { Router } from 'express'
import Measure from '../models/measure'
import { r } from '../db'
import { densityToBrix } from '../helpers/transformations'

export default ({ config, db }) => {
  let router = Router({ mergeParams: true })

  router.param('measure', (req, resp, next, id) => {
    req.measure = Measure.get(id)
    next()
  })

  router.get('/', async ({ reaction, params }, res) => {
    try {
      res.json((await reaction.getJoin({
        measures: {
          _apply (sequence) {
            return sequence.orderBy(r.desc('time'))
          }
        }})).measures || [])
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.post('/', async ({ reaction, body }, res) => {
    try {
      var measure = {}
      measure.temperature = body.temperature
      measure.time = new Date()
      measure.density = body.density
      measure.ph = body.ph
      const brix = densityToBrix(body.density)
      measure.brix = brix
      measure.alcoholicContents = 46
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

  router.get('/graph', async ({ reaction, params }, res) => {
    try {
      var measuresModel = await reaction.getJoin({
        measures: {
          _apply (sequence) {
            return sequence.orderBy(r.desc('time'))
          }
        }
      })
      var measures = measuresModel.measures
      var brixData = measures.map((measure, index) => {
        return { x: index, y: measure.brix }
      })
      var glData = measures.map((measure, index) => {
        return { x: index, y: measure.alcoholicContents }
      })
      var array = [glData, brixData]
      res.json(array)
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  return router
}
