import { createSelector } from "reselect";

const selectRaw = (state) => state.call;

const selectCaller = createSelector([selectRaw], (call) => call.caller);
const selectListener = createSelector([selectRaw], (call) => call.listener);
const selectStatus = createSelector([selectRaw], (call) => call.status);

const selectors = {
    selectCaller,
    selectListener,
    selectStatus,
};

export default selectors;
