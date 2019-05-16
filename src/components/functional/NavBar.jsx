import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "./../../auth/ajax";
import { logUserOut } from "./../../auth/utility";
import "bulma/css/bulma.css";
import { isLoggedIn } from "../../auth/utility";
import logo from "../../img/logo.png";
import "./styling.css";

export default class NavMain extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    logout()
      .then(res => {
        console.log(res);
        logUserOut();
        this.props.history.push("/");
        this.props.history.push("/login");
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return isLoggedIn() ? (
      <section>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-start">
            <div>
              <img src={logo} width="56" height="14" alt="logo" />
            </div>
            <NavLink className="navbar-item" to="/" exact>
              Home
            </NavLink>
            <div className="navbar-item has-dropdown is-hoverable">
              <nav
                className="navbar"
                role="navigation"
                aria-label="dropdown navigation"
              >
                <div className="navbar-item has-dropdown is-hoverable">
                  <NavLink className="navbar-link">Products</NavLink>

                  <div className="navbar-dropdown">
                    <NavLink className="navbar-item" to="/dashboard-product">
                      Manage Product
                    </NavLink>
                    <NavLink className="navbar-item" to="/all-products">
                      View Products
                    </NavLink>
                    <NavLink className="navbar-item" to="/add-product">
                      Product Form
                    </NavLink>

                    <hr className="navbar-divider" />
                    <div className="navbar-item">More features come soon</div>
                  </div>
                </div>
              </nav>

              <NavLink className="navbar-item" to="/dashboard">
                Me
              </NavLink>

              <NavLink
                className="navbar-item"
                to="/logout"
                onClick={this.handleLogout}
              >
                Logout
              </NavLink>
            </div>
          </div>
        </nav>
      </section>
    ) : (
      <section>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-start">
            <div>
              <img src={logo} width="56" height="14" alt="logo" />
            </div>
            <NavLink className="navbar-item" to="/all-products">
              Have a look
            </NavLink>

            <NavLink className="navbar-item" to="/signup">
              Sign Up
            </NavLink>

            <NavLink className="navbar-item" to="/login">
              Login
            </NavLink>
          </div>
        </nav>
      </section>
    );
  }
}
