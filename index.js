'use strict'

const MAM_public = require('./lib/attachDataPublic.js')
const MAM_private = require('./lib/attachDataPrivate.js')
const MAM_restricted = require('./lib/attachDataRestricted.js')
const IOTA = require('iota.lib.js')
const iota = new IOTA()

let timeLoop,date, 
	i=1

if( process.argv[2] == undefined){          //Getting the time in seconds for the loop
  timeLoop = 60000                       //default 1 minute
} else {
  timeLoop = process.argv[2]*1000 
}

console.log('\n\nSENDING DATA!!\n\n')

//Create a JSON as message

function start(){
	date = new Date(Date.now()).toLocaleString()
    let message = { 'Message' : i, 'Date' : date}
	switch(process.argv[3]){								//Getting the mode of the stream (Public:1, Private:2, Restricted: 3)
		case '1': MAM_public.attach(message);break; 
		case '2': MAM_private.attach(message);break;
		case '3': MAM_restricted.attach(message);break;
		default: MAM_public.attach(message)
	}
	console.log('Start sending data to Tangle...')
	let messageS = JSON.stringify(message)
	console.log('Message: %s',messageS)
	console.log('Message in trytes: ' + iota.utils.toTrytes(messageS))
	console.log('--------------------------------------------------------------------------------------------------------------------')
	i++
}

setInterval(function(){
	start()
},timeLoop)