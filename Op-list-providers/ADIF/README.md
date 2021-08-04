# ADIF Call List Provider

Instructions on creating an operator list from an ADIF file

## Generate

Example call from top level of this project:

```bash
node src/adif-to-ops.js ../op-list-providers/ADIF/test-file.adif > extracted-calls.txt
```

Extract all files in a directory:

From the top level of this project, find all matching files ending `.adif`, process them, sending the extracted callsigns to `extracted-ops.txt` in the top level directory

```bash
find op-list-providers/ADIF -name \*.adif -maxdepth 1 -type f -exec node src/adif-to-ops.js ../{} >> extracted-ops.txt \;
```

Remove duplicates, and put in a new file:

```bash
uniq extracted-ops.txt > unique-extracted-ops.txt
```
