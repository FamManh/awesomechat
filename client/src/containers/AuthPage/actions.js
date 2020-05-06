import * as constants from "./constants";
import { getHistory } from "../configureStore";
import {
    fetchSignin,
    fetchSignup,
    fetchChangePassword,
    fetchSendResetPassword,
} from "./service";
import Errors from "../shared/error/errors";
import { socketDisconnect, configSocket } from "../rootSocket";
import Message from "../shared/message";
import { initSetting } from "../shared/settings";

const actions = {
    doInitLoadingDone: () => {
        return { type: constants.SIGNIN_INIT_LOADING_DONE };
    },
    doClearErrorMessage: () => {
        return { type: constants.ERROR_MESSAGE_CLEAR };
    },

    doSignout: () => (dispatch) => {
        window.localStorage.removeItem("asauth");
        socketDisconnect();

        getHistory().push("/signin");
        dispatch({ type: "RESET" });
    },

    doSignin: (userInfo) => async (dispatch) => {
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
                payload: response.data,
            });
            getHistory().push("/");
            configSocket();
            initSetting();
        } catch (error) {
            dispatch({
                type: constants.SIGNIN_ERROR,
                payload: Errors.selectMessage(error),
            });
        }
    },
    doSignup: (userInfo) => async (dispatch) => {
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
                payload: response.data,
            });
            getHistory().push("/");
        } catch (error) {
            dispatch({
                type: constants.SIGNUP_ERROR,
                payload: Errors.selectMessage(error),
            });
        }
    },

    doSendResetPassword: (email) => async (dispatch) => {
        try {
            dispatch({ type: constants.SEND_RESET_PASSWORD_START });

            // call api: signin
            let response = await fetchSendResetPassword(email);

            dispatch({
                type: constants.SEND_RESET_PASSWORD_SUCCESS,
                payload: response.data,
            });
            Message.success("Reset email sent. Please check your inbox!");
        } catch (error) {
            dispatch({
                type: constants.SEND_RESET_PASSWORD_ERROR,
                payload: Errors.selectMessage(error),
            });
        }
    },
    doChangePassword: (data) => async (dispatch) => {
        try {
            dispatch({ type: constants.CHANGE_PASSWORD_START });

            // call api: signin
            let response = await fetchChangePassword(data);

            dispatch({
                type: constants.CHANGE_PASSWORD_SUCCESS,
                payload: response.data,
            });
            Message.success("Your password has been changed successfully!");
            getHistory().push("/signin");
        } catch (error) {
            dispatch({
                type: constants.CHANGE_PASSWORD_ERROR,
                payload: Errors.selectMessage(error),
            });
        }
    },
};
export default actions;
