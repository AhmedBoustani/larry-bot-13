var _ = require('lodash')

const GREETINGS = ['hi', 'hello', 'hola', 'yo', 'sup', 'hey', '*nods*', 'greetings']

function hasGreeting (sentence) {
  return !!sentence.find(x => GREETINGS.find(g => g === x.toLowerCase()))
}

function sendGreeting () {
  return _.startCase(_.sample(GREETINGS))
}

module.exports = {
  hasGreeting,
  sendGreeting
}
