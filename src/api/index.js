import { version } from '../../package.json'
import { Router } from 'express'
import reactionRouter from './reaction'

export default ({ config, db }) => {
  let api = Router()

  // Add model routes
  api.use('/reaction', reactionRouter({ config, db }))

  api.get('/', (req, res) => {
    res.json({ version })
  })

  return api
}
