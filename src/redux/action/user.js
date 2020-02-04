import { SET_TOKEN, SET_USER_INFO } from "../const/user";
import { cookies } from "brownies";

export const setToken = payload => {
  cookies.token = payload;
  return {
    type: SET_TOKEN,
    payload
  };
};

export const setUserInfo = payload => ({
  type: SET_USER_INFO,
  payload
});
