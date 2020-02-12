import { cookies } from "brownies";

export const userManager = {
  checkUserAuthorized: () => {
    //we need to verify the exist of token and username in the cookie
    let tokenInfo = cookies.tokenInfo;
    return tokenInfo ? true : false;
  }
};
