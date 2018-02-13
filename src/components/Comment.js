import React, { Component } from "react";

const Comment = props => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p> {props.comment}</p>
    </div>
  );
};
export default Comment;
