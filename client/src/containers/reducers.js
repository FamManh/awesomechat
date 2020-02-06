import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import layout from "./AuthPage/reducer";
import auth from './AuthPage/reducer';

export default history =>
    combineReducers({
        router: connectRouter(history),
        layout,
        auth
    });
