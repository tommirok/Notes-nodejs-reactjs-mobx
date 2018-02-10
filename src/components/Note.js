import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Comment from "./Comment"
import FormComment from "./FormComment"
@inject('noteStore')@observer
export default class Note extends Component{
  render(){
let comments = this.props.noteStore.comments;
const store = this.props.noteStore;


  return(
    <div >
      <h1>{this.props.date}</h1>
      <article>
        {this.props.note}
      </article>
      <div>
      {comments.reverse().map(comment => <Comment name={comment.name} comment={comment.comment}/>)}
    </div>
      <input type="submit" onClick={store.toggleCommentForm} defaultValue="Leave Comment" className="togglebutton"/>
      <br/>
    {store.commentform ? <FormComment/> :  null}
    </div>
  )
  }
}
