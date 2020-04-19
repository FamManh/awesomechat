import { createSelector } from "reselect";

const selectRaw = (state) => state.call;

const selectCaller = createSelector([selectRaw], (call) => call.caller);
const selectListener = createSelector([selectRaw], (call) => call.listener);
const selectStatus = createSelector([selectRaw], (call) => call.status);
const selectPeerId = createSelector([selectRaw], (call) => call.peerId);
const selectLocalStream = createSelector(
    [selectRaw],
    (call) => call.localStream
);
const selectRemoteStream = createSelector(
    [selectRaw],
    (call) => call.remoteStream
);

const selectors = {
    selectCaller,
    selectListener,
    selectStatus,
    selectPeerId,
    selectLocalStream,
    selectRemoteStream,
};

export default selectors;
