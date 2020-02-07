import api from "./api.service";
import md5 from "md5";

export const tokenValidate = ({ username, token }) =>
  api.get("/api/Account/QueryTokenValidate", {
    params: {
      username,
      token
    }
  });

export const login = ({ name, password }) =>
  api.post("api/Account/Login", {
    name: String(name),
    password: md5(String(password)).toUpperCase()
  });

export const testLogin = () => login({ name: 51021, password: 20191008 });
