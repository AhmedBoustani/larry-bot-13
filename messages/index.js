const request = require('request')

const token = process.env.APP_ACCESS_TOKEN

function sendTextMessage(sender, text) {
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: { access_token: token },
	    method: 'POST',
		json: {
		    recipient: { id: sender },
			message: { text },
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

function sendHelp(sender) {
  const messageHelp =
`Talk to Larry and let me know how I can make him a better helper.
Features implemented:
- Greeting`
  sendTextMessage(sender, messageHelp)
}

function notUnderstood(sender) {
  const message = `Sorry I coudln't get that. To see what I can do, type help`
  sendTextMessage(sender, message)
}
module.exports = {
    sendTextMessage,
    sendHelp
}
