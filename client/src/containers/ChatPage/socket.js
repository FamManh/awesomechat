import getSocket, { configSocket } from "../rootSocket";
import message from "../shared/message";
import getStore from "../configureStore";
import constants from "./constants";
export const emitSentMessage = payload => {
    getSocket().emit("sent-message", payload);
};

export const onSentMessage = payload => {

    let state = getStore().getState();
    let currentUser = state.user.current;
    getStore().dispatch({
        type: constants.SOCKET_SENT_MESSAGE,
        payload: { message: payload, currentUser: currentUser }
    });
};
