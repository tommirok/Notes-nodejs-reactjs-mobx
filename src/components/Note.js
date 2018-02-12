import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import FormComment from "./FormComment";
let iscomments;
@inject('noteStore')@observer
export default class Note extends Component{
  constructor(props){
    super(props)
  }
  render(){
let comments = this.props.noteStore.comments;
const store = this.props.noteStore;
const id = this.props.id

  if((store.commentform) && (id == store.commentformId)){
    iscomments = <FormComment id={this.props.id}/>
  }else{
    iscomments = null;
  }

  return(
    <div >
      <h1>{this.props.date}</h1>
      <article>
        {this.props.note}
      </article>

      <input type="submit"
             onClick={this.props.onClick}
             defaultValue="Leave Comment"
             className="togglebutton"/>
      <br/>
      {iscomments}
    </div>
  )
  }
}
