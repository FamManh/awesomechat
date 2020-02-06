import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createBrowserHistory } from "history";
import createRootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { routerMiddleware } from "connected-react-router";

const history = createBrowserHistory();

let store;
export function configStore(preloadState) {
    const middlewares = [thunkMiddleware, routerMiddleware(history)].filter(
        Boolean
    );
    store = createStore(
        createRootReducer(history),
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
