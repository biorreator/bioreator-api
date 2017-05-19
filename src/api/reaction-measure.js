import { Router } from 'express'
import Measure from '../models/measure'

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
      var measure = body.measure
      measure.time = new Date()
      measure.brix = 100
      measure.alcoholicContents = 5
      console.log(measure)
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
