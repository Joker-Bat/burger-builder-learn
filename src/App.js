import React, { Component } from "react";

import "./App.module.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
// Router
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Layout>
            <Route exact path="/" component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
