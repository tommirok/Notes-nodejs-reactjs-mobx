import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';

export default class Login extends Component{
  render(){
    return(

    <app>  <LoginForm />
<br />
    <Link  to="/register"><u>Register Here</u></Link>
  </app>

    )
  }
}
