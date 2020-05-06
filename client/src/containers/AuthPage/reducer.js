import * as constants from "./constants";
import produce from 'immer';
const initialState = {
    initLoading: true,
    signinLoading: false,
    signupLoading: false,
    sendResetPasswordLoading: false,
    sendResetPasswordError: null,
    changePasswordLoading: false,
    changePasswordError: null,
    signinError: null,
    sigupError: null
};

const authReducer = (state = initialState, {type, payload})=>
    produce(state, draft=> {
    switch (type) {
        case constants.SIGNIN_INIT_LOADING_DONE:
            draft.initLoading = false;
            break;
        case constants.SIGNIN_START:
            draft.signinLoading = true;
            draft.signinError = null;
            break;
        case constants.SIGNIN_SUCCESS:
            draft.signinLoading = false;
            draft.signinError = null;
            break;
        case constants.SIGNIN_ERROR:
            draft.signinLoading = false;
            draft.signinError = payload || null;
            break;
        case constants.SIGNUP_START:
            draft.signupLoading = true;
            draft.sigupError = null;
            break;
        case constants.SIGNUP_SUCCESS:
            draft.signupLoading = false;
            draft.sigupError = null;
            break;
        case constants.SIGNUP_ERROR:
            draft.signupLoading = false;
            draft.sigupError = payload || null;
            break;
        case constants.SEND_RESET_PASSWORD_START:
            draft.sendResetPasswordLoading = true;
            draft.sendResetPasswordError = null;
            break;
        case constants.SEND_RESET_PASSWORD_SUCCESS:
            draft.sendResetPasswordLoading = false;
            break;
        case constants.SEND_RESET_PASSWORD_ERROR:
            draft.sendResetPasswordLoading = false;
            draft.sendResetPasswordError = payload || null;
            break;
        case constants.CHANGE_PASSWORD_START:
            draft.changePasswordLoading = true;
            draft.changePasswordError = null;
            break;
        case constants.CHANGE_PASSWORD_SUCCESS:
            draft.changePasswordLoading = false;
            break;
        case constants.CHANGE_PASSWORD_ERROR:
            draft.changePasswordLoading = false;
            draft.changePasswordError = payload || null;
            break;
        default:
            break;
    }
});

export default authReducer;
