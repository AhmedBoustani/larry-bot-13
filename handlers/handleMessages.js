const generic = require('../messages/generic')

module.exports = (text, sender) => {
    if (text === 'Generic') {
        generic.sendGenericMessage(sender)
    }
    // return 1

}