'use strict'

const MAM = require('./lib/attachData.js')
const IOTA = require('iota.lib.js')
const iota = new IOTA()

let timeLoop,date, 
	i=1

if( process.argv[2] == undefined){          //Getting the time in seconds for the loop
  timeLoop = 60000                       //default 1 minute
} else {
  timeLoop = process.argv[2]*1000 
}

//Create a JSON as message

function start(){
	date = new Date(Date.now()).toLocaleString()
    let message = { 'Message' : i, 'Date' : date}
	console.log('Start sending data to Tangle...')
	let messageS = JSON.stringify(message)
	console.log('Message: %s',messageS)
	console.log('Message in trytes: ' + iota.utils.toTrytes(messageS))
	MAM.attach(message)
	console.log('--------------------------------------------------------------------------------------------------------------------')
	i++
}

setInterval(function(){
	start()
},timeLoop)