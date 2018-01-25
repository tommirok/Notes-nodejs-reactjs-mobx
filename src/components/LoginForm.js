import React, { Component } from 'react';

export default class LoginForm extends Component{
  render(){
    return(
      <form>
        <input type="text" name="name"></input>
        <input type="password" name="name"></input>
      </form>
    )
  }
}
