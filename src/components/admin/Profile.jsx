import React, { Component } from "react";
import { getUser } from "../../api/apiHandler";


export default class Profile extends Component {
  state = { user: null };
  componentDidMount() {
    getUser()
      .then(res => {
        console.log("ici", res)
        this.setState({ user: res.data})
      })
      .catch(err => console.error(err.response));
  }
  render() {
    return (
      <section className="list user">
          {this.state.user.name}
      </section>
    );
  }
}
