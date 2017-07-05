import gcm from 'node-gcm'
const senderId = 'AAAAQfYxQL4:APA91bGmPm92cwBwL70bp2-2xe-19pLA1kEuuRKoWE-XlTJqZyhFZbBXh9qO_ThLDe9_0bXj0eVvjKUJIlPMPMJiLHeCtQzTaYXTPqt_I9rycbwStVW_Fu0Sl_I_FwwKRyUKFnNfcJ1D'
const regTokens = ['cUnOJQ9vDOw:APA91bFSBHyWO_bHzqUw04k2bksj77rmv4GAiAqH1tlByONJ6YRmil8-mcTOWXrveVFgQI1xvrDTcaRoK8t7yrIQ-xIfVej91q4Wj0RJek1YUdrMaQ-w2VG0Eb9PuccBpOvw54anEy0g']

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
