import constants from "./constants";
import produce from "immer";

const initialState = {
    caller: {},
    listener: {},
    status: null,
    peerId: "",
    localStream: null,
    remoteStream: null,
    iceServer: null,
    peer: null,
    audioInput: undefined,
    videoInput: undefined,
    audioOutput: undefined,
};

const callReducer = (state = initialState, { type, payload }) =>
    produce(state, (draft) => {
        switch (type) {
            case constants.CALL_GET_ICE_SERVER_SUCCESS:
                draft.iceServer = payload;
                break;
            case constants.CALL_SET_AUDIO_VIDEO_SOURCE:
                draft.audioInput = payload.audioInput || state.audioInput;
                draft.videoInput = payload.videoInput || state.videoInput;
                draft.audioOutput = payload.audioOutput || state.audioOutput;
                break;
            case constants.CALL_CREATE_PEER:
                draft.peer = payload;
                break;
            case constants.CALL_GET_PEER_ID:
                draft.peerId = payload;
                break;
            case constants.CALL_RESPONSE_CONTACTING:
                draft.status = "contacting";
                draft.caller = payload.caller;
                draft.listener = payload.listener;
                break;
            case constants.CALL_REQUEST_CALL:
                draft.status = "calling";
                draft.caller = payload.caller;
                draft.listener = payload.listener;
                break;
            case constants.CALL_RESPONSE_PEER_ID:
                draft.status = "ringing";
                draft.caller = payload.caller;
                draft.listener = payload.listener;
                draft.peerId = payload.peerId;
                break;
            case constants.CALL_REJECT_CALL:
                draft.status = "rejected";
                draft.caller = payload.caller;
                draft.listener = payload.listener;
                break;
            case constants.CALL_CALLER_ANSWER:
                draft.status = "streaming";
                draft.caller = payload.caller;
                draft.listener = payload.listener;
                break;
            case constants.CALL_LISTENER_ANSWER:
                draft.status = "streaming";
                draft.caller = payload.caller;
                draft.listener = payload.listener;
                break;
            case constants.CALL_LOCAL_STREAM:
                draft.localStream = payload;
                break;
            case constants.CALL_REMOTE_STREAM:
                draft.remoteStream = payload;
                break;
            case constants.CALL_CALL_ENDED:
                if (state.localStream) {
                    // đã tắt stream
                    state.localStream
                        .getTracks()
                        .forEach((track) => {
                            track.stop()
                            state.localStream.removeTrack(track);
                        });
                }
                if (state.remoteStream) {
                    // đã tắt stream
                    state.remoteStream.getTracks().forEach((track) => {
                        track.stop();
                        state.remoteStream.removeTrack(track);
                    });
                }
                draft.localStream = null;
                draft.remoteStream = null;
                draft.caller = {};
                draft.listener = {};
                draft.status = null;
                break;
            case constants.CALL_CLEAR:
                draft.status = null;
                draft.caller = {};
                draft.listener = {};
                break;
            default:
                return state;
        }
    });

export default callReducer;
