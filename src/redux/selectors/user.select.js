import store from "../index.js";
import { cookies } from "brownies";

export const getUser = state => state.userContext;
export const getToken = state => (getUser(state) ? getUser(state).token : "");
export const getTokenFromStore = () => {
  const storeToken = getToken(store.getState());
  const cookieToken = cookies.token ? cookies.token : "";
  return storeToken ? storeToken : cookieToken;
};
