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

const selectPeer = createSelector([selectRaw], call=>call.peer)

const selectAudioInput = createSelector([selectRaw], (call) => call.audioInput);
const selectVideoInput = createSelector([selectRaw], (call) => call.videoInput);
const selectAudioOutput = createSelector(
    [selectRaw],
    (call) => call.audioOuput
);

const selectors = {
    selectCaller,
    selectListener,
    selectStatus,
    selectPeerId,
    selectLocalStream,
    selectRemoteStream,
    selectPeer,
    selectAudioInput,
    selectVideoInput,
    selectAudioOutput,
};

export default selectors;
