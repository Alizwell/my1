import { combineReducers } from "redux";
import userContext from './user';
import project from './project';
import detail from './detail';

export default combineReducers({
    userContext,
    project,
    detail
});
