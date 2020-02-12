import { SET_TOKEN, SET_USER_INFO, SET_AUTH } from "../const/user";
import { isTokenValid } from "../../utils/cookie";

export const setToken = payload => {
  return {
    type: SET_TOKEN,
    payload
  };
};

export const setUserInfo = payload => ({
  type: SET_USER_INFO,
  payload
});

export const updateAuth = () => {
  let payload = isTokenValid();
  return {
    type: SET_AUTH,
    payload
  };
};

export const setAuth = payload => ({
  type: SET_AUTH,
  payload
});
