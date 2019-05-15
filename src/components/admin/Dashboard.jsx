import React, { Component } from "react";
import { isLoggedIn } from "../../auth/utility";
import { Redirect } from "react-router-dom";
import { getLocalToken } from "../../auth/utility";

export default class Dashboard extends Component {
  state = { user: null };

  componentDidMount() {
    const userInfos = getLocalToken();
    // console.log("infos =", userInfos.username);
    this.setState({ user: userInfos });
   
  }

  
  render() {
    return isLoggedIn() ? (
      <React.Fragment>
        <h1 className="title">My Profile</h1>
        {this.state.user && (
          <section className="list user">
            {this.state.user.username}
            { this.state.user.role === "admin" && <p>I am an admin</p>}
          </section>        
        )}
      </React.Fragment>
    ) : (
      <Redirect to="/login" />
    );
  }
}


