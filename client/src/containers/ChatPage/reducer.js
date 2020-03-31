import constants from "./constants";
import produce from "immer";
import getStore from "../configureStore";

const initialState = {
    initLoading: true,
    dataLoading: false,
    findLoading: false,
    error: null,
    record: null,
    messages: [],
    inputMesage: {
        images: [],
        text: "",
        files: []
    }
};

const getReceiverId = (currentUserId, message) => {
    if (message.sender._id === currentUserId) {
        return message.receiver._id;
    }
    return message.sender._id;
};

const getLastMessage = message => {
    return message.type === "text" ? message.message : message.type === "images" ? "Image(s)" : "";
};

const messageReducer = (state = initialState, { type, payload }) =>
    produce(state, draft => {
        let currentUser, message;
        switch (type) {
            case constants.INPUT_MESSAGE_CHANGE:
                draft.inputMesage.text = payload;
                break;
            case constants.INPUT_IMAGE_LIST_CHANGE:
                draft.inputMesage.images = payload;
                break;
            case constants.CHAT_CREATE_START:
                draft.saveLoading = true;
                draft.error = null;
                break;
            case constants.CHAT_CREATE_SUCCESS:
                draft.saveLoading = false;
                draft.error = null;

                currentUser = payload.currentUser;
                message = payload.message;
                // Nếu tin nhắn đang mở thì thêm vào tin nhắn
                if (
                    state.record &&
                    state.record.receiver.id === message.receiver._id
                ) {
                    draft.record.messages.push(message);
                }

                // Tìm index của item hiện tại
                let sentMessageIndex = state.messages.findIndex(
                    item =>
                        getReceiverId(currentUser.id, item) ===
                        message.receiver._id
                );

                if (sentMessageIndex === 0) {
                    // Nếu tin nhắn hiện tại đã nằm đầu danh sách thì thay đổi tin nhắn cuối cùng
                    draft.messages[0].message = message.message;
                    draft.messages[0].type = message.type;
                } else if (sentMessageIndex === -1) {
                    // Nếu không có tin nhắn hiện tại trong danh sách thì thêm vào đầu
                    draft.messages.unshift({
                        sender: message.sender,
                        receiver: message.receiver,
                        message: message.message,
                        type: message.type
                    });
                } else {
                    // Nếu tin nhắn hiện tại trong danh sách thì đưa lên đầu
                    let [removedMessge] = draft.messages.splice(
                        sentMessageIndex,
                        1
                    );
                    draft.messages.unshift({
                        ...removedMessge,
                        message: message.message,
                        type: message.type
                    });
                }
                break;
            case constants.CHAT_CREATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case constants.CHAT_FIND_START:
                draft.findLoading = true;
                draft.error = null;
                break;
            case constants.CHAT_FIND_SUCCESS:
                draft.findLoading = false;
                draft.record = payload;
                draft.error = null;
                break;
            case constants.CHAT_FIND_ERROR:
                draft.findLoading = false;
                draft.record = null;
                draft.error = payload;
                break;
            case constants.CHAT_GET_START:
                draft.messageLoading = true;
                draft.error = null;
                break;
            case constants.CHAT_GET_SUCCESS:
                draft.messageLoading = false;
                draft.messages = payload;
                draft.error = null;
                break;
            case constants.CHAT_GET_ERROR:
                draft.messageLoading = false;
                draft.error = payload;
                break;
            case constants.SOCKET_SENT_MESSAGE:
                currentUser = payload.currentUser;
                message = payload.message;

                // Nếu tin nhắn đang mở thì thêm vào tin nhắn
                if (
                    state.record &&
                    state.record.receiver.id === message.sender._id
                ) {
                    draft.record.messages.push(message);
                }

                // Tìm index của item hiện tại
                let receivedMessageIndex = state.messages.findIndex(
                    item =>
                        getReceiverId(currentUser.id, item) ===
                        message.sender._id
                );

                if (receivedMessageIndex === 0) {
                    // Nếu tin nhắn hiện tại đã nằm đầu danh sách thì thay đổi tin nhắn cuối cùng
                    draft.messages[0].message = message.message;
                    draft.messages[0].type = message.type;
                } else if (receivedMessageIndex === -1) {
                    // Nếu không có tin nhắn hiện tại trong danh sách thì thêm vào đầu
                    draft.messages.unshift({
                        sender: message.sender,
                        receiver: message.receiver,
                        message: message.message,
                        type: message.type
                    });
                } else {
                    // Nếu tin nhắn hiện tại trong danh sách thì đưa lên đầu
                    let [removedMessge] = draft.messages.splice(
                        receivedMessageIndex,
                        1
                    );
                    draft.messages.unshift({
                        ...removedMessge,
                        message: message.message,
                        type: message.type
                    });
                }
                break;
            default:
                break;
        }
    });

export default messageReducer;
