
import React, { Component } from 'react';
import Note from "./Note";
const NotesList = (props) =>{
  console.log(props.notes);
    return <div>
        <section>{props.notes.map(note => <Note key={note.id} {...note}/>)}</section>
      </div>

}
export default NotesList;
