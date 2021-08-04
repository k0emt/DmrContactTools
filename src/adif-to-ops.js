const readline = require('readline')
const fs = require('fs')
const path = require('path')

function loadAdifFile(adifFileName, nextStage) {
    console.error(`current working directory: ${__dirname}`)
    console.error(`Looking for operators in ${adifFileName}`)

    const readInterface = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, adifFileName)),
        // output: process.stdout,
        console: false
    })

    let extractedOpCall = ''

    readInterface.on('line', function (line) {
        extractedOpCall = extractOp(line)
        if (extractedOpCall != '') {
            console.log(`${extractedOpCall}`)
        }
    })

    // readInterface.on('close', function () {
    // })
}

function extractOp(line) {
    let location = line.indexOf('<CALL:')
    let startOfCall = line.substr(location).indexOf('>')
    let endCallTag = line.substr(location + startOfCall).indexOf('<') - 1

    let callTag = line.substr(location + startOfCall + 1, endCallTag)

    return callTag.toUpperCase()
}

const main = () => {
    var commandLineArguments = process.argv.slice(2);
    console.error('Command Line Arguments: ', commandLineArguments);

    if (commandLineArguments.length == 0) {
        console.error('Provide a path to a source ADIF file')
    } else {
        loadAdifFile(commandLineArguments[0])
    }
}

main()
