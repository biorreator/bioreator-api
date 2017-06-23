import { version } from '../../package.json'
import { Router } from 'express'
import reactionRouter from './reaction'
import reactionMeasuresRouter from './reaction-measure'
import turnonRouter from './turnon'

export default ({ config, db }) => {
  let api = Router()

  // Add model routes
  var reactions = reactionRouter({ config, db })

  api.use('/reactions', reactions)
  reactions.use('/:reaction/measures', reactionMeasuresRouter({ config, db }))
  api.use('/turnon', turnonRouter({ config, db }))
  api.get('/', (req, res) => {
    res.json({ version })
  })

  return api
}
