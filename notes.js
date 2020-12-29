const fs = require('fs')
const chalk = require('chalk');
const { title } = require('process');

const getNotes = () =>{
   console.log (chalk.blue("Your Notes"));
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const addNotes = (title, body) => {
    const notes = loadNotes();
    //const duplicateNotes = notes.filter( function(note){
    //    return note.title===title?true:false
    //})
    const duplicateNote = notes.find( function(note){
            return note.title===title
    })

    //debugger

    if(!duplicateNote){   //duplicate === undefined
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.bgGreen('Note Added!'));
    }
    else{
        console.log(chalk.bgRed('Note already exist!'));
    }
}

const loadNotes = () =>{
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return [];
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const filterNotes = notes.filter(note => {
        return note.title!==title
    })
    if(notes.length > filterNotes.length){
        saveNotes(filterNotes);
        console.log(chalk.bgGreen('Note removed!'));
    }
    else{
        console.log(chalk.bgRed('No note found!'));
    }
}

const listNotes = () =>{
    getNotes();
    const lists = loadNotes();
    lists.map( list => {
        console.log(list.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note=>{
        return note.title===title
    })
    if(note){
        console.log(chalk.green.inverse(note.title))
        console.log(note.body);
    }
    else{
        console.log(chalk.red.inverse('No notes found!'));
    }
}

module.exports ={ 
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};