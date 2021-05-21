const readline = require('readline')
const fs = require('fs')

const defaultOperatorListFileName = 'ops.txt'
const defaultContactFileName = 'test-contact-list.csv'

// read in ops.txt
function loadOps(operatorListFileName, nextStage) {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(operatorListFileName),
        // output: process.stdout,
        console: false
    })

    // store list of call signs in map, with the upper cased call sign as the key to a default ''
    let operatorList = []

    readInterface.on('line', function (line) {
        operatorList.push(line.toUpperCase())
    })

    readInterface.on('close', function () {
        nextStage(operatorList)
    })
}

function postLoadLoop(opsList) {
    let generatedContactList = []
    
    console.log(opsList)

    // given contact list CSV
    // read first line of file
    // determine what field in CSV has the call sign
    // read through every line of the CSV
    // determine the  callsign in the row

    // if the callsign is in the keyset of the map.has, insert it
    // placeholder example
    if (opsList.includes('K0EMT')) {
        generatedContactList.push('example DMR contact record for k0emt')
    }

    // pass the generatedContactList list out to something that will write it out
    // should also capture and write out the first line header
    console.log(generatedContactList)
}

const main = () => {
    loadOps(defaultOperatorListFileName, postLoadLoop)
}

main()
