import axios from "axios";
import { getTokenFromStore } from "../redux/selectors/user.selector";
import { getProjectInfo } from "../redux/selectors/project.selector";
import qs from "qs";

// const baseURL = "http://39.98.108.23/webapi/";
// const baseURL = "http://39.98.108.23/webapi_20200217/";
// const baseURL = "http://localhost:3000/webapi/";
const baseURL = "http://192.168.1.5:3000/webapi_20200217/";
// const baseURL = "http://192.168.1.5:3000/webapi/";
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
    let [bUGUID, projGUID] = getProjectInfo();
    config.baseURL = baseURL;
    if (userToken) {
      config.headers.Authorization = `bearer ${userToken}`;
    }
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    if (config.method === "get") {
      //teset code
      projGUID = [];
      bUGUID = [];
      //teset code
      config.params = {
        ...config.params,
        bUGUID: bUGUID.length > 0 ? bUGUID.join(",") : null,
        projGUID: projGUID.length > 0 ? projGUID.join(",") : null
      };
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
    console.error(err.response);
    // const history = useHistory();
    if (err.response && err.response.status === 401) {
      // history.push('/login');
      const href = window.location.href.split("#")[0] + "#/login";
      window.location.replace(href);
    }
    //common place to handle errors, don't catch the http error yourself if you have no special case.
    //do the unify http error hanlding logic here.
    return Promise.reject(err);
  }
);

export default api;
