import { Router } from 'express'
import Reaction from '../models/reaction'
import { densityToBrix } from '../helpers/transformations'
import { sendPush } from '../helpers/pushnotification'

export default ({ config, db }) => {
  let router = Router()

  router.param('reaction', (req, resp, next, id) => {
    req.reaction = Reaction.get(id)
    next()
  })

  router.get('/', async ({ body }, res) => {
    try {
      var reactions = await Reaction.run()
      res.json(reactions)
    } catch (err) {
      res.status(404).json({ error: err.name + ': ' + err.message })
    }
  })

  router.post('/', async ({ body }, res) => {
    try {
      const now = new Date()
      var reaction = body.reaction
      reaction.startTime = now
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
