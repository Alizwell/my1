import { ADD_BUGUID, ADD_PROJGUID, DEL_PROJGUID, DEL_BUGUID } from "../const/project";

const initialState = {
  buGUID: [],
  projGUID: []
};

const addItemToArray = (arr, item)=>{
  const index = arr.findIndex(val => val === item );
  return index > -1 ? arr : arr.concat(item);
}

const removeItemFromArray = (arr, item) => {
  let temp = arr.slice();
  const index = temp.findIndex(val => val === item );
  index > -1 && temp.splice(index, 1);
  return temp;
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_BUGUID: {
      return {
        ...state,
        buGUID: addItemToArray(state.buGUID, payload)
      };
    }
    case ADD_PROJGUID: {
      return {
        ...state,
        projGUID: addItemToArray(state.projGUID, payload)
      };
    }
    case DEL_PROJGUID: {
      return {
        ...state,
        projGUID: removeItemFromArray(state.projGUID, payload)
      };
    }
    case DEL_BUGUID: {
      return {
        ...state,
        buGUID: removeItemFromArray(state.buGUID, payload)
      };
    }
    default:
      return state;
  }
};

export default reducer;
