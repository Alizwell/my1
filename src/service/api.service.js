import axios from "axios";
import { getTokenFromStore } from "../redux/selectors/user.select";
import qs from "qs";

// const baseURL = "http://39.98.108.23/webapi";
const baseURL = "http://localhost:3000/webapi/";
// application/x-www-form-urlencoded; charset=utf-8;
// application/json; charset=utf-8;
let headers = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
};

let api = axios.create({
  headers
});

// http request interceptors
api.interceptors.request.use(
  config => {
    const userToken = getTokenFromStore();
    config.baseURL = baseURL;
    console.log("userToken:", userToken);
    if (userToken) {
      config.headers.Authorization = `bearer ${userToken}`;
      console.log(`bearer ${userToken}`);
    }
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  err => {
    console.error(err);
    return Promise.reject(err);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  res => res,
  err => {
    console.error(err);
    //common place to handle errors, don't catch the http error yourself if you have no special case.
    //do the unify http error hanlding logic here.
    return Promise.reject(err);
  }
);

export default api;
