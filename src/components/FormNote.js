import React, { Component } from "react";

export default class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      user:true,
    };
  }

  handleSubmit = event => {
    if (this.state.note && this.state.date) {
      this.setState(prevState => ({
        id: prevState.id + 1
      }));

      let data = this.state;
      console.log(this.state);
      event.preventDefault();
      this.props.onSubmit(data);
      event.target.reset();
    } else {
      alert("note or date is empty");
    }
  };
  dateChange = event => {
    console.log(event.target.value);
    this.setState({
      date: event.target.value
    });
  };
  noteChange = event => {
    this.setState({
      note: event.target.value
    });
  };

  render() {
    let formOrNot;
    switch (this.state.user) {
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
