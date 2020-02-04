import { SET_TOKEN, SET_USER_INFO } from "../const/user";

const initialState = {
  token: "",
  uesrInfo: {}
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: payload
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
      console.error("no action find");
      return state;
  }
};

export default reducer;
