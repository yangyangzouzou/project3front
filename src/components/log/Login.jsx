import React, { Component } from "react";
import { login } from "../../auth/ajax";
import { setLocalToken } from "../../auth/utility";
import "./form.css"

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInput = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    login({ username: this.state.username, password: this.state.password })
      .then(res => {
        if (res.data._id) {
          setLocalToken(res.data);
          this.props.history.push("/dashboard");
        } else {
          this.props.history.push("/login");
        }
      })
      .catch(err => this.props.history.push("/login"));
  };

  render() {
    return (
      <React.Fragment>
        <br></br>
        <h1 className="title">Login</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="clickable label" htmlFor="username">
            username
          </label>
          <input
            className="input"
            id="username"
            type="username"
            name="username"
            onChange={this.handleInput}
          />
          <label className="clickable label" htmlFor="password">
            password
          </label>
          <input
            className="input"
            id="password"
            type="password"
            name="password"
            onChange={this.handleInput}
          />
          <div class="field is-grouped">
          <button class="button is-link">OK</button>
          <br/>
          <a href = '/signup' class="button is-text" >You don't have an account? 3 seconds to sign up</a>
          </div>
        </form>
      </React.Fragment>
    );
  }
}