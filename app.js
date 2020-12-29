//CREATING FILE EXAMPLE 

//const fs = require('fs')

//fs.writeFileSync('notes.txt','My name is Shivam')

//fs.appendFileSync('notes.txt', 'Hello Everyone!')

//fs.writeFileSync('notes.txt','My name is Shivam')


//EXPORT EXAMPLE

//const validator = require('validator')

//const getNotes = require("./notes");

//const sum = require('./utils');

//console.log(sum(10, 20));

//console.log(getNotes());

//console.log(validator.isEmail('shivam@gmail.com'))

//console.log(validator.isURL('shivam.com.io'))

//console.log(chalk.blue.bgRed.bold('Hello world!'))

//console.log(chalk.green.bold('Success!'))

//fs.appendFileSync('notes.txt', chalk.green.bold('Hello Everyone!'))

//console.log(process.argv)

//console.log(process.argv[2])

//console.log(yargs.argv)

/****************************************************************************************************************/

const notes = require('./notes')
const yargs = require('yargs');

//Create Add Command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
            title: {
            describe: 'Note Title',
            demandOption: true,         //It specifies title is required, not provided will give error
            type: 'string'
        },
        body: {
            describe: 'Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        //console.log('Title: ' + argv.title);
        //console.log('Note: ' + argv.body)
        notes.addNotes(argv.title, argv.body);
    }
});

//Create Remove Command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title: {
            describe: 'Note Title',
            demandOption: true,   
            type: 'string'
        }
    },
    handler: function(argv){
        //console.log('Removing the note!');
        notes.removeNote(argv.title);
    }
});

//List Of Notes
yargs.command({
    command: 'list',
    describe: 'List of notes',
    handler(){
    //  console.log('List of all notes!');
        notes.listNotes();
    }
})

//Read a note
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder:{
        title: {
            describe: 'Note Title',
            demandOption: true,   
            type: 'string'
        }
    },
    handler(argv){
    //  console.log('Reading a note!');
        notes.readNote(argv.title);
    }
})

yargs.parse();
//console.log(yargs.argv)