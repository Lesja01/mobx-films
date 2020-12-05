import "./index.less";

import * as React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { hot } from "react-hot-loader";

import User from "../User";
import Users from "./Users";
import { UserStore } from "../../stores/userStore";

export interface IHomeProps {
  userStore: UserStore;
  match: {
    url: string;
  };
}

export interface IHomeState {}

@inject("userStore")
@observer
class Home extends React.Component<IHomeProps, IHomeState> {
  render() {
    const { match } = this.props;

    return (
      <div className="home">
        <header>
          <Link to={`${match.url}`}>Home</Link>
        </header>

        <Route>
          <Switch>
            <Route path="/" component={Users} />
            <Route path="/user/:id" component={User} />
          </Switch>
        </Route>

        <footer>
          <p>Here you can see users info </p>
        </footer>
      </div>
    );
  }
}

export default hot(module)(Home);
