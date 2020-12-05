import axios from "axios";
import * as qs from "qs";
import { IAxiosRequestConfig, IHttpResquest } from "../../interfaces";

enum HTTPERROR {
  LOGICERROR,
  TIMEOUTERROR,
  NETWORKERROR,
}

const DEFAULTCONFIG = {
  baseURL: process.env.BASE_URL,
};

const isSuccess = (v: any, res: any) => {
  return true;
};

const http: IHttpResquest = {};
const methods = ["get", "post", "put", "delete"];
const token = "f9e7e61d-0c64-40b0-91fd-40453322f152";

methods.forEach((method) => {
  http[method] = (url: string, data: any, baseUrl?: string) => {
    const axiosConfig: IAxiosRequestConfig = {
      method: method,
      url,
      baseURL: baseUrl || DEFAULTCONFIG.baseURL,
      headers: {
        // "Access-Control-Allow-Origin": "*",
        // Accept: "application/json",
        // "X-Requested-With": "XMLHttpRequest",
        // name: "X-API-KEY",
        // value: "f9e7e61d-0c64-40b0-91fd-40453322f152",
        // Authorization: `Bearer ${token}`,
      },
    };
    const instance = axios.create(DEFAULTCONFIG);

    // Add a request interceptor
    instance.interceptors.request.use(
      (cfg) => {
        const queryData = {
          // queryData add here
        };
        // cfg.url += `&${qs.stringify(queryData)}`
        cfg.params = {
          ...cfg.params,
          ...queryData,
        };
        return cfg;
      },
      (error) => Promise.reject(error)
    );
    // Add a response interceptor
    instance.interceptors.response.use(
      (response) => {
        let rdata = response.data;
        if (!isSuccess(method, rdata)) {
          const _err = {
            msg: rdata.msg,
            code: rdata.code,
            type: HTTPERROR[HTTPERROR.LOGICERROR],
            config: response.config,
          };
          return Promise.reject(_err);
        }

        rdata = response.data;

        return rdata;
      },
      (error) => {
        const _err = {
          msg: error.message || "error",
          type: /^timeout of/.test(error.message)
            ? HTTPERROR[HTTPERROR.TIMEOUTERROR]
            : HTTPERROR[HTTPERROR.NETWORKERROR],
          config: error.config,
        };
        return Promise.reject(_err);
      }
    );
    if (method === "get") {
      axiosConfig.params = data;
    } else if (data instanceof FormData) {
      axiosConfig.data = data;
    } else {
      axiosConfig.data = qs.stringify(data);
    }
    axiosConfig.startTime = new Date();

    return instance
      .request(axiosConfig)
      .then((res) => res)
      .catch((err) => {
        console.error(err.response || err.msg || err.stack || "error");
        return Promise.reject({
          err,
          stack: err.msg || err.stack || "",
        });
      });
  };
});

export default http;
