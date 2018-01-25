
import React, { Component } from 'react';
import Note from "./Note";

const NotesList = (props) =>{

  console.log(props.store.allNotes);
    return <div>
        <section>{props.store.allnotes.map(note => <Note key={note.id} {...note}/>)}</section>
      </div>

}
export default NotesList;
