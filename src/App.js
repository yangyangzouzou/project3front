import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "./components/log/Login";
import Signup from "./components/log/Signup";
import FormProduct from "./components/product/FormProduct";
import EditFormProduct from "./components/product/EditFormProduct";
import { isLoggedIn } from "./auth/utility";
import Home from "./components/functional/Home"
import NavBar from "./components/functional/NavBar"
import ProductList from "./components/product/List"
import Dashboard from "./components/admin/Dashboard"
import DashboardProduct from "./components/product/DashboardProduct";
import 'bulma/css/bulma.css';
import Conditions from "./components/functional/conditions";
import "./App.css"

const history = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    this.setState({ isLoggedIn: isLoggedIn() });
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({ isLoggedIn: isLoggedIn() });
    });
  }

  render() {
    return (
      <div className="App">
        <header id="header_main">
          <NavBar isLoggedIn={isLoggedIn} history={history} />
        </header>
        <main id="content_main">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/edit/:id" component={EditFormProduct} />
            <Route path="/add-product" component={FormProduct} />
            <Route path="/all-products" component={ProductList} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/conditions" component={Conditions} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/dashboard-product" component={DashboardProduct} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);

//test 3