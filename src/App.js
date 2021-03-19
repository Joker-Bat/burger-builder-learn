import React, { Component } from "react";

import "./App.module.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";

// Lazy Loading
import AsyncComponent from "./hoc/asyncComponent/asyncComponent";

// Router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Redux
import * as actionCreators from "./store/actions/index";
import { connect } from "react-redux";

// Lazy loading Components
const AsynAuth = AsyncComponent(() => import("./containers/Auth/Auth"));
const AsyncOrders = AsyncComponent(() => import("./containers/Orders/Orders"));
const AsyncCheckout = AsyncComponent(() =>
  import("./containers/Checkout/Checkout")
);

class App extends Component {
  componentDidMount = () => {
    this.props.onAuthState();
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={AsynAuth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={AsyncCheckout} />
          <Route path="/orders" component={AsyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={AsynAuth} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Router>
          <Layout>{routes}</Layout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthState: () => dispatch(actionCreators.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
