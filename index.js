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
    const events = req.body.entry[0].messaging
    for (let i = 0; i < events.length; i++) {
	    handleEvent(events[i])
    }
    res.sendStatus(200)
})

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})