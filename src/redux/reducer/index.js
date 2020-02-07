import { combineReducers } from "redux";
import userContext from './user';
import project from './project';

export default combineReducers({
    userContext,
    project
});
