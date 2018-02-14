import React, { Component } from "react";
import { Redirect } from 'react-router'
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
@inject("userStore")
@observer
export default class Register extends Component {

  render() {
    const store = this.props.userStore;
    let regorno;
    store.success ? regorno = (<Redirect to="/"/>)  :
regorno =
    (<app>
      {" "}
      <section>
        <label name="username" value="username" disabled>
          Username
        </label>
        <input
          type="text"
          name="name"
          value={store.temp}
          onChange={e => {
            store.setUser(e)
          }}
        />
        <label name="password" value="password" disabled>
          Password
        </label>
        <input
          type="password"
          name="password"
          value={store.temp}
          onChange={e => {
            store.setPass(e)
          }}
        />
        <label

          name="passwordconfirmation"
          value="passwordconfirmation"

          disabled
        >
          Password Confirmation
        </label>
        <input
          type="password"
          name="passwordconfirmation"
          value={store.temp}
          onChange={e => {
            store.setPassConf(e)
          }}
        required/>
      <br />
      <br />

        <input
          type="submit"
          className="button"
          name="reg"
          onClick={e => {
            store.regUser(e)
          }}
          />
      </section>
      <br />
      <br />
      <Link  to="/login">
        <u>Back To Login</u>
      </Link>
    </app>)
    return(
    <app> {regorno}</app>
    );
  }
}
