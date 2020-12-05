import "./styles/index.less";

import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";

import Home from "./pages/Home";
import User from "./pages/User";

const App = () => (
  <Switch>
    <Route path="/user" component={User} />
    <Route path="/" component={Home} />
  </Switch>
);

export default hot(module)(App);
