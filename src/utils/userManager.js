import { tokenValidate } from "../service/account";
export const userManager = {
  checkUserAuthorized: token => {
    return tokenValidate(token).then(data => {
      return false;
    });
  }
};
