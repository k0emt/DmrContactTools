const readline = require('readline')
const fs = require('fs')

const DEFAULT_OPERATOR_LIST_FILENAME = 'ops.txt'
const DEFAULT_CONTACT_DATABASE_FILENAME = 'test-contact-list.csv'
const DEFAULT_OUTPUT_CONTACT_FILENAME = 'my-custom-contacts.csv'

function loadOps(
    operatorListFilename,
    contactDatabaseFilename,
    outputContactFilename,
    nextStage
) {
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
        nextStage(operatorList, contactDatabaseFilename, outputContactFilename)
    })
}

function determineCallsignField(headerRow) {
    return 2;
}

function postLoadLoop(opsList, contactDatabaseFileName, outputFileName) {
    let generatedContactList = []
    let isHeader = true;
    
    console.log(opsList)

    // given contact list CSV

    // read first line of file
    // determine what field in CSV has the call sign
    if (isHeader) {
        isHeader = false
        let callsignColumn = determineCallsignField('');
    }
    
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
    loadOps(
        DEFAULT_OPERATOR_LIST_FILENAME,
        DEFAULT_CONTACT_DATABASE_FILENAME,
        DEFAULT_OUTPUT_CONTACT_FILENAME,
        postLoadLoop
    )
}

main()
