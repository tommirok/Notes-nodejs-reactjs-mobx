import React, { Component } from "react";
import { observer, inject } from 'mobx-react';

@inject('noteStore')@observer
export default class FormComment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    store = this.props.noteStore;
    return <section>
      <textarea type="text" onChange={(e)=>{store.setComment(e)}}/>
      <input className="button" type="submit" defaultValue="Send" onClick={(e)=>{store.sendComment(e)}}></input>
    </section>
  }
}
