import constants from './constants'
import services from './services'
import peerjs from "peerjs";
import { getPeerId } from './socket';
export default {
    getPeerId: (peerId) => (dispatch) => {
        dispatch({ type: constants.CALL_GET_PEER_ID, payload: peerId });
    },
    doClear: () => (dispatch) => {
        dispatch({ type: constants.CALL_CLEAR });
    },
    doCallEnded: () => (dispatch) => {
        dispatch({ type: constants.CALL_CALL_ENDED });
    },
    doGetIceServer: () => async (dispatch) => {
        try {
            const response = await services.getIceServer();
            dispatch({
                type: constants.CALL_GET_ICE_SERVER_SUCCESS,
                payload: response.data,
            });
            getPeerId(response.data.ice);
        } catch (error) {
            console.log(error);
        }
    },
};