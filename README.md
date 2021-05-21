# DMR Contact Tools

Given that DMR devices have a limited memory, the contact list of all DMR contacts may be larger than the available memory.

Also, it takes time to upload the full list to a radio.

## Source Call lists

Create or acquire a list of call signs for operators that you want in your contact list (if they have a DMR id).

### Create your own list

Make your own list of your on air buddies, frequent contacts, club or organization members, etc.  Create a file with one callsign per row.

```txt
k0emt
w4rk
n0tkn
n0evh
NK8O
```

### Organization Operators

Tools for getting lists of call signs

- 4SQRP
- POTA ops
- SOTA ops
- Flying Pigs QRP
- QRP ARCI
- NAQCC
- SKCC

### ADIF log scanner

Generate a list of operators from an ADIF log.

### SOTA log scanner

Generate a list of operators from a SOTA log.

## Obtain full DMR Contact List

Download full DMR contact lists from <http://www.dmrcontacts.com> 

```sh
curl http://www.dmrcontacts.com/d868uv-d878uv.csv > d868uv-d878uv.csv
curl http://www.dmrcontacts.com/d868uv-d878uv-v2.csv > d868uv-d878uv-v2.csv
```

## Generate Contact Lists

Use your list of call signs to create a custom DMR contact list
Save the DMR contact list in a file with a default name: `dmr-contact-list.csv`

Run the command.

```sh
command_name_tbd call-file-name.txt
```

Default output is sent to generated-contact-list-YYYYMMDDTHHmmss.csv

Override the default contact file name with -c filename, the input filename with -f filename, and the output filename with -o filename

## Utilities

- Merge generated contact lists
- Dedupe the merged list

## Tech stack

- node.js v16
- chalk
- inquirer
- cli-ux ?
- ???

## Installing the Tools

```sh
npm install
```

