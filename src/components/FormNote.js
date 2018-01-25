import React, { Component } from "react";



export default class NoteForm extends Component {
  constructor(props) {
    super(props);

  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.store.addNote();
    console.log(this.props.store);
    event.target.reset();
}
  dateChange = event => {
    this.props.store.setDate(event.target.value);
};
  noteChange = event => {
    this.props.store.setNoteText(event.target.value);
  };

  render() {
    let user = true;
    let formOrNot;
    switch (user) {
      case true:
      formOrNot = (
        <form onSubmit={this.handleSubmit} id="userForm">
          <label type="text" name="date" value="Date" disabled>
            Date
          </label>
          <input type="Date" name="username" onChange={this.dateChange} />
          <label type="text" name="date" value="Date" disabled>
            Note
          </label>
          <textarea
            name="comment"
            form="userForm"
            onChange={this.noteChange}/>
          <input className="button" type="submit" value="Add The Note" />
        </form>
    )
        break;
        case false:
        <div>
          Welcome
        </div>
        break;
        default:
        <div>
          Welcome
        </div>
    }
    return (
      <div>{formOrNot}</div>

    );
  }
}
