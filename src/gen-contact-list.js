const readline = require('readline')
const fs = require('fs')

const DEFAULT_OPERATOR_LIST_FILENAME = 'ops.txt'
const DEFAULT_CONTACT_DATABASE_FILENAME = 'd868uv-d878uv.csv'
const DEFAULT_OUTPUT_CONTACT_FILENAME = `generated-contact-list-${new Date().toISOString()}.csv`

let operatorListFilename = DEFAULT_OPERATOR_LIST_FILENAME
let contactDatabaseFilename = DEFAULT_CONTACT_DATABASE_FILENAME
let outputContactFilename = DEFAULT_OUTPUT_CONTACT_FILENAME

function loadOps(nextStage) {
    console.log(`Will lock for operators listed in: ${operatorListFilename}`)

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
        console.log(operatorList)
        nextStage(operatorList, contactWriter)
    })
}

function determineCallsignField(headerRow) {
    console.log(`Determine callsign field from:\n${headerRow}`)

    let columnNumber = headerRow.split(',').indexOf('"Callsign"')

    console.log(
        `Using column ${columnNumber} (0 based counting) as callsign field.`
    )
    return columnNumber
}

function contactWriter(generatedContactList) {
    console.log(`Writing to file: ${outputContactFilename}`)

    const writeStream = fs.createWriteStream(outputContactFilename)
    const pathName = writeStream.path

    // write each value of the array on the file breaking line
    generatedContactList.forEach((contact) => writeStream.write(`${contact}\n`))

    // the finish event is emitted when all data has been flushed from the stream
    writeStream.on('finish', () => {
        console.log(`All contacts data written to file: ${pathName}`)
    })

    // handle the errors on the write process
    writeStream.on('error', (err) => {
        console.error(
            `There is an error writing the file ${pathName} => ${err}`
        )
    })

    // close the stream
    writeStream.end()
}

function postLoadLoop(opsList, writer) {
    let generatedContactList = []
    let isHeader = true
    let callsign = ''
    let callsignColumn = null

    console.log(`Using contact database: ${contactDatabaseFilename}`)

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
        // console.log(`found: ${callsign}`)
        // TODO progress spinner

        // if the callsign is in the keyset of the map.has, insert it
        if (opsList.includes(callsign) == true) {
            console.log(`Found a contact record for ${callsign}`) // TODO fancy this up
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
