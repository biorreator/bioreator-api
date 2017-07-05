import cron from 'cron'
import PythonShell from 'python-shell'

var createNewJob = function (minute, reactionId) {
  const job = new cron.CronJob({
    cronTime: '00 ' + minute + ' * * * *',
    onTick: async function () {
      var options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: '/Users/matheusgodinho/Desktop/bioretor-pi',
        args: [reactionId]
      }
      PythonShell.run('teste2.py', options, (err, results) => {
        if (err) {
          console.log(err)
        }
        console.log(results)
      })
    },
    start: false,
    timeZone: 'America/Los_Angeles'
  })
  job.start()
}

export { createNewJob }
