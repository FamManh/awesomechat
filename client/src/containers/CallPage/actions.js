import constants from './constants'

export default {
    doClear: () => dispatch=>{
        dispatch({type: constants.CALL_CLEAR})
    }
}
