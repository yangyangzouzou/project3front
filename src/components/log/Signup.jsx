import React, { Component } from "react";
import { signup } from "../../auth/ajax";
import "./form.css"

export default class Signup extends Component {
  state = {
    username: "",
    email: "test@test.com",
    password: "",
  };

  handleInput = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    signup({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    })
      .then(res => {
        console.log(res);
        if (res.data._id) {
          this.props.history.push("/dashboard");
        } else {
          console.warn("something went wrong")
        }
      })
      .catch(err => console.error(err.response));
  };

  render() {
    return (
      <React.Fragment>
          <br></br>
        <h1 className="title">Sign Up</h1>
        <form className="form" onSubmit={this.handleSubmit}>

  
<div class="field">
  <label class="label">Username</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="text" placeholder="Text input" name="username" onChange={this.handleInput}/>
    <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
  </div>
<p class="help is-success">Choose a sassy name :p</p>
</div>

<div class="field">
  <label class="label">Email</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="email" placeholder="Example: name@gmail.com" name="email"  onChange={this.handleInput}/>
    <span class="icon is-small is-left">
      <i class="fas fa-check"></i>
    </span>
  </div>
</div>

<div class="field">
  <label class="label">Confirme your email</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="email" placeholder="Example: name@gmail.com"/>
    <span class="icon is-small is-left">
      <i class="fas fa-check"></i>
    </span>
  </div>
</div>

<div class="field">
  <label class="label">Password</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="password" placeholder="Example: IamAcoolPerson75" name="password" onChange={this.handleInput}/>
    <span class="icon is-small is-left">
      <i class="fas fa-check"></i>
    </span>
  </div>
</div>

<div class="field">
  <label class="label">Confirme your password</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="password" placeholder="Example: IamAcoolPerson75"/>
    <span class="icon is-small is-left">
      <i class="fas fa-check"></i>
    </span>
  </div>
</div>

<div class="field">
  <div class="control">
    <label class="checkbox">
      <input type="checkbox"/>
      I agree to the <a href="/conditions">terms and conditions</a>
    </label>
  </div>
</div>

<div class="field is-grouped">
  <div class="control"></div>
          <button class="button is-link">Submit</button>
          </div>
  <div class="control">
  <a href = '/' class="button is-text" >Cancel</a>
  </div>
        </form>
      </React.Fragment>
    );
  }
}
