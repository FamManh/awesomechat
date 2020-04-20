import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createBrowserHistory } from "history";
import createRootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { routerMiddleware } from "connected-react-router";

const history = createBrowserHistory();

const resetEnhanser = rootReducer => (state, action)=>{
    if(action.type !== "RESET") return rootReducer(state, action)
    const newState = rootReducer(undefined, {});
    newState.router = state.router;
    return newState
}

let store;
export function configStore(preloadState) {
    const middlewares = [thunkMiddleware, routerMiddleware(history)].filter(
        Boolean
    );
    store = createStore(
        resetEnhanser(createRootReducer(history)),
        preloadState,
        composeWithDevTools(applyMiddleware(...middlewares))
    );
    return store;
}

export function getHistory() {
    return history;
}

export default function getStore() {
    return store;
}
