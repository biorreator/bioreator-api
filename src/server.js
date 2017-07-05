import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import * as db from './db'
import config from './config'
import api from './api'
import cron from 'cron'
import PythonShell from 'python-shell'
import * as _ from 'lodash'
import { sendPush } from './helpers/pushnotification'

let app = express()
app.use(morgan('dev'))

app.use(bodyParser.json({
  limit: '5mb'
}))

db.init()
.then(db => {
  app.use('/api', api({ config, db }))
  app.listen(process.env.PORT || config.port || 3000)
  console.log('Server started on 3000!')
})

const sendEnd = function () {
  job.stop()
  sendPush('O tempo de esterelização já acabou')
}

let start = false
const job = new cron.CronJob({
  cronTime: '* * * * *',
  onTick: function () {
    var options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: '/home/pi/Desktop/pi2/biorreator-sensors-communication',
      // scriptPath: '/Users/matheusgodinho/Desktop/bioretor-pi',
      args: []
    }
    PythonShell.run('sensors_static_data.py', options, (err, results) => {
      if (err) {
        throw new Error(err)
      }
      const temp = parseInt(results[0])
      if (temp >= 56 && !start) {
        start = true
        sendPush('O aquecimento atingiu 60 graus')
        _.delay(sendEnd, 60 * 1000)
      }

      // sendPush('Uma nova medida foi coletada para essa hora')
      console.log(results)
    })
  },
  start: true,
  timeZone: 'America/Los_Angeles'
})
job.start()

export default app
