const generic = require('../messages/generic')
const string = require('../libraries/string')
const stdlib = require('../libraries/stdlib')
const send = require('../messages/index')

module.exports = (text, sender) => {
  const words = string.parse(text)
  if (stdlib.hasGreeting(words)) {
    send.sendTextMessage(sender, stdlib.sendGreeting())
    send.sendTextMessage(sender, 'How can I help you?')
    return
  }
  if (text === 'help') {
    send.sendHelp(sender)
    return
  }
  if (text === 'Generic') {
    generic.sendGenericMessage(sender)
    return
  }
  send.notUnderstood(sender)
}
