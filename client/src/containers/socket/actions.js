import constants from './constants'

export default {
    doConnect : () => dispatch => {
        dispatch({type: constants.SOCKET_CONNECT})
    }
}
