import React, { Component } from 'react';

export default class LoginForm extends Component{
  render(){
    return(
      <section>
        <label type="text" name="username" value="username" disabled>Username</label>
        <input type="text" name="name" />
          <label type="text" name="password" value="password" disabled>Password</label>
        <input type="password" name="password" />
      </section>
    )
  }
}
