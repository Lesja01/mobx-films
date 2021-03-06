import "./index.less";
import "antd/dist/antd.css";

import * as React from "react";
import { hot } from "react-hot-loader";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Avatar, Rate, Button, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { UserStore } from "../../stores/userStore";
import { IPlainObject } from "../../interfaces";
import Spinner from "../../components/Spinner/Spinner";

export interface IUserProps {
  userStore: UserStore;
  location: IPlainObject;
}

export interface IUserState {}

@inject("userStore")
@observer
class User extends React.Component<IUserProps, IUserState> {
  store = this.props.userStore;

  componentDidMount() {
    const id = this.props.location.state.id;
    this.props.userStore.getUser(id);
  }

  renderContent() {
    const user = this.store.user;

    return (
      <div className="info">
        <h1 dangerouslySetInnerHTML={{ __html: user.name }} />
        <Divider className="divider" />
        <Avatar className="avatar" size={64} icon={<UserOutlined />} />
        <Rate className="rate" defaultValue={3} allowHalf />
        <h3>Username: {user.username} </h3>
        <p>Phone: {user.phone}</p>
        <p>Email: {user.email}</p>
        <p>Website: {user.website}</p>
      </div>
    );
  }

  render() {
    return (
      <div className="user">
        {this.store.pageLoading ? <Spinner /> : this.renderContent()}
        <Link type="button" to={{ pathname: `/` }}>
          <Button type="primary" className="btn">
            Каталог
          </Button>
        </Link>
      </div>
    );
  }
}

export default hot(module)(User);
