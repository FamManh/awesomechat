import constants from './constants'

export default {
    getPeerId: (peerId) => dispatch=>{
        dispatch({type: constants.CALL_GET_PEER_ID, payload: peerId})
    },
    doClear: () => dispatch=>{
        dispatch({type: constants.CALL_CLEAR})
    },
    doCallEnded: () => dispatch=>{
        dispatch({type: constants.CALL_CALL_ENDED})
    }
}
