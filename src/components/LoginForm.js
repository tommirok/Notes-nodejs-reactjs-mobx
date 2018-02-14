import React, { Component } from "react";
import { observer, inject } from "mobx-react";
@inject("userStore")
@observer
export default class LoginForm extends Component {
  render() {
    const store = this.props.userStore;
    return (
      <section>
        <label type="text" name="username" value="username" disabled>
          Username
        </label>
        <input
          type="text"
          name="name"
          onChange={e => {
            store.setUser(e);
          }}
          value={store.temp}
        />
        <label type="text" name="password" value="password" disabled>
          Password
        </label>
        <input
          type="password"
          onChange={e => {
            store.setPass(e);
          }}
          name="password"
          value={store.temp}
        />i
        <input
          type="submit"
          value="Login"
          className="button"
          name="reg"
          onClick={e => {
            store.regUser(e);
          }}
        />
      </section>
    );
  }
}
