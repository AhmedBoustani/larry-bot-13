const _ = require('../messages/generic')

module.exports = (event) => {
    const sender = event.sender.id
    if (event.message && event.message.text) {
        let text = event.message.text
        if (text === 'Generic') {
            _.sendGenericMessage(sender)
            continue
        }
    }
    if (event.postback) {
        let text = JSON.stringify(event.postback)
        sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
        continue
    }
}