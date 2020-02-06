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


const selectors = {
    selectInitLoading,
    selectSigninLoading,
    selectSignupLoading,
    selectSigninError,
    selectSigupError
};

export default selectors;
