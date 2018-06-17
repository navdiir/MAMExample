'use strict'

const Mam = require('../lib/mam.node.js')
const IOTA = require('iota.lib.js')
const iota = new IOTA({ 'provider': 'https://pow1.iota.community:443' })

let root = process.argv[2]
let mamState = Mam.init(iota)

//callback for each fetch
const logData = data => {
	console.log(JSON.parse(iota.utils.fromTrytes(data)))
	console.log('-------------------------------------------------')
}

//Fetching async
const execute = async () => {
	let resp = await Mam.fetch(root, 'public',null,logData)
	console.log(resp)
}

console.log('\n\nFETCHING DATA!!\n\n')
execute()