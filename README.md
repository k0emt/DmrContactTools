# DMR Contact Tools

Given that DMR devices have a limited memory, the contact list of all DMR contacts may be larger than the available memory.

Also, it takes time to upload the full list to a radio.

## Tech stack

- node.js v16
- *nix shell commands

## Installing the Tools

```sh
npm install
```

## Obtain full DMR Contact List

Download full DMR contact lists from <http://www.dmrcontacts.com>

```sh
curl http://www.dmrcontacts.com/d868uv-d878uv.csv > d868uv-d878uv.csv
```

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
- [From an ADIF log](op-list-providers/ADIF/README.md).
- POTA ops
- SOTA ops
- Flying Pigs QRP
- QRP ARCI
- NAQCC
- SKCC

### SOTA log scanner (TBD)

Generate a list of operators from a SOTA log.

### The DMR Contact Database

Once you have obtained a full DMR contact list, you can use command line tools like `grep` to find amateurs that match criteria.  For example, to identify amateur radio operators in Columbus, Indiana:

```sh
grep  Columbus d868uv-d878uv.csv | grep Indiana > raw_Columbus.Indiana.ops.txt
```

Then it is a matter of extracting the call signs from the generated txt file.

```sh
cut -d',' -f 3 raw_Columbus.Indiana.ops.txt | sed s/\"//g > Columbus.Indiana.ops.txt
```

## Prepping the ops file

### Merging operator lists

You can use file concatenation to make a file that is the aggregation of multiple operator lists.

For example, if you have three operator lists, one.txt, two.txt, and three.txt

```sh
cat one.txt > combined_raw.txt
cat two.txt >> combined_raw.txt
cat three.txt >> combined_raw.txt
```

### Normalizing and deduplicating the merged file

Now that you have a combined file, you need to deduplicate the operators in the list.  The `bash` command below takes the raw file, translates it to all upper case, sorts it, makes sure every line is unique and finally outputs it to `combined.txt`.

```sh
cat combined_raw.txt | tr [a-z] [A-z] | sort | uniq > combined.txt
```

## Generate Contact Lists

Now you can use your list of call signs to create a custom DMR contact list.

### D868uv D878uv format

The default input or ops file name is: `ops.txt`
The default DMR contact list file name is as above: `d868uv-d878uv.csv`

Run with the default settings:

```sh
npm run doit
```

Default output is sent to generated-contact-list-YYYY-MM-DDTHH:mm:ss.sssZ.csv

TODO: Override the default contact file name with -c filename, the input filename with -f filename, and the output filename with -o filename

### GD77 format

As above, but generates a file that can be used by the Radioddity GD77 contact utility.

```sh
npm run gd77
```

#### Getting fancy

Lets say you've got your generated-contact-list from above.  This gives you a list of DMR IDs along with associated call sign.  If you want to take that list down to just the unique call signs in your list, you'd do something like this (on a unix system):

```shell
cat generated-contact-list-2022-12-15T03:21:34.919Z.csv | awk -F '[,]' '{print $3}' | sort | uniq | sed -e 's/"//g' > unique-callsigns-for-op-list.txt
```
