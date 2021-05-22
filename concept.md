# Concept

This code can be turned into a deployable application.

## Components

Components:

- mongodb Server
- Service
- Web application

### mongodb Server

The mongodb server would have a database of all of the DMR records.
Why mongodb?  Because we can then index and search through the database on any field.
This is particularly useful with the call sign and SPC fields.
Also, mongodb provides a utility for easy import of a CSV file (of all DMR ID holders).

### Service

Web service that can be used to do individual or batch call sign lookups.

### Web application

Web application that uses the service.

- Look up by individual call sign
- Upload a file and get a contact file back
- Serve up default organization lists (pre-generated)
- Pick and choose between organizations and SPCs for generating a list

## Implmentation

All of the components above can be bundled up with docker and docker compose.
