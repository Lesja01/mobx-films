import "./index.less";

import * as React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { hot } from "react-hot-loader";

import NotFound from "../NotFound";
import User from "../User";
import Users from "./Users";
import { userStore } from "../../stores/userStore";

export interface IHomeProps {
  userStore: userStore;
  history: any;
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
          <Link to={`${match.url}users`}>Home</Link>
        </header>

        <Route>
          <Switch>
            <Route path="/users" component={Users} />
            <Route path="/user/:id" component={User} />
            <Route component={NotFound} />
          </Switch>
        </Route>

        <footer>
          <p>Here you can see Usersusers </p>
        </footer>
      </div>
    );
  }
}

export default hot(module)(Home);
