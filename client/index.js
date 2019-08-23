const request = require('request')

// Configs from env
const CALL_CENTER_URL = process.env.CALL_CENTER_URL || 'http://localhost:5000'
const REQUEST_INTERVAL = process.env.REQUEST_INTERVAL || 500

const orderPizza = order => {
    request.post({
        headers: { 'Content-Type': 'application/json' },
        url: CALL_CENTER_URL
      },  function (error, response, body) {
      if (error)
        console.error('error:', error)

      console.log('statusCode:', response && response.statusCode)
    })
}

setInterval(orderPizza, REQUEST_INTERVAL)
