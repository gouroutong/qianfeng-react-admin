import axios from "axios";
import { getToken } from "./auth";

const instance = axios.create({
  // baseURL: "http://47.107.230.235:3002",
  baseURL: "http://localhost:3002",
  timeout: 15000,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers["authorization"] = "Bearer" + getToken();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data'
    const {  errMsg, result } = response.data;
    if (!errMsg) {
      return result;
    }
    return Promise.reject(errMsg);
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

/**
 *
 * @param {*} url 请求地址
 * @param {*} params
 */
export function get(url, params) {
  return instance.get(url, {
    params,
  });
}

export function post(url, data) {
  return instance.post(url, data);
}

export function put(url, data) {
  return instance.put(url, data);
}

export function del(url) {
  return instance.delete(url);
}
