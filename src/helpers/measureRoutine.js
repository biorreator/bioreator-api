import cron from 'cron'
import PythonShell from 'python-shell'

var createNewJob = function (minute, reactionId) {
  const nextMinute = minute + 1
  const job = new cron.CronJob({
    cronTime: '00 ' + nextMinute + ' * * * *',
    onTick: async function () {
      var options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: '/home/pi/Desktop/pi2/biorreator-sensors-communication',
        args: [reactionId]
      }
      PythonShell.run('sensors_communication.py', options, (err, results) => {
        if (err) {
          console.log(err)
        }
        console.log('Enviando post de medidas')
      })
    },
    start: false,
    timeZone: 'America/Los_Angeles'
  })
  job.start()
}

export { createNewJob }
