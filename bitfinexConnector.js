const WS = require('ws')
const fs = require('fs')

//takes argument and uses it as the trading pair
const pair = process.argv[2]

//specifies the websocket
const conf = {
  wshost: "wss://api.bitfinex.com/ws/2"
}

console.log(pair, conf.wshost)

let connected = false
let connecting = false
let cli

//when connected
function connect() {
  if (connecting || connected) return
  connecting = true

  cli = new WS(conf.wshost, { /*rejectUnauthorized: false*/ })

  //when connection is opened
  cli.on('open', function open() {
    console.log('WS open')
    connecting = false
    connected = true
    cli.send(JSON.stringify({ event: "subscribe", channel: "trades", pair: pair}))
    console.log('Amount,Price,Timestamp')
  })

  //when connection is closed
  cli.on('close', function open() {
    console.log('WS close')
    connecting = false
    connected = false
  })

  //when a message is received from the socket
  cli.on('message', function(msg) {
    msg = JSON.parse(msg)
    if (msg.event) return
    if (msg[1] === 'hb') return
    if (msg[1] === 'tu') return
    if (msg[1] === 'te') {
      let pp = { amount: msg[2][2], price: msg[2][3]}
      var date = new Date();

      var hour = date.getHours();
      hour = (hour < 10 ? "0" : "") + hour;

      var min  = date.getMinutes();
      min = (min < 10 ? "0" : "") + min;

      var sec  = date.getSeconds();
      sec = (sec < 10 ? "0" : "") + sec;

      //Output style to file
      console.log(pp.amount + "," + pp.price + "," + hour + ":" + min + ":" + sec);
    }
  })
}

//Interval in ms of checking if anything is in the websocket
setInterval(function() {
  if (connected) return
  connect()
}, 500)
