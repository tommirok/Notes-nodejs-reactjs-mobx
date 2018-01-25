
import React from 'react';
import { observer, inject } from 'mobx-react';
import MyComponent from './MyComponent';
import FormNote from './FormNote';
import NotesList from './NotesList';

@inject('noteStore')@observer
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  /*addNote = (noteInfo) =>{
    console.log(noteInfo);
    this.setState(prevState=>({
      notes: prevState.notes.concat(noteInfo)
    }))
  };*/
  render() {

    return (
      <app>
      <FormNote onSubmit={this.addNote}/>
        <NotesList  notes={this.props.noteStore.allnotes}/>
      </app>
    );
  }
}
//Im not sure yet if i need these

export default App;
