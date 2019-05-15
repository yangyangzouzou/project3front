import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "./../../auth/ajax";
import { logUserOut } from "./../../auth/utility";
import "bulma/css/bulma.css";
import { isLoggedIn } from "../../auth/utility";

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
      <React.Fragment>
        <nav
          class="navbar is mobile"
          role="navigation"
          aria-label="main navigation"
        >
          <div class="navbar-brand">
            <NavLink
              to="/"
              role="button"
              class="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true"> </span>
              <span aria-hidden="true" />
            </NavLink>
          </div>

          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <NavLink
                className="navbar-item"
                activeClassName="is-active"
                to="/"
                exact
              >
                Home
              </NavLink>
              <div class="navbar-item has-dropdown is-hoverable">
                <nav
                  class="navbar"
                  role="navigation"
                  aria-label="dropdown navigation"
                >
                  <div class="navbar-item has-dropdown is-hoverable">
                    <NavLink class="navbar-link">Products</NavLink>

                    <div class="navbar-dropdown">
                      <NavLink
                        className="navbar-item"
                        activeClassName="is-active"
                        to="/dashboard-product"
                      >
                        Manage Product
                      </NavLink>
                      <NavLink
                        className="navbar-item"
                        activeClassName="is-active"
                        to="/all-products"
                      >
                        View Products
                      </NavLink>
                      <NavLink
                        className="navbar-item"
                        activeClassName="is-active"
                        to="/add-product"
                      >
                        Product Form
                      </NavLink>

                      <hr class="navbar-divider" />
                      <div class="navbar-item">More features come soon</div>
                    </div>
                  </div>
                </nav>

                <NavLink
                  className="navbar-item"
                  activeClassName="is-active"
                  to="/dashboard"
                >
                  Me
                </NavLink>

                <NavLink
                  className="navbar-item"
                  activeClassName="is-active"
                  to="/logout"
                  onClick={this.handleLogout}
                >
                  Logout
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      </React.Fragment>
    ) : (
      <nav
        class="navbar is mobile"
        role="navigation"
        aria-label="main navigation"
      >
        <br />
        <div class="columns is-mobile">
          <NavLink className="column" to="/all-products">
            Have a look
          </NavLink>

          <NavLink className="column" to="/signup">
            Signup
          </NavLink>

          <NavLink className="column" id="login" to="/login">
            Login
          </NavLink>
        </div>
      </nav>
    );
  }
}
