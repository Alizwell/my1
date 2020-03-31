import { cookies } from 'brownies';
import moment from 'moment';

export const logoutCookie = () => {
  console.log('clear cookie');
  delete cookies.tokenInfo;
  delete cookies.userInfo;
  delete cookies.projectInfo;
  delCookie();
}

export const setProjectInfo = ({buGUID, projGUID})=>{
  cookies.projectInfo = { buGUID, projGUID };
}

export const getProjectInfoFromCookie = ()=>{
  const { buGUID = null, projGUID = null} = cookies.projectInfo ? cookies.projectInfo : {};
  return { buGUID, projGUID };
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

function delCookie () {
  var keys = document.cookie.match(/[^ =;]+(?==)/g)
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除当前域名下的,例如：m.ratingdog.cn
      document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString() // 清除当前域名下的，例如 .m.ratingdog.cn
      document.cookie = keys[i] + '=0;path=/;domain=ratingdog.cn;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .ratingdog.cn
    }
  }
}
