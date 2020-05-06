import { createSelector } from "reselect";

const selectRaw = state => state.auth;

// select loading
const selectInitLoading = createSelector(
    [selectRaw],
    auth => auth.initLoading
);

const selectSigninLoading = createSelector(
    [selectRaw],
    auth => auth.signinLoading
);

const selectSignupLoading = createSelector(
    [selectRaw],
    auth => auth.signupLoading
);

// select errors
const selectSigninError = createSelector([selectRaw], auth => auth.signinError);
const selectSigupError = createSelector([selectRaw], auth => auth.sigupError);
const selectSendResetPasswordLoading = createSelector(
    [selectRaw],
    (auth) => auth.sendResetPasswordLoading
);
const selectSendResetPasswordError = createSelector(
    [selectRaw],
    (auth) => auth.sendResetPasswordError
);
const selectChangePasswordLoading = createSelector(
    [selectRaw],
    (auth) => auth.changePasswordLoading
);

const selectChangePasswordError = createSelector(
    [selectRaw],
    (auth) => auth.changePasswordError
);



const selectors = {
    selectInitLoading,
    selectSigninLoading,
    selectSignupLoading,
    selectSigninError,
    selectSigupError,
    selectSendResetPasswordLoading,
    selectChangePasswordLoading,
    selectChangePasswordError,
    selectSendResetPasswordError,
};

export default selectors;
