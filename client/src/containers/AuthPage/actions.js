import {
    SIGNIN_START,
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    ERROR_MESSAGE_CLEAR
} from "./constants";
import { getHistory } from "../configureStore";
import { fetchSignin } from "./service";
import Errors from "../shared/error/errors";

const actions = {
    doClearErrorMessage: () => {
        return { type: ERROR_MESSAGE_CLEAR };
    },

    doSignin: (username, password) => async dispatch => {
        try {
            dispatch({ type: SIGNIN_START });

            // call api: signin
            let response = await fetchSignin(username, password);

            window.localStorage.setItem(
                "ssauth",
                JSON.stringify(response.data)
            );
            dispatch({ type: SIGNIN_SUCCESS, payload: response.data });
            getHistory().push("/");
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: SIGNIN_ERROR
            });
        }
    }
};
export default actions;
