import { SET_TOKEN, SET_USER_INFO } from "../const/user";

const initialState = {
  tokenInfo: {
    username: '',
    token: ''
  },
  uesrInfo: {}
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
    default:
      return state;
  }
};

export default reducer;
