import { SET_DETAIL } from "../const/detail";
const initialState = {
  
};

const reducer = (state = initialState, action)=>{
  const { type, payload } = action;

  switch (type) {
    case SET_DETAIL: {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
}

export default reducer;