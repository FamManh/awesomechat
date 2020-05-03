import getSocket from "../rootSocket";
import getStore from "../configureStore";
import constants from "./constants";

export const emitSentMessage = (payload) => {
    getSocket().emit("sent-message", payload);
};

export const onSentMessage = (payload) => {
    let state = getStore().getState();
    let currentUser = state.user.current;
    getStore().dispatch({
        type: constants.SOCKET_SENT_MESSAGE,
        payload: { message: payload, currentUser: currentUser },
    });
};

export const emitCreateGroup = (payload) => {
    getSocket().emit("create-group", payload);
};

export const onCreateGroup = (payload) => {
    getStore().dispatch({
        type: constants.CHAT_CREATE_GROUP_SUCCESS,
        payload: payload,
    });
};

export const emitTypingOn = payload => {
    getSocket().emit("typing-on", payload)
}

export const onTypingOn = payload => {
    getStore().dispatch({
        type: constants.SOCKET_TYPING_ON,
        payload: payload,
    });
};

export const emitTypingOff = (payload) => {
    getSocket().emit("typing-off", payload);
};

export const onTypingOff = (payload) => {
    getStore().dispatch({
        type: constants.SOCKET_TYPING_OFF,
        payload: payload,
    });
};

