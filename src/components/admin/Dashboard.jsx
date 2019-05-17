import React, { Component } from "react";
import { isLoggedIn } from "../../auth/utility";
import { Redirect } from "react-router-dom";
import { getLocalToken } from "../../auth/utility";
import "../admin/stylingAdmin.css";

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
        <h1 className="title">Me</h1>
        <section className="profile">
          {this.state.user && (
            <section className="list user">
              {this.state.user.username}
              {this.state.user.role === "admin" && (
                <p>
                  {" "}
                  <br /> Hello Boss
                </p>
              )}

              {this.state.user.role === "user" && (
                <p>
                  Hello Prince Charming
                  <br />
                  Welcome to our community, feel ready to share your fabulous
                  product experience?
                  <div class="field is-grouped">
                    <a href="/add-product" class="button is-link">
                      Yahhhhh!!!!!
                    </a>
                  </div>
                  <div class="field is-grouped">
                    <a href="/all-products" class="button is-link">
                      Not ready yet, I would like to see others' experience at
                      first :)
                    </a>
                  </div>
                </p>
              )}
            </section>
          )}
        </section>
      </React.Fragment>
    ) : (
      <Redirect to="/login" />
    );
  }
}
