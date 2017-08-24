const handleMessage = require('./handleMessages')
const message = require('../messages/index')

const token = process.env.APP_ACCESS_TOKEN

module.exports = (event) => {
    const sender = event.sender.id
    if (event.message && event.message.text) {
        handleMessage(event.message.text, sender)
    }
    if (event.postback) {
        let text = JSON.stringify(event.postback)
        message.sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
    }
}