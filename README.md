# DMR Contact Tools

Given that DMR devices have a limited memory, the contact list of all DMR contacts may be larger than the available memory.

Also, it takes time to upload the full list to a radio.

## Source Call lists

Create or acquire a list of call signs for operators that you want in your contact list (if they have a DMR id).

The default operator list input file is `ops.txt`

### Create your own list

Make your own list of your on air buddies, frequent contacts, club or organization members, etc.  Create a file with one callsign per row.

```txt
k0emt
w4rk
n0tkn
n0evh
NK8O
```

### Organization Operators (In progress)

Tools for getting lists of call signs

- [4SQRP](op-list-providers/4SQRP/README.md)
- POTA ops
- SOTA ops
- Flying Pigs QRP
- QRP ARCI
- NAQCC
- SKCC

### ADIF log scanner (TBD)

Generate a list of operators from an ADIF log.

### SOTA log scanner (TBD)

Generate a list of operators from a SOTA log.

### The DMR Contact Database

Once you have obtained a full DMR contact list, you can use command line tools like `grep` to find amateurs that match critieria.  For example, to identify amateur radio operators in Columbus, Indiana:

```sh
grep  Columbus d868uv-d878uv.csv | grep Indiana > Columbus.Indiana.ops.txt
```

Then it is a matter of extracting the call signs from the generated txt file.

## Obtain full DMR Contact List

Download full DMR contact lists from <http://www.dmrcontacts.com>

```sh
curl http://www.dmrcontacts.com/d868uv-d878uv.csv > d868uv-d878uv.csv
```

## Generate Contact Lists

Use your list of call signs to create a custom DMR contact list.

The default DMR contact list file name is as above `d868uv-d878uv.csv`

Run the with the default settings.

```sh
npm run doit
```

Default output is sent to generated-contact-list-YYYY-MM-DDTHH:mm:ss.sssZ.csv

Override the default contact file name with -c filename, the input filename with -f filename, and the output filename with -o filename

## Utilities

- Merge generated (source) contact lists
- Dedupe the source list

## Tech stack

- node.js v16
- chalk
- inquirer ?
- cli-ux ?
- ???

## Installing the Tools

```sh
npm install
```
