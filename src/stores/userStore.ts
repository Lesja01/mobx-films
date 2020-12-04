import { action, observable } from "mobx";

import { IPlainObject } from "../interfaces";
import { StoreExt } from "../services/reactExt";

class userStore extends StoreExt {
  @observable pageLoading: boolean = false;
  @observable users: Array<any> = [];
  @observable user: IPlainObject = {};

  @action getUsers = async (options: { page?: number; per_page?: number }) => {
    this.pageLoading = true;

    try {
      const res = await this.api.getUsers({});
      this.user = {};
      this.users = res;
    } catch (error) {
      throw error;
    }

    this.pageLoading = false;
  };

  @action getUser = (id: number) => {
    this.user = this.users.find((item) => item.id === id);
  };
}

const userStore = new userStore();

export { userStore as default, userStore };
