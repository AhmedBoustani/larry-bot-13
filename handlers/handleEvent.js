const handleMessage = require('./handleMessages')
const message = require('../messages/index')

module.exports = (event) => {
  const sender = event.sender.id
  if (event.message && event.message.text) {
    handleMessage(event.message.text, sender)
    console.log(event.sender)
  }
  if (event.postback) {
    let text = JSON.stringify(event.postback)
    message.sendTextMessage(sender, `Postback received: ${text.substring(0, 200)}`)
  }
}
