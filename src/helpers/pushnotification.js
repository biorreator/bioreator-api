import gcm from 'node-gcm'
const senderId = 'AAAAQfYxQL4:APA91bGmPm92cwBwL70bp2-2xe-19pLA1kEuuRKoWE-XlTJqZyhFZbBXh9qO_ThLDe9_0bXj0eVvjKUJIlPMPMJiLHeCtQzTaYXTPqt_I9rycbwStVW_Fu0Sl_I_FwwKRyUKFnNfcJ1D'
const regTokens = ['cAAuOrCvoc8:APA91bGondHpoRn5VRyY6yXA1BVNoULWAxvgmEUo0cJnZ0mw-BBAH_OjMDyZaEm43SYo7Ee2D8Y-YrSW0Fkg4XU1dY5JKDWKPk-YcSrUied_xb3460KE2ZCUUvl7mT0RHuMbMBxYxRNR']

var sendPush = function (pushMessage) {
  var sender = new gcm.Sender(senderId)
  var message = new gcm.Message({
    data: { key1: pushMessage }
  })

  sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if (err) {
      console.error(err)
    } else {
      console.log(response)
    }
  })
}

export { sendPush }
