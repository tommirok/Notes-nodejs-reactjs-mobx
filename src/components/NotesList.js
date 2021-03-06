
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Note from "./Note";
@inject('noteStore', 'userStore')@observer
export default class NotesList extends Component{

  componentDidMount(){
    this.props.noteStore.fetchNotes();
      this.props.noteStore.fetchComments();
      console.log("didmount");

  }
  render(){
    const notes  = this.props.noteStore.allNotes;

    const fetched = this.props.noteStore.fetched;

    return <div>
        <section>{notes.reverse().map(note =>
          <Note key={note._id}
                id={note._id}
                date={note.date}
                note={note.note}
                />)}
              </section>

      </div>
    }
}
