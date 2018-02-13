import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Register extends Component{
  render(){
    return(
    <app>  <section>
        <label type="text" name="username" value="username" disabled>Username</label>
        <input type="text" name="name" />
          <label type="text" name="password" value="password" disabled>Password</label>
        <input type="password" name="password" />
        <label type="text" name="passwordconfirmation" value="passwordconfirmation" disabled>Password Confirmation</label>
      <input type="password" name="passwordconfirmation" />

    </section>
  <br/>
  <Link className="button" to="/login"><u>Back To Login</u></Link>
  </app>
    )
  }
}
