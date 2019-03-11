import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import Navbar from "./components/Navbar";
import ProductsList from "./components/ProductsList";
import Details from "./components/Details";
import Cart from "./components/Cart";
import Default from "./components/Default";
import Modal from "./components/Modal";
// Components

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />

        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>

        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
