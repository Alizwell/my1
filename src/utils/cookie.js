import { cookies } from 'brownies';
import moment from 'moment';

export const logoutCookie = ()=>{
  delete cookies.tokenInfo;
  delete cookies.userInfo;
}

export const setTokenInfoToCookie = (tokenInfo) => {
  cookies.tokenInfo = tokenInfo;
}

export const setUserInfoToCookie = (userInfo) => {
  cookies.userInfo = userInfo;
}

export const getTokenInfoFromCookie = ()=>{
  return cookies.tokenInfo;
}

const isTokenExpired = ()=>{
  // console.log(cookies.tokenInfo, 'cookies.tokenInfo');
  return ( cookies.tokenInfo && cookies.tokenInfo['.expires']
    ? moment().isBefore(cookies.tokenInfo['.expires'])
    : false )
}

export const isTokenValid = ()=>{
  return (
    cookies.tokenInfo 
      ? isTokenExpired()
      : false
  )
}

