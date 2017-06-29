import gcm from 'node-gcm'
const senderId = 'AAAAQfYxQL4:APA91bGmPm92cwBwL70bp2-2xe-19pLA1kEuuRKoWE-XlTJqZyhFZbBXh9qO_ThLDe9_0bXj0eVvjKUJIlPMPMJiLHeCtQzTaYXTPqt_I9rycbwStVW_Fu0Sl_I_FwwKRyUKFnNfcJ1D'
const regTokens = ['dWa-mQ7pfDc:APA91bETuzB95iRYka7LawEyiVjs-Tz6EWpFXrWPwhGZ1w7-smMm_vKXpBomoCpCyPMf-1Qj3iZOyo79S-suEIjjAnNAhhIyHoj2O55DAQGkrlV38JYh6aiJFIAaLxJpN3iLl2FEjgtI']

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
