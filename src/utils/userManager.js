import { tokenValidate } from "../service/account.service";
import { cookies } from "brownies";

export const userManager = {
  checkUserAuthorized: () => {
    //we need to verify the exist of token and username in the cookie
    let tokenInfo = cookies.tokenInfo;
    return tokenInfo ? true : false;
    // let {username, token} = tokenInfo;
    // return tokenValidate({username, token}).then(data => {
    //   // return data.data.HttpContent;
    //   return true;
    // });
  }
};
