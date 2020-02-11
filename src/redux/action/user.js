import { SET_TOKEN, SET_USER_INFO, SET_AUTH } from "../const/user";
import { userManager } from "../../utils/userManager";
import { cookies } from "brownies";

export const setToken = payload => {
  cookies.tokenInfo = payload;
  return {
    type: SET_TOKEN,
    payload
  };
};

export const setUserInfo = payload => ({
  type: SET_USER_INFO,
  payload
});

const checkUserAuthorized = () => {
  return userManager.checkUserAuthorized();
};

export const updateAuth = () => {
  let payload = checkUserAuthorized();
  console.log("payload: ", payload);
  return {
    type: SET_AUTH,
    payload
  };
};

export const setAuth = payload => ({
  type: SET_AUTH,
  payload
});
