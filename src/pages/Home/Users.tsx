import * as React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { hot } from "react-hot-loader";

import Spinner from "../../components/Spinner/Spinner";
import { UserStore } from "../../stores/userStore";

export interface IUsersProps {
  userStore: UserStore;
}

export interface IUsersState {}

interface IUser {
  id: number;
  name: string;
}

@inject("userStore")
@observer
class Users extends React.Component<IUsersProps, IUsersState> {
  store: UserStore = this.props.userStore;

  componentDidMount() {
    this.store.getUsers();
  }

  renderUser() {
    return this.store.users.map((user: IUser) => (
      <div className="user" key={user.id}>
        <Link
          to={{
            pathname: `/user/${user.id}`,
            state: { id: user.id },
          }}
        >
          {user.name}
        </Link>
      </div>
    ));
  }

  renderUsers() {
    return (
      <div>
        {this.store.pageLoading ? (
          <Spinner />
        ) : (
          <div className="users">{this.renderUser()}</div>
        )}
      </div>
    );
  }

  render() {
    return <div className="users-container">{this.renderUsers()}</div>;
  }
}

export default hot(module)(Users);
