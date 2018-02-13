import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';

export default class Login extends Component{
  render(){
    return(

    <app>  <LoginForm />
<br />
    <Link className="button" to="/register"><u>Sign Up</u></Link>
  </app>

    )
  }
}
