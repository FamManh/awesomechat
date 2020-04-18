import constants from './constants'
import produce from 'immer'
import { isAuthenticated } from '../shared/routes/permissionChecker';
import io from 'socket.io-client'

const initialState = {
    socket: null
}

const onConnected = () => {
    console.log('connected')
    socket.on("disconnect", onDisconnect);

}

const onDisconnect = ()=>{
    console.log("disconnected")
}


const socket = (state = initialState, { type, payload }) => 
    produce(state, draft=>{
        switch (type) {
            case constants.SOCKET_CONNECT:
                if (!state.socket) {
                    // nếu socket chưa tồn tại thì tạo socket
                    draft.socket = io.connect(
                        process.env.REACT_APP_SOCKET_ENDPOINT,
                        {
                            query: `token=${isAuthenticated()}`,
                        }
                    );

                    draft.socket.on("connect", onConnected);
                    
                } else if (socket && socket.disconnected) {
                    console.log('dang disconnect')
                           // nếu socket chưa connect thì connect
                       }
                break;
            default:
                return state;
        }
    })

export default socket;
