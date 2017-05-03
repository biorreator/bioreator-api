import { Router } from 'express'

export default ({ config, db }) => {
  let router = Router()

  router.post('/changeTemperature', async ({ body }, res) => {
    try {
      var temperature = body.temperature
      res.json({message: 'Temperatura alterada com sucesso para ' + temperature + '. Aguarde um momento'})
    } catch (err) {
      console.log(err)
      res.status(404).json({ error: err.name })
    }
  })

  return router
}
