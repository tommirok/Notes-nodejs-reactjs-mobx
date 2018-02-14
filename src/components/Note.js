import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { observable, action } from "mobx";
import Comment from "./Comment";
import FormComment from "./FormComment";
let iscomments;
@inject("noteStore", 'userStore')
@observer
export default class Note extends Component {
  constructor(props) {
    super(props);
  }

  @observable commentform = false;
  toggleCommentForm = id => {
    this.commentform ? (this.commentform = false) : (this.commentform = true);
  };

  render() {
    let comments = this.props.noteStore.comments;
    const store = this.props.noteStore;
    const fetched = store.fetchedc;
    const id = this.props.id;
    const filtered = store.comments.filter(comment => comment.noteId === id);

    if (this.commentform) {
      iscomments = (
        <div>
          {filtered
            .reverse()
            .map(comment => (
              <Comment
                key={comment._id}
                noteId={id}
                name={comment.name}
                comment={comment.comment}
              />
            ))}
          <FormComment comments={comments} noteId={id} />
        </div>
      );
    } else {
      iscomments = null;
    }

    return (
      <div>
        <h1>{this.props.date}</h1>
        <article>{this.props.note}</article>

        <input
          type="submit"
          onClick={id => {
            this.toggleCommentForm(id);
          }}
          defaultValue="Leave Comment"
          className="togglebutton"
        />
        <br />
        {iscomments}
      </div>
    );
  }
}
