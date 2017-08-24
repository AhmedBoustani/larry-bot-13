'use strict'
// 
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

const handleEvent = require('./handlers/handleEvent')

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', function (req, res) {
	res.send('Hello, I am Larry')
})

app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === '651895af4c9eb95264ef9c9962fb7f4ca96b4f52') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

app.post('/webhook/', function (req, res) {
    const messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
	    const event = req.body.entry[0].messaging[i]
	    handleEvent(event)
    }
    res.sendStatus(200)
})

const token = process.env.APP_ACCESS_TOKEN

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}



// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})