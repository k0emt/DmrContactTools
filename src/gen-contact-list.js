const readline = require('readline')
const fs = require('fs')

const DEFAULT_OPERATOR_LIST_FILENAME = 'ops.txt'
const DEFAULT_CONTACT_DATABASE_FILENAME = 'test-contact-list.csv'
const DEFAULT_OUTPUT_CONTACT_FILENAME = 'my-custom-contacts.csv'

let operatorListFilename = DEFAULT_OPERATOR_LIST_FILENAME
let contactDatabaseFilename = DEFAULT_CONTACT_DATABASE_FILENAME
let outputContactFilename = DEFAULT_OUTPUT_CONTACT_FILENAME

function loadOps(nextStage) {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(operatorListFilename),
        // output: process.stdout,
        console: false
    })

    // store list of call signs in map, with the upper cased call sign as the key to a default ''
    let operatorList = []

    readInterface.on('line', function (line) {
        operatorList.push(line.toUpperCase())
    })

    readInterface.on('close', function () {
        nextStage(operatorList, contactWriter)
    })
}

function determineCallsignField(headerRow) {
    // TODO determine callsign field
    console.log(`Determine callsign field from:\n${headerRow}`)

    let columnNumber = 2

    console.log(`Using column ${columnNumber} as callsign field.`)
    return columnNumber
}

function contactWriter(generatedContactList) {
    // TODO: write the generated contact list to the output file
    console.log(generatedContactList)
}

function postLoadLoop(opsList, writer) {
    let generatedContactList = []
    let isHeader = true
    let callsign = ''
    let callsignColumn = null

    console.log(opsList)

    // given contact list CSV
    const readInterface = readline.createInterface({
        input: fs.createReadStream(contactDatabaseFilename),
        // output: process.stdout,
        console: false
    })

    readInterface.on('line', function (line) {
        // read first line of file
        // determine what field in CSV has the call sign
        if (isHeader) {
            isHeader = false
            callsignColumn = determineCallsignField(line)
            generatedContactList.push(line)
        }

        // read through every line of the CSV
        // determine the  callsign in the row
        callsign = line.split(',')[callsignColumn].replace(/\"/g, '')
        console.log(`found: ${callsign}`)

        // if the callsign is in the keyset of the map.has, insert it
        // placeholder example
        if (opsList.includes(callsign) == true) {
            console.log(`Adding ${callsign} to exported contacts`)
            generatedContactList.push(line)
        }
    })

    readInterface.on('close', function () {
        writer(generatedContactList)
    })
}

const main = () => {
    // TODO: arguments processing for filenames

    loadOps(postLoadLoop)
}

main()
