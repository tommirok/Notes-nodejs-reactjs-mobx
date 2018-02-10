import React, { Component } from "react";



export default class NoteForm extends Component {
  constructor(props) {
    super(props);
    window.store = this.props.store;


  }
  render() {
    let user = true;
    let formOrNot;
    switch (user) {
      case true:
      formOrNot = (
      <div>
          <label type="text" name="date" value="Date" disabled>
            Date
          </label>
          <input type="Date" name="date" onChange={(e)=>{this.props.store.setDate(e)}} />
          <label type="text" name="date" value="Date" disabled>
            Note
          </label>
          <textarea
            name="comment"
            form="userForm"
            onChange={(e)=>{this.props.store.setNoteText(e)}}/>
          <input onClick={(e)=>{this.props.store.addNote(e)}} className="button" type="submit" value="Add a Note" />
      </div>
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
