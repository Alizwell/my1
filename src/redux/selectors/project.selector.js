// getBUGUID, getProjGUID
import store from "../index.js";
import { cookies } from "brownies";

export const getProject = state => state.project;

export const getBuGUID = state => (getProject(state) ? getProject(state).buGUID : []);
export const getProjGUID = state => (getProject(state) ? getProject(state).projGUID : []);

export const getBuGUIDFromStore = () => {
  return getBuGUID(store.getState());
}; 

export const getProjGUIDFromStore = ()=>{
  return getProjGUID(store.getState());
}

export const getBuGUIDFromCookie = ()=>{
  return cookies.buGUID ? cookies.buGUID : [];
}

export const getProjGUIDFromCookie = ()=>{
  return cookies.projGUID ? cookies.projGUID : [];
}

export const getProjectInfo = ()=>{
  const buGUID = getBuGUIDFromStore().length > 0 ?  getBuGUIDFromStore() : getBuGUIDFromCookie();
  const projGUID = getProjGUIDFromStore().length > 0 ? getProjGUIDFromStore() : getProjGUIDFromCookie();
  return [buGUID, projGUID];
}