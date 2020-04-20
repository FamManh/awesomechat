import * as constants from "./constants";
import produce from 'immer';
const initialState = {
    initLoading: true,
    signinLoading: false,
    signupLoading: false,
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
        default:
            break;
    }
});

export default authReducer;
