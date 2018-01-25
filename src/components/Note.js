import React, { Component } from 'react';


const Note = (props) =>{

  return(
    <div >
      <h1>{props.date}</h1>
      <article>
        {props.note}
      </article>
    </div>
  )
}
export default Note;
