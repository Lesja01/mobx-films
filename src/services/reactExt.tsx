import * as React from "react";
import * as api from "./api";

export class StoreExt {
  readonly api = api;
  readonly $message = "yes";
  readonly $notification = "notification";
}
