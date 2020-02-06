import { createSelector } from "reselect";

const selectRaw = state => state.signin;

const selectLoading = createSelector([selectRaw], signin => signin.loading);
const selectInitLoading = createSelector(
    [selectRaw],
    signin => signin.initLoading
);

const selectErrorMessage = createSelector([selectRaw], signin => signin.error);

const selectors = {
    selectLoading,
    selectInitLoading,
    selectErrorMessage
};

export default selectors;
