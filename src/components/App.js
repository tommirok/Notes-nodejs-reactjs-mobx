import React from "react";
import { observer, inject } from "mobx-react";
import MyComponent from "./MyComponent";
import FormNote from "./FormNote";
import NotesList from "./NotesList";
import Note from "./Note";
@inject("noteStore", "userStore")
@observer
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const ustore = this.props.userStore
    return (
      <app>
        <FormNote store={this.props.noteStore} />
        <NotesList />
      </app>
    );
  }
}
//Im not sure yet if i need these

export default App;
