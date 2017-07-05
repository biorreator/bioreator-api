import gcm from 'node-gcm'
const senderId = 'AAAAQfYxQL4:APA91bGmPm92cwBwL70bp2-2xe-19pLA1kEuuRKoWE-XlTJqZyhFZbBXh9qO_ThLDe9_0bXj0eVvjKUJIlPMPMJiLHeCtQzTaYXTPqt_I9rycbwStVW_Fu0Sl_I_FwwKRyUKFnNfcJ1D'
const regTokens = ['fmAXDjzYQ7Q:APA91bGp9M7g_7UmDfGN8-IoW20WazikYc0nMp1kjylYjydjPWsauS-u4ZElCQ3WVKnD8kLpN8MNQn83nWs63QHeHte7EXzl-Usb_6kPamSLc8w88k_W4m2UHRrY56OMCmxom0LrOOUU']

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
