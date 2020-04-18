import constants from './constants'
import produce from 'immer'

const initialState = {
    caller: {},
    listener: {},
    status: null,
    peerId: ""
}

const callReducer = (state = initialState, { type, payload }) =>
    produce(state, (draft) => {
        switch (type) {
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
            case constants.CALL_ANSWER_CALL:
                draft.status = "answer";
                draft.caller = payload.caller;
                draft.listener = payload.listener;
                break;
            case constants.CALL_CLEAR:
                draft.status = null;
                draft.caller = {};
                draft.listener = {};
                draft.peerId = "";
                break;
            default:
                return state;
        }
    });

export default callReducer;
