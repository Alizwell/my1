import { SET_TOKEN, SET_USER_INFO, SET_AUTH } from "../const/user";
import { cookies } from 'brownies';

const initialState = {
  tokenInfo: {
    username: '',
    token: ''
  },
  uesrInfo: {},
  isUserAuthorized: cookies.tokenInfo ? true : false
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TOKEN: {
      return {
        ...state,
        tokenInfo: {
          ...payload
        }
      };
    }
    case SET_USER_INFO: {
      return {
        ...state,
        uesrInfo: {
          ...state.uesrInfo,
          ...payload
        }
      };
    }
    case SET_AUTH: {
      return {
        ...state,
        isUserAuthorized: payload
      }
    }
    default:
      return state;
  }
};

export default reducer;
