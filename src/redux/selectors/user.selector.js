import store from "../index.js";
import { cookies } from "brownies";

export const getUser = state => state.userContext;
export const getToken = state => (getUser(state) ? getUser(state).tokenInfo.token : "");
export const getTokenFromStore = () => {
  const storeToken = getToken(store.getState());
  const cookieToken = cookies.tokenInfo ? cookies.tokenInfo.access_token : "";
  return storeToken ? storeToken : cookieToken;
}; 
