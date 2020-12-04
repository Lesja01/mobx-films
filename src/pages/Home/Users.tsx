import * as React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { hot } from "react-hot-loader";

import Spinner from "../../components/Spinner/Spinner";
import { userStore } from "../../stores/userStore";

export interface IUsersProps {
  userStore: userStore;
}

export interface IUsersState {}

interface IUser {
  id: number;
  name: string;
}

@inject("userStore")
@observer
class Users extends React.Component<IUsersProps, IUsersState> {
  store: userStore = this.props.userStore;

  componentDidMount() {
    this.store.getUsers({ page: 1 });
  }

  renderUser() {
    return this.store.users.map((user: IUser) => (
      <div className="item" key={user.id}>
        <div className="line"></div>
        <p>
          <Link
            to={{
              pathname: `/user/${user.id}`,
              state: { id: user.id },
            }}
          >
            {user.name}
          </Link>
        </p>
      </div>
    ));
  }

  handlePrePage() {
    this.store.getUsers({ page: this.store.page - 1 });
  }

  handleNextPage() {
    this.store.getUsers({ page: this.store.page + 1 });
  }

  paginate() {
    const { page, total_page_num } = this.store;
    if (total_page_num === 1) return;

    return (
      <div className="pagination">
        {page === 1 ? (
          <button className="pre" disabled onClick={() => this.handlePrePage()}>
            ←
          </button>
        ) : (
          <button className="pre" onClick={() => this.handlePrePage()}>
            ←
          </button>
        )}
        {total_page_num === page ? (
          <button
            className="next"
            disabled
            onClick={() => this.handleNextPage()}
          >
            →
          </button>
        ) : (
          <button className="next" onClick={() => this.handleNextPage()}>
            →
          </button>
        )}
      </div>
    );
  }

  renderUsers() {
    return (
      <div>
        {this.store.pageLoading ? (
          <Spinner />
        ) : (
          <div className="list">
            {this.renderUser()}
            {this.paginate()}
          </div>
        )}
      </div>
    );
  }

  render() {
    return <div className="users">{this.renderUsers()}</div>;
  }
}

export default hot(module)(Users);
