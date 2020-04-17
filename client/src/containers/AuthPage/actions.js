import * as constants from "./constants";
import { getHistory } from "../configureStore";
import { fetchSignin, fetchSignup } from "./service";
import Errors from "../shared/error/errors";
import getSocket, {socketDisconnect, configSocket} from '../rootSocket';
const actions = {
    doClearErrorMessage: () => {
        return { type: constants.ERROR_MESSAGE_CLEAR };
    },

    doSignout: () => {
        window.localStorage.removeItem("asauth");
        socketDisconnect();
        getHistory().push("/signin");
    },

    doSignin: userInfo => async dispatch => {
        try {
            dispatch({ type: constants.SIGNIN_START });

            // call api: signin
            let response = await fetchSignin(userInfo);

            window.localStorage.setItem(
                "asauth",
                JSON.stringify(response.data)
            );
            dispatch({
                type: constants.SIGNIN_SUCCESS,
                payload: response.data
            });
            getHistory().push("/");
        } catch (error) {
            dispatch({
                type: constants.SIGNIN_ERROR,
                payload: Errors.selectMessage(error)
            });
        }
    },
    doSignup: userInfo => async dispatch => {
        try {
            dispatch({ type: constants.SIGNUP_START });

            // call api: signin
            let response = await fetchSignup(userInfo);

            window.localStorage.setItem(
                "asauth",
                JSON.stringify(response.data)
            );
            dispatch({
                type: constants.SIGNUP_SUCCESS,
                payload: response.data
            });
            getHistory().push("/");
        } catch (error) {
            dispatch({
                type: constants.SIGNUP_ERROR,
                payload: Errors.selectMessage(error)
            });
        }
    }
};
export default actions;
