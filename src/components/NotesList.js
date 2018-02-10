
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Note from "./Note";
@inject('noteStore')@observer
export default class NotesList extends Component{
  componentDidMount(){
    this.props.noteStore.fetchNotes();
  }
  render(){
    const notes  = this.props.noteStore.allNotes;
    const comments = this.props.noteStore.comments;
    const fetched = this.props.noteStore.fetched;

    return <div>
        <section>{notes.reverse().map(note => <Note key={note["_id"]} date={note["date"]} note={note["note"]} comments={comments}/>)}</section>

      </div>
    }
}
