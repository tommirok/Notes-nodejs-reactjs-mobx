import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import Comment from "./Comment"

@inject('noteStore')@observer
export default class FormComment extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    store = this.props.noteStore;
    console.log(store.comments);
    return <section>
      <div>
      {store.comments.reverse().map(comment => <Comment key={comment._id} name={comment.name} comment={comment.comment}/>)}
    </div>
      <textarea type="text" onChange={(e)=>{store.setComment(e)}}/>
      <input className="button" type="submit" defaultValue="Send" onClick={()=>{store.sendComment()}}></input>
    </section>
  }
}
